import Option from "./components/ui/Option";
import { keys, operators } from "./config";

const cache = {};

export function getKeyOptions(
  config,
  ruleListId,
  condListIndex,
  selectedValue
) {
  /*disabled caching b/c of adding group to the selected option's label
  const cacheKey = `${ruleListId}_${condListIndex}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  */

  let groups = {};
  config.criteria[condListIndex].keyIds.forEach((keyId) => {
    const obj = keys[keyId];
    if (!groups[obj.group]) groups[obj.group] = [];
    groups[obj.group].push(
      <Option
        value={keyId}
        key={keyId}
        label={obj.name}
        optgroup={obj.group}
        selectedValue={selectedValue}
      />
    );
  });

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
  //cache[cacheKey] = options;
  return options;
}

export function getOperatorIds(keyId) {
  return keys[keyId].operatorIds;
}

export function getOperatorOptions(keyId) {
  const cacheKey = `oprators_${keyId}`;
  if (cache[cacheKey]) return cache[cacheKey];
  const options = keys[keyId].operatorIds.map((opId) => (
    <option value={opId} key={opId}>
      {operators[opId].name}
    </option>
  ));
  cache[cacheKey] = options;
  return options;
}

export function getKeyDefaultValue(keyId) {
  return keys[keyId].defaultValue;
}
export function getKeyInputControl(keyId) {
  return keys[keyId].input;
}
export function isMultiSelectInput(keyId) {
  return "multiselect" === keys[keyId].input;
}
export function getHtmlId(name, prefix = "mwre") {
  return `${prefix}_${name}`;
}

export function getFieldValue(e) {
  switch (e.target.type) {
    case "checkbox":
      return e.target.checked;
    default:
      return e.target.value;
  }
}

export function cn(arr) {
  return arr.join(" ");
}

function buildOptions(obj) {
  return !obj
    ? []
    : Object.keys(obj).map((id) => ({ value: id, label: obj[id] }));
}

function getGlobalVar(name, key) {
  const value = window.mwreParams && window.mwreParams[name];
  return value && key && value[key] ? value[key] : value;
}

export function getMultiSelectProps(keyId) {
  switch (keyId) {
    case 1:
      return {
        action: "woocommerce_json_search_products_and_variations",
        security: getGlobalVar("nonce", "search-products"),
        labels: { single: "product", plural: "products" },
        buildOptions
      };

    case 3:
      return {
        action: "woocommerce_json_search_categories",
        security: getGlobalVar("nonce", "search_categories"),
        labels: { single: "category", plural: "categories" },
        buildOptions
      };
    case 256:
      return {
        action: "woocommerce_json_search_customers",
        security: getGlobalVar("nonce", "search-customers"),
        labels: { single: "customer", plural: "customers" },
        buildOptions
      };
    default:
      throw new Error("invalid keyid = " + keyId);
  }
}
