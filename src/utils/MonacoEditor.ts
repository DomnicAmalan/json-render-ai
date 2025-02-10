import * as monaco from "monaco-editor";
import schema from "../constants/monaco-editor.json"; 

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

export const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  wordWrap: "on" as "on",
  language: 'css'
};