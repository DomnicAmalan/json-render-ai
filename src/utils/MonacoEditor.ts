import * as monaco from "monaco-editor";
import schema from "../constants/monaco-editor.json"; 

// Configure Monaco Editor with JSON Schema Validation
export const configureMonacoEditor = () => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [
      {
        uri: "foo://myapp/segment/type",
        fileMatch: ["*.json"],
        schema: schema,
      }
    ],
  });
};

// Default Editor Options
export const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  wordWrap: "on" as "on", // Ensure this matches the expected type,
  language: 'css'
};