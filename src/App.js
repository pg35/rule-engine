import { useState, useEffect } from "react";

import Rule from "./components/Rule";
import {
  ajaxUrl,
  doAjax,
  doAjaxDummy,
  globals,
  getkeyOptions
} from "./utility";

import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    doAjaxDummy(ajaxUrl, {}).then((data) => {
      globals.appData = data;
      setLoading(false);
      setRules(data.rules);
    });
  });

  const [v1, setv1] = useState(1);
  const [v1a, setv1a] = useState(3);
  const [v1b, setv1b] = useState(2);
  const [v2, setv2] = useState(2);

  if (loading) {
    return <AppLoading />;
  }

  const arr = [1, 2, 3];
  const o1 = arr.map((i) => <option value={i}>{"option " + i}</option>);
  const o2 = o1;
  return (
    <>
      <div>Loaded {rules.length} Rules</div>
      <select value={v1} onChange={(e) => setv1(e.target.value)}>
        {getkeyOptions("inquiry", 0)}
      </select>
      <select value={v1a} onChange={(e) => setv1a(e.target.value)}>
        {getkeyOptions("inquiry", 0)}
      </select>
      <select value={v1b} onChange={(e) => setv1b(e.target.value)}>
        {getkeyOptions("inquiry", 0)}
      </select>
      <select value={v2} onChange={(e) => setv2(e.target.value)}>
        {getkeyOptions("inquiry", 1)}
      </select>
    </>
  );
}

function AppLoading() {
  return <div>Initializing.......</div>;
}
