export const conditions = {
  1: { name: "Id", group: "Product", operatorIds: [1, 2] },
  2: { name: "Price", group: "Product", operatorIds: [3, 4] },
  3: { name: "IP", group: "Customer", operatorIds: [1, 2] }
};
export const operators = {
  1: { name: "in" },
  2: { name: "not in" },
  3: { name: "equal" },
  4: { name: "not equal" }
};
// freeze config objs
const cache = {};

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
