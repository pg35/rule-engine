export default function MultiSelectOptionLabel(props) {
  return props.str
    .split(/(&[^;]+;)/)
    .filter((tok) => tok)
    .map((tok, index) =>
      /&[^;]+;/.test(tok) ? (
        <span key={index} dangerouslySetInnerHTML={{ __html: tok }} />
      ) : (
        <span key={index}>{tok}</span>
      )
    );
}
