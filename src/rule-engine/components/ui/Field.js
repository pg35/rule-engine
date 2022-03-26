import React from "react";
import Toggle from "react-toggle";
//import "react-toggle/style.css";
import "../../../toggle.css";

export default function Field(props) {
  const { field, action, dispatch } = props;
  const { name, value, label, type = "text" } = field;

  let layout = field.layout;
  if (!layout && "checkbox" === type) layout = "inline";
  if ("inline" === layout)
    layout = { label: "col-xs-6 col-md-6", input: "col-xs-6 col-md-6" };
  else if (typeof layout !== "object")
    layout = { label: "col-md-6", input: "col-md-6" };

  const handleChange = (e) => {
    const field = { [e.target.name]: getFieldValue(e) };
    dispatch({
      ...action,
      field
    });
  };

  const getInputProps = () => {
    const obj = {
      name,
      id: getHtmlId(props.htmlId ? props.htmlId : name),
      value,
      onChange: handleChange
    };
    if ("checkbox" === type) {
      obj.value = "1";
      obj.checked = value;
    }
    return obj;
  };

  const renderInput = () => {
    switch (type) {
      case "checkbox":
        return (
          <Toggle
            icons={{
              checked: "YES",
              unchecked: "NO"
            }}
            {...getInputProps()}
          />
        );
      default:
        return <input type={type} {...getInputProps()} />;
    }
  };

  return (
    <div className="field row">
      <div className={layout.label}>
        <label htmlFor={getHtmlId(name)}>{label ? label : name}</label>
      </div>
      <div className={layout.input}>{renderInput()}</div>
    </div>
  );
}

export function getHtmlId(name, prefix = "mwre") {
  return `${prefix}_${name}`;
}

export function getFieldValue(e) {
  switch (e.target.type) {
    case "checkbox":
      return e.target.checked;
    default:
      return e.target.value;
  }
}
