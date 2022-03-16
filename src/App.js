import React, { useEffect, useReducer } from "react";
import Fields from "./components/Fields";
import RuleList from "./rule-engine/components/RuleList";
import { reducer } from "./store";
import {
  //  doAjax,
  doAjaxDummy as doAjax,
  prepareState
} from "./utility";
import "./styles.css";

export default function App(props) {
  const [state, dispatch] = useReducer(reducer, {
    init: false
  });

  useEffect(() => {
    doAjax({
      action: "seed"
    }).then((response) => {
      dispatch({
        type: "INIT",
        state: prepareState(response)
      });
    });
  }, []);

  const reDispatch = (action) =>
    dispatch({ ...action, type: "RE_" + action.type });
  //console.log(state);
  const { init, rules } = state;
  return !init ? (
    <AppLoading />
  ) : (
    <div>
      {Object.keys(props.rulesConfig).map((id) => (
        <RuleList
          key={id}
          id={id}
          rules={rules[id]}
          fieldsComponent={Fields}
          config={props.rulesConfig[id]}
          dispatch={reDispatch}
        />
      ))}
    </div>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
