import Rule from "./Rule";

export default function RuleList(props) {
  const { rules, ...otherProps } = props;
  return (
    <div>
      <h3>{props.screenId} rules</h3>
      <div>
        {rules.map((rule) => (
          <Rule key={rule.id} rule={rule} {...otherProps} />
        ))}
      </div>
    </div>
  );
}
