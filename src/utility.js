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

function buildSelectOptions(ids, map) {
  return ids.map((id) => ({
    value: id,
    label: map[id] ? map[id].name : `NameNotFound (#${id})`
  }));
}

function mapConditions(rules, func) {
  for (const p in rules) {
    if (Array.isArray(rules[p])) {
      rules[p].forEach((rule) =>
        rule.criteria.forEach((list) => (list = list.forEach(func)))
      );
    }
  }
  return rules;
}
export function prepareState(data) {
  const objects = data.objects;
  return {
    init: false,
    fetching: false,
    //rules: objIdsToSelectOptions(data.rules, data.objects)
    rules: mapConditions(data.rules, function (obj) {
      if (objects[obj.keyId]) {
        obj.value = buildSelectOptions(obj.value, objects[obj.keyId]);
      }
      return obj;
    })
  };
}
export { ajaxUrl, spinnerUrl, doAjax, doAjaxDummy };
