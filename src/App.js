import React, { useEffect, useReducer } from "react";
import Fields from "./components/Fields";
import RuleList from "./rule-engine/components/RuleList";
import { reducer } from "./store";
import {
  //  doAjax,
  doAjaxDummy as doAjax,
  prepareInitState,
  prepareSaveState
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
        flag: true,
        state: prepareInitState(response)
      });
    });
  }, []);

  const save = (e) => {
    dispatch({
      type: "FETCHING",
      flag: true
    });
    doAjax({
      action: "save",
      data: prepareSaveState(state)
    }).then((response) => {
      console.log("save response", response);
      dispatch({
        type: "FETCHING",
        flag: false
      });
      dispatch({
        type: "DIRTY",
        flag: false
      });
    });
  };

  const reDispatch = (action) =>
    dispatch({ ...action, type: "RE_" + action.type });
  console.log("state", state);
  const { init, rules, fetching, dirty } = state;
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
      <button
        className="primary-button"
        onClick={save}
        disabled={!dirty ? true : false}
      >
        {fetching ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
