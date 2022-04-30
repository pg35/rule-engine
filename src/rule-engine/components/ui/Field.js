import React from "react";
import Toggle from "react-toggle";
//import "react-toggle/style.css";
//import "../../../toggle.css";

export default function Field(props) {
  const { field, action, dispatch } = props;
  const { name, id, value, label, type = "text" } = field;

  let layout = field.layout;
  if (!layout && "checkbox" === type) layout = "inline";
  if ("inline" === layout)
    layout = { label: "col-xs-9 col-md-6", input: "col-xs-3 col-md-6" };
  else if (typeof layout !== "object")
    layout = { label: "col-md-6", input: "col-md-6" };

  const htmlId = `mwre-${id ? id : name}`;

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
      id: htmlId,
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
    <div className={`row field field-${name}`}>
      <div className={layout.label}>
        <label htmlFor={htmlId}>{label ? label : name}</label>
      </div>
      <div className={layout.input}>{renderInput()}</div>
    </div>
  );
}

function getFieldValue(e) {
  switch (e.target.type) {
    case "checkbox":
      return e.target.checked;
    default:
      return e.target.value;
  }
}
