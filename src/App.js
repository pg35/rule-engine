import { useState, useEffect, useReducer } from "react";
import RuleList from "./rule-engine/components/RuleList";
import { reducer } from "./store";
import {
  //  doAjax,
  doAjaxDummy as doAjax,
  prepareRules
} from "./utility";
import "./styles.css";

export default function App(props) {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, { inquiry: [], cart: [] });

  useEffect(() => {
    doAjax({
      action: "seed"
    }).then((response) => {
      //setRules(prepareRules(response, props.screenConfig));
      dispatch({
        type: "INIT",
        state: prepareRules(response, props.screenConfig)
      });
      setLoading(false);
    });
  }, []);

  //console.log(state);
  return loading ? (
    <AppLoading />
  ) : (
    <div>
      {Object.keys(props.screenConfig).map((screenId) => (
        <RuleList
          key={screenId}
          screenId={screenId}
          rules={state[screenId]}
          fieldsComponent={Fields}
          screenConfig={props.screenConfig}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
function Fields(props) {
  return <div>hello</div>;
}
