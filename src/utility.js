import { conditions, operators } from "./rule-engine/config";

const ajaxUrl = "undefined" === typeof ajaxurl ? "" : ajaxurl;
const spinnerUrl =
  "undefined" === typeof mwqcSpinnerUrl
    ? "http://immi.epizy.com/wp-includes/images/spinner.gif"
    : mwqcSpinnerUrl;

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
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  credentials: "same-origin"
};
const dummyResponses = {
  abc: {
    condition_info: JSON.parse(
      '{"1":{"name":"a","category":"b","op_ids":[1,2,3]},"2":{"name":"ab1","category":"c","op_ids":[3]}}'
    ),
    operator_info: {
      1: { name: "in list" },
      2: { name: "not in list" },
      3: { name: "equal" }
    },
    rules: [{ a: 1 }, { b: 2 }]
  }
};
function doAjaxDummy(url, options) {
  return new Promise(function (r, re) {
    setTimeout(() => {
      r(dummyResponses.abc);
    }, 200);
  });
}
function doAjax(url, options) {
  return fetch(url, { ...ajaxGlobals, ...options })
    .then(checkStatus)
    .then(parseJSON);
}
const globals = {};
const screenConfig = {
  inquiry: [[1, 2, 3], [2]],
  cart: [[1]]
};
const cache = {};
console.log(conditions, operators);
export function getkeyOptions(screenId, index) {
  const cacheKey = `${screenId}_${index}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  let groups = {};
  for (const p in screenConfig) {
    if (p === screenId) {
      screenConfig[p][index].forEach((conditionId) => {
        const condition = conditions[conditionId];
        console.log(conditionId, condition);
        if (!groups[condition.group]) groups[condition.group] = [];
        groups[condition.group].push(
          <option value={conditionId} key={conditionId}>
            {condition.name}
          </option>
        );
      });
    }
  }
  let options = [];
  if (Object.keys(groups).length > 1) {
    for (const p in groups) {
      options.push(
        <optgroup label={p} key={p}>
          {groups[p]}
        </optgroup>
      );
    }
  } else {
    options = groups[Object.keys(groups)[0]];
  }
  cache[cacheKey] = options;
  return options;
}
export { ajaxUrl, spinnerUrl, doAjax, doAjaxDummy, globals };
