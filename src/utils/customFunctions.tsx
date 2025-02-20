import { ActionType } from "../@types/FormElement";

export const handleAlert = () => alert('Custom JS function: Form submitted!');

export const handleApiCall = async (url: string, formData: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
  }
};

export const handleCustomAction = () => console.log("Custom action triggered");

export const handleAction = (
  action: { type: string; handler: ActionType; url?: string },
  formData: any
) => {
  switch (action.handler) {
    case ActionType.ALERT_MESSAGE:
      handleAlert();
      break;
    case ActionType.API_CALL:
      if (action.url) handleApiCall(action.url, formData);
      break;
    case ActionType.CUSTOM_ACTION:
      handleCustomAction();
      break;
    default:
      console.error("Unknown action handler");
  }
};