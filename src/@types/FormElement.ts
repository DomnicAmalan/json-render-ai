import React from "react";

export enum ActionType {
  ALERT_MESSAGE = "alertMessage",
  API_CALL = "apiCall",
  CUSTOM_ACTION = "customAction",
}

export enum ElementType {
  VSTACK = "VStack",
  HSTACK = "HStack",
  INPUT = "input",
  BUTTON = "button",
  TEXT = "text",
}

export enum InputType {
  DATE = "date",
  DATETIME_LOCAL = "datetime-local",
  EMAIL = "email",
  FILE = "file",
  HIDDEN = "hidden",
  MONTH = "month",
  NUMBER = "number",
  PASSWORD = "password",
  RANGE = "range",
  TEL = "tel",
  TEXT = "text",
  TIME = "time",
  URL = "url",
  WEEK = "week",
  CHECKBOX = 'checkbox'
}

export interface FormElement {
  formTitle?: FormTitleProps;
  type: string;
  label?: string;
  name?: string;
  inputType?: InputType;
  containerStyles?: React.CSSProperties; // Add this line
  labelStyles?: React.CSSProperties;     // Add this line
  componentStyles?: React.CSSProperties; // Add this line
  children?: FormElement[];
  actions?: { type: string; handler: string; url?: string }[];
  htmlProps?: React.HTMLAttributes<HTMLElement>;
}

export interface FormTitleProps {
  title?: string;
  titleStyles?: React.CSSProperties;
}
