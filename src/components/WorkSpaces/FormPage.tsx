import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom"; 
import MonacoEditor from "@monaco-editor/react";
import { defaultSchema } from "../../constants/defaultMockSchema";
import { configureMonacoEditor, defaultEditorOptions } from "../../utils/MonacoEditor";
import { debounce } from "../../utils/debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormByWorkspaceAndFormIdRequest, updateFormRequest } from "../../store/reducers/formReducer"; 
import { RootState } from "../../store";
import FormRenderer from "../FormRenderer";

const FormPage: React.FC = () => {
  const { id, formid } = useParams();
  const dispatch = useDispatch();
  const { currentForm, loading, error } = useSelector((state: RootState) => state.form); 

  const [jsonSchema, setJsonSchema] = useState<string>(() => JSON.stringify(defaultSchema, null, 2));
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const memoizedFormJson = useMemo(() => {
    return currentForm?.formJson && Object.keys(currentForm.formJson).length > 0
      ? currentForm.formJson
      : defaultSchema;
  }, [currentForm?.formJson]);

  useEffect(() => {
    configureMonacoEditor();

    if (id && formid) {
      dispatch(fetchFormByWorkspaceAndFormIdRequest({ workspaceId: id, formId: formid }));
    }
  }, [id, formid, dispatch]);

  useEffect(() => {
    if (JSON.stringify(memoizedFormJson) !== jsonSchema) {
      setJsonSchema(JSON.stringify(memoizedFormJson, null, 2));
    }
  }, [memoizedFormJson, jsonSchema]);

  const editorDidMount = useCallback((monacoEditor: any) => {
    monacoEditor.updateOptions(defaultEditorOptions);
  }, []);

  const debouncedHandleJsonChangeForRender = useCallback(
    debounce((value: string | undefined) => {
      if (!value) return;
      try {
        JSON.parse(value);
        setJsonSchema(value);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Invalid JSON: Please check your input.");
      }
    }, 1000),
    []
  );

  const debouncedHandleJsonChangeForApiCall = useCallback(
    debounce((value: string | undefined) => {
      if (!value) return;
      try {
        const parsedJson = JSON.parse(value);
        if (id && formid) {
          dispatch(updateFormRequest({ workspaceId: id, formId: formid, formJson: parsedJson }));
        }
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage("Invalid JSON: Please check your input.");
      }
    }, 3000),
    [id, formid]
  );

  const debouncedHandleJsonChange = (value: string | undefined) => {
    debouncedHandleJsonChangeForRender(value);
    debouncedHandleJsonChangeForApiCall(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex", flex: 1, width: "100%" }}>
        <div style={{ width: "50%", height: "100%", padding: "20px", borderRight: "1px solid #ccc" }}>
          {_errorMessage ? (
            <p style={{ color: "red" }}>{_errorMessage}</p>
          ) : (
            <FormRenderer
              schema={JSON.parse(jsonSchema)}
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}
        </div>
        <div style={{ width: "50%", height: "100%", padding: "20px", borderRight: "1px solid #ccc" }}>
          <h3>Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
      <div style={{ height: "50%", padding: "20px", borderTop: "1px solid #ccc" }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={jsonSchema}
          onChange={debouncedHandleJsonChange}
          onMount={editorDidMount}
          options={defaultEditorOptions}
        />
      </div>
    </div>
  );
};

export default FormPage;