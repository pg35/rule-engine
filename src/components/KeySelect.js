import { useState } from "react";
import { globals } from "../utility";

export default function KeySelect(props) {
  const data = globals.appData.condition_info;
  /*
  let group2Items = {};
  for (const key in data) {
    const obj = data[key];
    if (!group2Items[obj.category]) group2Items[obj.category] = [];
    group2Items[obj.category].push([key, obj.name]);
  }
  let optionGroups = [];
  for (const group in group2Items) {
    const options = group2Items[group].map((item) => (
      <option value={item[0]} key={item[0]}>
        {item[1]}
      </option>
    ));
    optionGroups.push(
      <optgroup label={group} key={group}>
        {options}
      </optgroup>
    );
  }
  */
  let group2Options = {};
  for (const key in data) {
    const obj = data[key];
    const group = obj.category;
    if (!group2Options[group]) {
      group2Options[group] = [];
    }
    group2Options[group].push(
      <option value={key} key={key}>
        {obj.name}
      </option>
    );
  }
  let optgroups = [];
  for (const p in group2Options) {
    optgroups.push(
      <optgroup label={p} key={p}>
        {group2Options[p]}
      </optgroup>
    );
  }
  return (
    <select
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    >
      {optgroups}
    </select>
  );
}
