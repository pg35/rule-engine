import { reducer as ruleEngineReducer } from "./rule-engine/reducer";

export function reducer(state, action) {
  console.log(state, action);
  if (0 === action.type.indexOf("RE_"))
    return ruleEngineReducer(state, {
      ...action,
      type: action.type.substr(3)
    });
  switch (action.type) {
    case "INIT":
      return action.state;

    default:
      throw new Error("Store: Invalid action" + action.type);
  }
}
