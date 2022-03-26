import { reducer as ruleEngineReducer } from "./rule-engine/reducer";

export function reducer(state, action) {
  console.log("reducer", action);
  if (0 === action.type.indexOf("RE_"))
    return {
      ...state,
      dirty: true,
      rules: ruleEngineReducer(state.rules, {
        ...action,
        type: action.type.substr(3)
      })
    };
  switch (action.type) {
    case "INIT":
      return {
        ...action.state,
        init: action.flag
      };
    case "FETCHING":
    case "DIRTY":
      return {
        ...state,
        [action.type.toLowerCase()]: action.flag
      };

    default:
      throw new Error("Store: Invalid action" + action.type);
  }
}
