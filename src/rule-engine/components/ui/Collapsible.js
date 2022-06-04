import useCollapse from "react-collapsed";

export default function Collapsible(props) {
  const { isOpen, setOpen, defaultExpanded, collapsedHeight } = props;
  const config = {
    defaultExpanded: defaultExpanded || true,
    collapsedHeight: collapsedHeight || 0
  };
  if ("undefined" !== typeof isOpen) {
    config.isExpanded = isOpen;
  }
  const { getCollapseProps, getToggleProps } = useCollapse(config);
  const { headerContent = null, className = "" } = props;

  return (
    <div className={`collapsible ${className}`}>
      <div
        className="collapsible__header"
        {...getToggleProps(
          "function" === typeof setOpen
            ? { onClick: () => setOpen(!isOpen) }
            : {}
        )}
      >
        {headerContent}
      </div>
      <div {...getCollapseProps()}>
        <div className="collapsible__content">{props.children}</div>
      </div>
    </div>
  );
}
