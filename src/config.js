const productCriteria = {
  labels: {
    field: "Products",
    empty: "Applies to all products.",
    addNew: "Add Product"
  },
  descritpion: ""
};
const conditionCriteria = {
  labels: {
    field: "Conditions",
    empty: "Applies in all cases.",
    addNew: "Add Condition"
  },
  descritpion: ""
};
const rulesConfig = {
  inquiry: {
    label: "Inquiry",
    criteria: [
      {
        ...productCriteria,
        keyIds: [1, 2, 3]
      },
      {
        ...conditionCriteria,
        keyIds: [2]
      }
    ]
  },
  cart: {
    label: "Cart",
    criteria: [
      {
        ...productCriteria,
        keyIds: [1, 2, 3]
      },
      {
        ...conditionCriteria,
        keyIds: [2]
      }
    ]
  }
};

const ajaxUrl = window.ajaxurl;
const slug = "mwqt";

export { rulesConfig, ajaxUrl, slug };
