import { useState, useEffect } from "react";
import RuleList from "./rule-engine/components/RuleList";
import { screenConfig } from "./rule-engine/config";
import {
  //  doAjax,
  doAjaxDummy as doAjax,
  globals
} from "./utility";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState({});
  const c = {
    id: 500
  };

  useEffect(() => {
    console.log("aaa");
    doAjax({
      action: "seed"
    }).then((response) => {
      globals.appData = response;
      setRules(response.rules);
      setLoading(false);
    });
  }, []);

  function createRule(id) {
    return { id, fields: {}, criteria: [] };
  }
  const addRule = (screenId, id) => {
    const oldRules = rules[screenId] || [];
    console.log(id);
    setRules({
      ...rules,
      [screenId]: oldRules.concat(createRule(id))
    });
  };

  const handleConditionChange = ({ screenId, ruleId, condition }) => {
    console.log(screenId, ruleId, condition);
    if ("inquiry" === screenId) {
      setRules({
        ...rules,
        screenId: rules[screenId].map((rule) => {
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
      });
    } else throw new Error("unknown screenid " + screenId);
  };

  const noop = function () {};
  console.log(rules);
  return loading ? (
    <AppLoading />
  ) : (
    <>
      <button onClick={(e) => addRule("inquiry", ++c.id)}>Add Rule</button>
      {Object.keys(screenConfig).map((screenId) => (
        <RuleList
          key={screenId}
          screenId={screenId}
          rules={rules[screenId]}
          fieldsComponent={Fields}
          onFieldchange={noop}
          onConditionChange={handleConditionChange}
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
