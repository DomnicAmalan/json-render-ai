import React from "react";
import { FormTitleProps } from "../@types/FormElement";

const FormTitle: React.FC<FormTitleProps> = ({ title, titleStyles }) => {
  return <h1 style={titleStyles}>{title}</h1>;
};

export default FormTitle;