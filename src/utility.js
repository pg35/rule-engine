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
  seed1: {
    rules: {
      inquiry: [],
      cart: [],
      nextId: 0
    },
    objects: { 1: [] }
  },
  seed: {
    rules: {
      inquiry: [
        {
          id: 1,
          name: "firt rule",
          active: true,
          priority: 100,
          fields: {
            hidePrice: true,
            priceText: "price is hidden",
            add2CartText: "inquire",
            revokeCheckout: true,
            enableInquiry: true,
            emtpyCart: true,
            disableAck: true
          },
          criteria: [
            [
              { id: 100, keyId: 1, opId: 1, value: [1, 3, 4] },
              { id: 101, keyId: 2, opId: 3, value: 55.32 }
            ],
            []
          ]
        }
      ],
      cart: [],
      nextId: 500
      //{ id: 1, keyId: 3, opId: 1, value: ['198.0.0.1','172.0.0.16'] },
    },
    objects: {
      1: {
        1: { name: "imran" },
        2: { name: "ali" },
        3: { name: "hello world" }
      }
    }
  },
  save: "changed saved."
};

function doAjaxDummy(options, url) {
  console.log("ajax", options);
  return new Promise(function (r, re) {
    setTimeout(() => {
      r(dummyResponses[options.action]);
    }, 2000);
  });
}
function doAjax(options, url) {
  return fetch(url || ajaxUrl, { ...ajaxGlobals, ...options })
    .then(checkStatus)
    .then(parseJSON);
}

function ids2Options(ids, map) {
  return ids.map((id) => ({
    value: id,
    label: map[id] ? map[id].name : `NameNotFound (#${id})`
  }));
}

function options2Ids(options) {
  return options.map((obj) => obj.value);
}

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

let keyId2Objects;
export function prepareInitState(data) {
  keyId2Objects = data.objects;
  return {
    init: false,
    dirty: false,
    fetching: false,
    rules: mapConditions(data.rules, (obj) => ({
      ...obj,
      value: keyId2Objects[obj.keyId]
        ? ids2Options(obj.value, keyId2Objects[obj.keyId])
        : obj.value
    }))
  };
}

export function prepareSaveState(state) {
  return {
    rules: mapConditions(state.rules, (obj) => ({
      ...obj,
      value: keyId2Objects[obj.keyId] ? options2Ids(obj.value) : obj.value
    }))
  };
}

export { ajaxUrl, spinnerUrl, doAjax, doAjaxDummy };
