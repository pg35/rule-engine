import { keys, operators } from "./config";

const cache = {};

export function getKeyOptions(config, ruleListId, condListIndex) {
  const cacheKey = `${ruleListId}_${condListIndex}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let groups = {};
  config.criteria[condListIndex].keyIds.forEach((keyId) => {
    const obj = keys[keyId];
    if (!groups[obj.group]) groups[obj.group] = [];
    groups[obj.group].push(
      <option value={keyId} key={keyId}>
        {obj.name}
      </option>
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
  cache[cacheKey] = options;
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
const buildOptions = (obj) =>
  !obj ? [] : Object.keys(obj).map((id) => ({ value: id, label: obj[id] }));

export function getMultiSelectProps(keyId) {
  switch (keyId) {
    case 1:
      return {
        action: "woocommerce_json_search_products_and_variations",
        labels: { single: "product", plural: "products" },
        buildOptions
      };
    case 3:
      return {
        action: "woocommerce_json_search_products_and_variations",
        labels: { single: "customer", plural: "customers" },
        buildOptions
      };
    default:
      throw new Error("invalid keyid = " + keyId);
  }
}
