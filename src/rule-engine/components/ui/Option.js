export default function Option(props) {
  const { value, label, optgroup, selectedValue } = props;
  return (
    <option value={value}>
      {value === Number(selectedValue) ? `${optgroup} ` : ""}
      {label}
    </option>
  );
}
