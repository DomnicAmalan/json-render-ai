import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom"; 
import MonacoEditor from "@monaco-editor/react";
import { defaultSchema } from "../../constants/defaultMockSchema";
import { configureMonacoEditor, defaultEditorOptions } from "../../utils/MonacoEditor";
import { debounce } from "../../utils/debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormByWorkspaceAndFormIdRequest, updateFormRequest } from "../../store/reducers/formReducer"; 
import { RootState } from "../../store";

const FormPage: React.FC = () => {
  const { id, formid } = useParams();
  const dispatch = useDispatch();
  const { currentForm, loading, error } = useSelector((state: RootState) => state.form); 

  const [jsonSchema, setJsonSchema] = useState<string>(() => JSON.stringify(defaultSchema, null, 2));
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);

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

  console.log(memoizedFormJson, 'ssdjsdkjs')

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>
      <div style={{ width: "50%", padding: "20px", borderTop: "1px solid #ccc" }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="react"
          value={jsonSchema}
          onChange={debouncedHandleJsonChange}
          onMount={editorDidMount}
          options={defaultEditorOptions}
        />
      </div>
      <div style={{ width: "50%", padding: "20px", borderTop: "1px solid #ccc" }}>

        {/* <FormRenderer schema={memoizedFormJson} formData={formData} onChange={handleInputChange} /> */}
      </div>
    </div>
  );
};

export default FormPage;
