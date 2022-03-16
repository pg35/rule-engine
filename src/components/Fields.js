import React from "react";

export default function Fields(props) {
  const { ruleListId, ruleId, fields, dispatch } = props;

  const defaultValues = {
    hidePrice: false,
    priceText: "",
    add2CartText: "",
    revokeCheckout: false,
    enableInquiry: false
  };
  const obj = { ...defaultValues, ...fields };

  const getHtmlId = (name) => `mwqt_${name}`;
  const getFieldValue = (e) => {
    switch (e.target.type) {
      case "checkbox":
        return e.target.checked;
      default:
        return e.target.value;
    }
  };
  const getFieldProps = (name, value) => ({
    name,
    id: getHtmlId(name),
    value,
    onChange: handleChange
  });
  const handleChange = (e) => {
    const field = { [e.target.name]: getFieldValue(e) };
    dispatch({
      type: "UPDATE_FIELD",
      ruleListId,
      ruleId,
      field
    });
  };

  return (
    <div>
      <div>
        <label htmlFor={getHtmlId("hidePrice")}>Hide price</label>
        <input
          type="checkbox"
          {...getFieldProps("hidePrice", "1")}
          checked={obj.hidePrice}
        />
      </div>
      {obj.hidePrice ? (
        <div>
          <label htmlFor={getHtmlId("priceText")}>Price text</label>
          <input type="text" {...getFieldProps("priceText", obj.priceText)} />
        </div>
      ) : null}
      <div>
        <label htmlFor={getHtmlId("add2cartText")}>AddToCart button text</label>
        <input
          type="text"
          {...getFieldProps("add2CartText", obj.add2CartText)}
        />
      </div>
      <div>
        <label htmlFor={getHtmlId("revokeCheckout")}>Revoke checkout</label>
        <input
          type="checkbox"
          {...getFieldProps("revokeCheckout", "1")}
          checked={obj.revokeCheckout}
        />
      </div>
      <div>
        <label htmlFor={getHtmlId("enableInquiry")}>Enable inquiry</label>
        <input
          type="checkbox"
          {...getFieldProps("enableInquiry", "1")}
          checked={obj.enableInquiry}
        />
      </div>
    </div>
  );
}
