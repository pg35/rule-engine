export const conditions = {
  1: { name: "Id", group: "Product", operatorIds: [1, 2], defaultValue: [] },
  2: { name: "Price", group: "Product", operatorIds: [3, 4], defaultValue: "" },
  3: { name: "IP", group: "Customer", operatorIds: [1, 2], defaultValue: "" }
};
export const operators = {
  1: { name: "in" },
  2: { name: "not in" },
  3: { name: "equal" },
  4: { name: "not equal" }
};
export const screenConfig = {
  inquiry: [[1, 2, 3], [2]],
  cart: [[1], [2]]
};
// freeze config objs

const cache = {};

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

export function getOperatorIds(conditionId) {
  return conditions[conditionId].operatorIds;
}

export function getOperatorOptions(conditionId) {
  const cacheKey = `oprators_${conditionId}`;
  if (cache[cacheKey]) return cache[cacheKey];
  const options = conditions[conditionId].operatorIds.map((opId) => (
    <option value={opId} key={opId}>
      {operators[opId].name}
    </option>
  ));
  cache[cacheKey] = options;
  return options;
}

export function getDefaultValue(conditionId) {
  return conditions[conditionId].defaultValue;
}
