import React from "react";
import st from "../css/Field.module.css";

export default function Field(props) {
  console.log(props);
  const { field, action, dispatch } = props;
  const { name, value, label, type = "text", layout = "block" } = field;

  const handleChange = (e) => {
    const field = { [e.target.name]: getFieldValue(e) };
    dispatch({
      ...action,
      field
    });
  };

  const getFieldProps = () => {
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
  console.log(st);
  return (
    <div
      className={`${st.field} ${"block" === layout ? "" : st.horizontalField}`}
    >
      <label htmlFor={getHtmlId(name)}>{label ? label : name}</label>
      <input type={type} {...getFieldProps()} />
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
