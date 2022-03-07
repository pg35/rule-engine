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
  seed: {
    rules: {
      inquiry: [
        {
          id: 1,
          props: {},
          criteria: [
            [
              { id: 100, keyId: 1, opId: 1, value: [3] },
              { id: 101, keyId: 2, opId: 3, value: 55.32 }
            ],
            []
          ]
        }
      ],
      cart: []
      //{ id: 1, keyId: 3, opId: 1, value: ['198.0.0.1','172.0.0.16'] },
    },
    products: {
      1: { name: "imran" },
      2: { name: "ali" },
      3: { name: "hello world" }
    },
    nextId: 500
  }
};

function doAjaxDummy(options, url) {
  return new Promise(function (r, re) {
    setTimeout(() => {
      r(dummyResponses[options.action]);
    }, 200);
  });
}
function doAjax(options, url) {
  return fetch(url || ajaxUrl, { ...ajaxGlobals, ...options })
    .then(checkStatus)
    .then(parseJSON);
}
const globals = {};

//console.log(conditions, operators);

export function getProductOptions(productIds) {
  return productIds.map((id) => ({
    value: id,
    label: globals.appData.products[id]
      ? globals.appData.products[id].name
      : `NameNotFound (#${id})`
  }));
}

export { ajaxUrl, spinnerUrl, doAjax, doAjaxDummy, globals };
