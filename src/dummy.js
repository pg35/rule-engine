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
          active: false,
          priority: 100,
          uiIsExpanded: true,
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
            //array of conditionlists
            [
              { id: 100, keyId: 1, opId: 1, value: [1, 3, 4] },
              { id: 101, keyId: 2, opId: 3, value: 55.32 }
            ],
            []
          ]
        },
        {
          id: 2,
          name: "2bs",
          active: true,
          priority: 101,
          uiIsExpanded: true,
          fields: {},
          criteria: [[], []]
        }
      ],
      cart: [],
      nextId: 500
      //{ id: 1, keyId: 3, opId: 1, value: ['198.0.0.1','172.0.0.16'] },
    },
    key2EntityType: {
      1: "product"
    },
    type2Entities: {
      product: {
        1: "p1",
        2: "p2",
        3: "special p"
      }
    }
  },
  woocommerce_json_search_products_and_variations: {
    1: "p1",
    2: "p2",
    3: "special p"
  },
  woocommerce_json_search_customers: {
    1: "first last (#1 fl@fl.com)",
    2: "2nd customer",
    3: "3rd customer"
  },
  woocommerce_json_search_categories: {
    1: "apparal (15)",
    2: "vola (33)"
  },
  save: "changed saved."
};

export { dummyResponses };
