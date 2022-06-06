export const keys = {
  1: {
    name: "Id",
    group: "Product",
    operatorIds: [1, 2],
    defaultValue: [],
    input: "multiselect"
  },
  2: {
    name: "Price",
    group: "Product",
    operatorIds: [3, 4],
    defaultValue: "",
    input: "text"
  },
  3: {
    name: "Category",
    group: "Product",
    operatorIds: [1, 2],
    defaultValue: [],
    input: "multiselect"
  },
  256: {
    name: "Id",
    group: "Customer",
    operatorIds: [1, 2],
    defaultValue: [],
    input: "multiselect"
  },
  257: {
    name: "IP",
    group: "Customer",
    operatorIds: [3, 4],
    defaultValue: "",
    input: "text"
  }
};
export const operators = {
  1: { name: "in" },
  2: { name: "not in" },
  3: { name: "equal" },
  4: { name: "not equal" }
};
// freeze config objs
