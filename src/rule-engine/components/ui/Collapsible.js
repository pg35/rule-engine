import React from "react";
import useCollapse from "react-collapsed";

export default function Collapsible(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || true,
    collapsedHeight: props.collapsedHeight || 0
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  const { headerContent = null, className = "" } = props;

  return (
    <div className={`collapsible ${className}`}>
      <div className="collapsible__header" {...getToggleProps()}>
        {headerContent}
      </div>
      <div {...getCollapseProps()}>
        <div className="collapsible__content">{props.children}</div>
      </div>
    </div>
  );
}
