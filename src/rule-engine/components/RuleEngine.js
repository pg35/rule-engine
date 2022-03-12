import RuleList from "./rule-engine/components/RuleList";

export default function RuleEngine(props) {
  const { screenConfig, rules } = props;
  return (
    <div>
      {Object.keys(screenConfig).map((screenId) => (
        <RuleList
          key={screenId}
          screenId={screenId}
          rules={rules[screenId]}
          fieldsComponent={Fields}
          onFieldchange={noop}
          onConditionChange={handleConditionChange}
          addRule={addRule}
          removeRule={removeRule}
          addCondition={addCondition}
          removeCondition={removeCondition}
          screenConfig={props.screenConfig}
        />
      ))}
    </div>
  );
}
