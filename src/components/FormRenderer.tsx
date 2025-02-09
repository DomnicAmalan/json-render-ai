import React from "react";
import { FormElement, ElementType } from "../@types/FormElement";
import { handleAction } from "../utils/customFunctions";

interface FormRendererProps {
  schema: FormElement;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  onSubmit: (formData: any) => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema, formData, onInputChange, onSubmit }) => {
    const renderElement = (element: FormElement, index: number): React.ReactNode => {
        const { type, label, name, inputType, containerStyles, labelStyles, componentStyles, children, actions, htmlProps } = element;
      
        console.log(`Rendering element of type: ${type} with styles:`, containerStyles, labelStyles, componentStyles);
      
        if (!type || typeof type !== "string") {
          console.error(`Invalid or missing type for element at index ${index}`);
          return null;
        }
      
        switch (type) {
          case ElementType.VSTACK:
            return (
              <div key={`vstack-${index}`} style={{ display: "flex", flexDirection: "column", ...containerStyles }} {...htmlProps}>
                {children?.map((child, i) => renderElement(child, i))}
              </div>
            );
          case ElementType.HSTACK:
            return (
              <div key={`hstack-${index}`} style={{ display: "flex", flexDirection: "row", ...containerStyles }} {...htmlProps}>
                {children?.map((child, i) => renderElement(child, i))}
              </div>
            );
          case ElementType.INPUT:
            if (!name) {
              console.error(`Missing name for input element at index ${index}`);
              return null;
            }
            return (
              <div key={`input-${name}`} style={{ ...containerStyles }} {...htmlProps}>
                {label && <label style={labelStyles}>{label}</label>}
                <input
                  type={inputType}
                  name={name}
                  value={formData[name] || ""}
                  onChange={(e) => onInputChange(e, name)}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", ...componentStyles }}
                />
              </div>
            );
          case ElementType.BUTTON:
            return (
              <button
                key={`button-${index}`}
                style={{ ...componentStyles }}
                onClick={() => actions?.forEach((action: any) => handleAction(action, formData))}
                {...htmlProps}
              >
                {label}
              </button>
            );
          case ElementType.TEXT:
            return <span key={`text-${index}`} style={componentStyles} {...htmlProps}>{label}</span>;
          default:
            console.error(`Unknown element type: ${type} at index ${index}`);
            return null;
        }
      };
      
      // Usage in the component
      return <div>{renderElement(schema, 0)}</div>;
};

export default FormRenderer;