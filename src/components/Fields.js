import React from "react";
import Field from "../rule-engine/components/ui/Field";

export default function Fields(props) {
  const { ruleListId, ruleId, fields, dispatch } = props;

  const defaultValues = {
    hidePrice: false,
    priceText: "",
    add2CartText: "",
    revokeCheckout: false,
    enableInquiry: false,
    emtpyCart: false,
    disableAck: false
  };
  const obj = { ...defaultValues, ...fields };

  const getFieldProps = (name, value, type, label, layout) => ({
    field: {
      name,
      value,
      type,
      id: `rule${ruleId}-${name}`,
      label,
      layout
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
      <div className="row">
        <div className="col-md-6">
          <Field
            {...getFieldProps(
              "hidePrice",
              obj.hidePrice,
              "checkbox",
              "Hide price"
            )}
          />
          {obj.hidePrice ? (
            <Field
              {...getFieldProps(
                "priceText",
                obj.priceText,
                "text",
                "Show as price"
              )}
            />
          ) : null}
          <Field
            {...getFieldProps(
              "add2CartText",
              obj.add2CartText,
              "text",
              "Add To Cart button text"
            )}
          />
        </div>

        <div className="col-md-6">
          <Field
            {...getFieldProps(
              "revokeCheckout",
              obj.revokeCheckout,
              "checkbox",
              "Revoke checkout"
            )}
          />
          <Field
            {...getFieldProps(
              "enableInquiry",
              obj.enableInquiry,
              "checkbox",
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
                  "Empty cart after inquiry"
                )}
              />
              <Field
                {...getFieldProps(
                  "disableAck",
                  obj.disableAck,
                  "checkbox",
                  "Disable acknowledgement email"
                )}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
