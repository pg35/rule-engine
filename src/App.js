import { useState, useEffect } from "react";

import Rule from "./rule-engine/components/Rule";
import {
  ajaxUrl,
  doAjax,
  doAjaxDummy,
  globals,
  getkeyOptions
} from "./utility";

import "./styles.css";
let nextId = 5;
export default function App() {
  const [loading, setLoading] = useState(true);
  const [inquiryRules, setInquiryRules] = useState([]);
  const [nextId, setNextId] = useState(0);
  useEffect(() => {
    doAjaxDummy(ajaxUrl, {}).then((data) => {
      globals.appData = data;
      setLoading(false);
    });
  });
  const c1 = { id: 1, keyId: 1, opId: 1, value: "test" };
  const c2 = { id: 2, keyId: 2, opId: 2, value: "test1" };

  function createRule(id) {
    console.log(id);
    return { id, fields: {}, criteria: [[c1], [c2]] };
  }
  const addRule = () => {
    setInquiryRules(inquiryRules.concat(createRule(nextId + 1)));
    setNextId((nextId) => nextId + 1);
  };
  if (loading) {
    return <AppLoading />;
  }
  const handleConditionChange = ({ screenId, ruleId, condition }) => {
    console.log(screenId, ruleId, condition);
    if (1 || "inquiry" === screenId) {
      setInquiryRules(
        inquiryRules.map((rule) => {
          if (ruleId === rule.id) {
            console.log("found");
            rule.criteria = rule.criteria.map((conditions) => {
              return conditions.map((obj) => {
                if (obj.id === condition.id) {
                  const newCond = { ...obj, ...condition };
                  console.log(obj, newCond);
                  return newCond;
                }
                return obj;
              });
            });
            console.log(rule);
          }

          return rule;
        })
      );
    }
  };

  const noop = function () {};
  //console.log(inquiryRules);
  return (
    <>
      <button onClick={addRule}>Add Rule</button>
      {inquiryRules.map((rule) => (
        <Rule
          key={rule.id}
          rule={rule}
          keyOptions={getkeyOptions("inquiry", 0)}
          onFieldChange={noop}
          onConditionChange={handleConditionChange}
          fieldsComponent={Fields}
        />
      ))}
    </>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
function Fields(props) {
  return <div>hello</div>;
}
