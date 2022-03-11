import { useState, useEffect } from "react";
import RuleList from "./rule-engine/components/RuleList";
import {
  //  doAjax,
  doAjaxDummy as doAjax,
  prepareRules
} from "./utility";
import "./styles.css";

export default function App(props) {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState({});

  useEffect(() => {
    doAjax({
      action: "seed"
    }).then((response) => {
      setRules(prepareRules(response, props.screenConfig));
      setLoading(false);
    });
  }, []);

  function createRule(id) {
    return { id, props: {}, criteria: [[], []] };
  }
  function createCondition(id) {
    return { id, keyId: 2, opId: 3, value: "" };
  }
  const addRule = (screenId) => {
    setRules((state) => {
      const nextId = ++state.nextId;
      const rules = state[screenId] || [];
      return {
        ...state,
        [screenId]: rules.concat(createRule(nextId))
      };
    });
  };
  const removeRule = (screenId, ruleId) => {
    setRules({
      ...rules,
      [screenId]: rules[screenId].filter((rule) => rule.id !== ruleId)
    });
  };

  const addCondition = (screenId, ruleId, listIndex) => {
    console.log("addcondition", screenId, ruleId, listIndex);
    setRules((state) => {
      const nextId = ++state.nextId;
      const rules = state[screenId];
      return {
        ...state,
        [screenId]: rules.map((rule) => {
          if (ruleId === rule.id) {
            return {
              ...rule,
              criteria: rule.criteria.map((list, idx) =>
                listIndex === idx ? list.concat(createCondition(nextId)) : list
              )
            };
          }
          return rule;
        })
      };
    });
  };

  const removeCondition = (screenId, ruleId, listIndex, conditionId) => {
    setRules({
      ...rules,
      [screenId]: rules[screenId].map((rule) => {
        if (ruleId === rule.id) {
          return {
            ...rule,
            criteria: rule.criteria.map((list, idx) =>
              listIndex === idx
                ? list.filter((obj) => obj.id !== conditionId)
                : list
            )
          };
        }
        return rule;
      })
    });
  };

  const handleConditionChange = ({ screenId, ruleId, condition }) => {
    console.log(screenId, ruleId, condition);
    setRules({
      ...rules,
      screenId: rules[screenId].map((rule) => {
        if (ruleId === rule.id) {
          console.log("found");
          rule.criteria = rule.criteria.map((list) => {
            return list.map((obj) => {
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
  };

  const noop = function () {};
  // console.log(rules);
  return loading ? (
    <AppLoading />
  ) : (
    <>
      {Object.keys(props.screenConfig).map((screenId) => (
        <RuleList
          key={screenId}
          screenId={screenId}
          rules={rules[screenId]}
          fieldsComponent={Fields}
          onFieldchange={noop}
          onConditionChange={handleConditionChange}
          addRule={addRule}
          removeRule={removeRule}
          addCondition={addCondition}
          removeCondition={removeCondition}
          screenConfig={props.screenConfig}
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
