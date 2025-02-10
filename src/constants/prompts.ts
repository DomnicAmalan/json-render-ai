export const GenerateJsonHtmlPrompt = (requirements: string) => `
    Have to Generate Form with below example for requirements and return only json
    {
    "type": "VStack",
    "containerStyles": {
        "gap": "16px",
        "padding": "20px",
        "backgroundColor": "#f9f9f9"
    },
    "formTitle": {
        "title": "My Form Title",
        "titleStyles": {
        "color": "#333",
        "textAlign": "center",
        "marginBottom": "20px"
        }
    },
    "children": [
        {
        "type": "HStack",
        "containerStyles": {
            "gap": "10px",
            "justifyContent": "space-between"
        },
        "children": [
            {
            "type": "input",
            "label": "First Name",
            "name": "firstName",
            "inputType": "text",
            "containerStyles": {
                "width": "45%"
            },
            "labelStyles": {
                "fontWeight": "bold"
            },
            "componentStyles": {
                "padding": "8px",
                "borderRadius": "4px",
                "border": "1px solid #ccc"
            }
            },
            {
            "type": "input",
            "label": "Age",
            "name": "age",
            "inputType": "number",
            "containerStyles": {
                "width": "45%"
            },
            "labelStyles": {
                "fontWeight": "bold"
            },
            "componentStyles": {
                "padding": "8px",
                "borderRadius": "4px",
                "border": "1px solid #ccc"
            }
            }
        ]
        },
        {
        "type": "HStack",
        "containerStyles": {
            "gap": "10px",
            "justifyContent": "space-between"
        },
        "children": [
            {
            "type": "input",
            "label": "Accept Terms",
            "name": "acceptTerms",
            "inputType": "checkbox",
            "containerStyles": {
                "width": "45%"
            },
            "labelStyles": {
                "fontWeight": "bold"
            },
            "componentStyles": {
                "margin": "0 10px"
            }
            }
        ]
        },
        {
        "type": "button",
        "label": "Submit",
        "componentStyles": {
            "backgroundColor": "#007bff",
            "color": "#ffffff",
            "padding": "10px 20px",
            "border": "none",
            "cursor": "pointer"
        },
        "actions": [
            {
            "type": "click",
            "handler": "alertMessage"
            },
            {
            "type": "click",
            "handler": "apiCall",
            "url": "https://jsonplaceholder.typicode.com/posts"
            }
        ]
        }
    ]
    }
${requirements}

`