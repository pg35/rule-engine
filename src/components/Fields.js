import React from "react";
import { getHtmlId, getFieldValue, cn } from "../rule-engine/util.js";
import st from "../rule-engine/components/css/common.module.css";

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

  const handleChange = (e) => {
    const field = { [e.target.name]: getFieldValue(e) };
    dispatch({
      type: "UPDATE_FIELD",
      ruleListId,
      ruleId,
      field
    });
  };
  const getFieldProps = (name, value) => ({
    name,
    id: getHtmlId(name),
    value,
    onChange: handleChange
  });
  return (
    <div>
      <div className={cn([st.md, st.md6])}>
        <div className={cn([st.field, st.inlineContent])}>
          <label htmlFor={getHtmlId("hidePrice")}>Hide price</label>
          <input
            type="checkbox"
            {...getFieldProps("hidePrice", "1")}
            checked={obj.hidePrice}
          />
        </div>
        {obj.hidePrice ? (
          <div className={st.field}>
            <label htmlFor={getHtmlId("priceText")}>Show as price</label>
            <input type="text" {...getFieldProps("priceText", obj.priceText)} />
          </div>
        ) : null}
        <div className={st.field}>
          <label htmlFor={getHtmlId("add2CartText")}>
            Add To Cart button text
          </label>
          <input
            type="text"
            {...getFieldProps("add2CartText", obj.add2CartText)}
          />
        </div>
      </div>
      <div className={cn([st.md, st.md6])}>
        <div className={cn([st.field, st.inlineContent])}>
          <label htmlFor={getHtmlId("revokeCheckout")}>Revoke checkout</label>
          <input
            type="checkbox"
            {...getFieldProps("revokeCheckout", "1")}
            checked={obj.revokeCheckout}
          />
        </div>
        <div className={cn([st.field, st.inlineContent])}>
          <label htmlFor={getHtmlId("enableInquiry")}>Allow inquiry</label>
          <input
            type="checkbox"
            {...getFieldProps("enableInquiry", "1")}
            checked={obj.enableInquiry}
          />
        </div>
        {obj.enableInquiry ? (
          <>
            <div className={cn([st.field, st.inlineContent])}>
              <label htmlFor={getHtmlId("enableInquiry")}>
                Empty cart after inquiry
              </label>
              <input
                type="checkbox"
                {...getFieldProps("enableInquiry", "1")}
                checked={obj.enableInquiry}
              />
            </div>
            <div className={cn([st.field, st.inlineContent])}>
              <label htmlFor={getHtmlId("enableInquiry")}>
                Disable acknowledgement email
              </label>
              <input
                type="checkbox"
                {...getFieldProps("enableInquiry", "1")}
                checked={obj.enableInquiry}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
