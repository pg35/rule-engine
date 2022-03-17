import React from "react";
import Field from "../rule-engine/components/ui/Field";

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

  const getFieldProps = (name, value, type, layout, label) => ({
    field: {
      name,
      value,
      type,
      id: `rule${ruleId}-${name}`,
      layout,
      label
    },
    action: {
      type: "UPDATE_FIELD",
      ruleListId: ruleListId,
      ruleId: ruleId
    },
    dispatch: dispatch,
    key: "rule" + name
  });
  return (
    <div>
      <div className={""}>
        <Field
          {...getFieldProps(
            "hidePrice",
            obj.hidePrice,
            "checkbox",
            "horizontal",
            "Hide price"
          )}
        />
        {obj.hidePrice ? (
          <Field
            {...getFieldProps(
              "priceText",
              obj.priceText,
              undefined,
              undefined,
              "Show as price"
            )}
          />
        ) : null}
        <Field
          {...getFieldProps(
            "add2CartText",
            obj.add2CartText,
            undefined,
            undefined,
            "Add To Cart button text"
          )}
        />
      </div>
      <div className={""}>
        <Field
          {...getFieldProps(
            "revokeCheckout",
            obj.revokeCheckout,
            "checkbox",
            "horizontal",
            "Revoke checkout"
          )}
        />
        <Field
          {...getFieldProps(
            "enableInquiry",
            obj.enableInquiry,
            "checkbox",
            "horizontal",
            "Allow inquiry"
          )}
        />
        {obj.enableInquiry ? (
          <>
            <Field
              {...getFieldProps(
                "emtpyCart",
                obj.emtpyCart,
                "checkbox",
                "horizontal",
                "Empty cart after inquiry"
              )}
            />
            <Field
              {...getFieldProps(
                "disableAck",
                obj.disableAck,
                "checkbox",
                "horizontal",
                "Disable acknowledgement email"
              )}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
