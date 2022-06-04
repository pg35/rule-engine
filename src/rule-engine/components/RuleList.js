import Rule from "./Rule";
import RuleHeader from "./RuleHeader";
import DragDropContext from "./ui/DragDropContext";
import Droppable from "./ui/Droppable";
import Draggable from "./ui/Draggable";
import Collapsible from "./ui/Collapsible";

export default function RuleList(props) {
  const { id, rules, ...otherProps } = props;
  const { config, dispatch } = props;

  return (
    <div className={`objlist rulelist rulelist-${config.label}`}>
      <div className="rulelist__header">
        <h2 className="rulelist__title">{config.label} rules</h2>
      </div>
      <div className="objlist__content">
        {!rules.length ? (
          <div className="objlist__empty">No rules configured.</div>
        ) : (
          <DragDropContext
            onDragEnd={(sourceIndex, destIndex) => {
              if ("undefined" !== typeof destIndex) {
                dispatch({
                  type: "SWAP_RULE",
                  ruleListId: id,
                  sourceIndex,
                  destIndex
                });
              }
            }}
          >
            <Droppable id={id} type={id}>
              {rules.map((rule, index) => (
                <Draggable key={rule.id} id={rule.id.toString()} index={index}>
                  {(draggableProps) => (
                    <Collapsible
                      key={rule.id}
                      className={`rule rule-${rule.id} ${
                        rule.active ? "rule--active" : ""
                      } ${draggableProps.isDragging ? "rule--dragging" : ""}`}
                      headerContent={
                        <div {...draggableProps.dragHandleProps}>
                          <RuleHeader
                            ruleListId={id}
                            rule={rule}
                            dispatch={dispatch}
                          />
                        </div>
                      }
                      isOpen={rule.uiIsExpanded}
                      setOpen={(flag) =>
                        dispatch({
                          type: "UPDATE_RULE",
                          ruleListId: id,
                          ruleId: rule.id,
                          field: {
                            uiIsExpanded: flag
                          }
                        })
                      }
                    >
                      <Rule rule={rule} ruleListId={id} {...otherProps} />
                    </Collapsible>
                  )}
                </Draggable>
              ))}
            </Droppable>
          </DragDropContext>
        )}
        <div className="objlist__add">
          <button
            className="button"
            onClick={(e) =>
              dispatch({
                type: "ADD_RULE",
                ruleListId: id
              })
            }
          >
            Add Rule
          </button>
          <button
            className="button"
            onClick={(e) =>
              dispatch({
                type: "EXPAND_ALL_RULES",
                ruleListId: id,
                expand: false
              })
            }
          >
            Collapse All Rules
          </button>
          <button
            className="button"
            onClick={(e) =>
              dispatch({
                type: "EXPAND_ALL_RULES",
                ruleListId: id,
                expand: true
              })
            }
          >
            Expand All Rules
          </button>
        </div>
      </div>
    </div>
  );
}
