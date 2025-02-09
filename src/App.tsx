import React, { useState, useCallback, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import FormRenderer from "./components/FormRenderer";
import { configureMonacoEditor, defaultEditorOptions } from "./utils/MonacoEditor";
import { defaultSchema } from "./constants/defaultMockSchema";


const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState(() => JSON.stringify(defaultSchema, null, 2));
  const [formData, setFormData] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Configure Monaco Editor on component mount
  useEffect(() => {
    configureMonacoEditor();
  }, []);

  const editorDidMount = useCallback((monacoEditor: any) => {
    monacoEditor.updateOptions(defaultEditorOptions);
  }, []);

  const handleJsonChange = (value: string | undefined) => {
    if (!value) return;
    try {
      JSON.parse(value);
      setJsonSchema(value);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Invalid JSON: Please check your input.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleFormSubmit = (formData: any) => setFormData(formData);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      <div style={{ display: "flex", flex: 1, width: "100%" }}>
        <div style={{ width: "50%", height: "50%", padding: "20px", borderRight: "1px solid #ccc" }}>
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : (
            <FormRenderer
              schema={JSON.parse(jsonSchema)}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
        <div style={{ width: "50%", height: "50%", padding: "20px", borderRight: "1px solid #ccc" }}>
          <h3>Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
      <div style={{ height: "50%", padding: "20px", borderTop: "1px solid #ccc" }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={jsonSchema}
          onChange={handleJsonChange}
          onMount={editorDidMount}
          options={defaultEditorOptions}
        />
      </div>
    </div>
  );
};

export default App;