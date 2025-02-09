import * as monaco from "monaco-editor";

// Configure Monaco Editor with JSON Schema Validation
export const configureMonacoEditor = () => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [
      {
        uri: "https://example.com/form-schema.json", // A unique URI for the schema
        fileMatch: ["*"], // Apply this schema to all files in the editor
        schema: {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "Form Schema",
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["VStack", "HStack", "input", "button", "text"]
            },
            "label": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "inputType": {
              "type": "string",
              "enum": ["date", "datetime-local", "email", "file", "hidden", "month", "number", "password", "range", "tel", "text", "time", "url", "week"]
            },
            "containerStyles": {
              "type": "object"
            },
            "labelStyles": {
              "type": "object"
            },
            "componentStyles": {
              "type": "object"
            },
            "children": {
              "type": "array",
              "items": {
                "$ref": "#"
              }
            },
            "actions": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string"
                  },
                  "handler": {
                    "type": "string",
                    "enum": ["alertMessage", "apiCall", "customAction"]
                  },
                  "url": {
                    "type": "string"
                  }
                },
                "required": ["type", "handler"]
              }
            },
            "onRender": {
              "type": "object",
              "properties": {
                "handler": {
                  "type": "string",
                  "enum": ["apiCall"]
                },
                "url": {
                  "type": "string"
                },
                "method": {
                  "type": "string",
                  "enum": ["GET"]
                }
              },
              "required": ["handler", "url", "method"]
            }
          },
          "required": ["type"]
        }
      },
    ],
  });
};

// Default Editor Options
export const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  scrollBeyondLastLine: false,
  minimap: { enabled: false },
  wordWrap: "on" as "on", // Ensure this matches the expected type
};