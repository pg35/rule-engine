export const keys = {
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
// freeze config objs
