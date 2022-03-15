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
