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
import "./rule-engine/styles.css";

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

  const save = (e) => {
    dispatch({
      type: "FETCHING",
      fetching: true
    });
    doAjax({
      action: "save",
      state
    }).then((response) => {
      console.log("save", response);
      dispatch({
        type: "FETCHING",
        fetching: false
      });
    });
  };

  const reDispatch = (action) =>
    dispatch({ ...action, type: "RE_" + action.type });
  console.log("state", state);
  const { init, rules, fetching } = state;
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
      <button className="primary-button" onClick={save}>
        {fetching ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
