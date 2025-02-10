import { ActionType, FormElement, InputType } from "../@types/FormElement";

export const defaultSchema: FormElement = {
  type: "VStack",
  containerStyles: { gap: "16px", padding: "20px", backgroundColor: "#f9f9f9" },
  formTitle: {
    title: "My Form Title",
    titleStyles: {
      "color": "#333",
      "textAlign": "center",
      "marginBottom": "20px"
    }
  },
  children: [
    {
      type: "HStack",
      containerStyles: { gap: "10px", justifyContent: "space-between" },
      children: [
        {
          type: "input",
          label: "First Name",
          name: "firstName",
          inputType: InputType.TEXT,
          containerStyles: { width: "45%" },
          labelStyles: { fontWeight: "bold" },
          componentStyles: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }
        },
        {
          type: "input",
          label: "Age",
          name: "age",
          inputType: InputType.NUMBER,
          containerStyles: { width: "45%" },
          labelStyles: { fontWeight: "bold" },
          componentStyles: { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }
        }
      ]
    },
    {
      type: "HStack",
      containerStyles: { gap: "10px", justifyContent: "space-between" },
      children: [
        {
          type: "input",
          label: "Accept Terms",
          name: "acceptTerms",
          inputType: InputType.CHECKBOX,
          containerStyles: { width: "45%" },
          labelStyles: { fontWeight: "bold" },
          componentStyles: { margin: "0 10px" }
        }
      ]
    },
    {
      type: "button",
      label: "Submit",
      componentStyles: {
        backgroundColor: "#007bff",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer"
      },
      actions: [
        { type: "click", handler: ActionType.ALERT_MESSAGE },
        { type: "click", handler: ActionType.API_CALL, url: "https://jsonplaceholder.typicode.com/posts" }
      ]
    }
  ]
};