import axios from "axios";
import { slug, ajaxUrl } from "./config";
import { dummyResponses } from "./dummy";

const axiosInstance = axios.create({
  baseURL: ajaxUrl,
  timeout: 5000, //5 secs
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
});
/*
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const msg = response.statusText ? response.statusText : "Network Error";
    var error = new Error(msg);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export let ajaxGlobals = {
  method: "POST",
  body: "",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  credentials: "same-origin"
};
*/

function doAjaxDummy(options) {
  console.log("ajax", options);
  return new Promise(function (r, re) {
    setTimeout(() => {
      r(dummyResponses[options.action]);
    }, 2000);
  });
}

/*
function doAjax(options, url) {
  return fetch(url || ajaxUrl, { ...ajaxGlobals, ...options })
    .then(checkStatus)
    .then(parseJSON);
}
*/

function doAjax(data, config = {}, url = null) {
  if (data.action) data[`${slug}_${data.action}`] = data.action;
  const dataKey = "get" === config["method"] ? "params" : "data";
  config[dataKey] = data;
  if (url) config.url = url;
  return axiosInstance(config);
}

function changeIds2Options(ids, map) {
  return ids.map((id) => ({
    value: id,
    label: map[id] ? map[id] : `NameNotFound (#${id})`
  }));
}

//currently not being used. keeping it for any future use.
function iterateConditions(rules, func) {
  for (const p in rules) {
    if (Array.isArray(rules[p])) {
      rules[p].forEach((rule) =>
        rule.criteria.forEach((list) => (list = list.forEach(func)))
      );
    }
  }
  return rules;
}

function mapConditions(rules, func) {
  const newRules = {};
  for (const p in rules) {
    if (Array.isArray(rules[p])) {
      newRules[p] = rules[p].map((rule) => ({
        ...rule,
        criteria: rule.criteria.map((list) => list.map(func))
      }));
    } else newRules[p] = rules[p];
  }
  return newRules;
}

let seed = null;
export function prepareInitState(data) {
  seed = data;
  return {
    init: false,
    dirty: false,
    fetching: false,
    rules: mapConditions(data.rules, (obj) => {
      const entityType = data.key2EntityType[obj.keyId];
      if (entityType) {
        return {
          ...obj,
          value: changeIds2Options(obj.value, data.type2Entities[entityType])
        };
      } else return obj;
    })
  };
}

export function prepareSaveState(state) {
  return {
    rules: mapConditions(state.rules, (obj) => {
      const entityType = seed.key2EntityType[obj.keyId];
      if (entityType) {
        return {
          ...obj,
          value: obj.value.map((option) => option.value)
        };
      } else return obj;
    })
  };
}

export { ajaxUrl, doAjax, doAjaxDummy };
