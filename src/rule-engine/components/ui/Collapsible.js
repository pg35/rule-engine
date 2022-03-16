import React from "react";
import useCollapse from "react-collapsed";

export default function Collapsible(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || true,
    collapsedHeight: props.collapsedHeight || 0
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <div className="title">{props.title}</div>
        <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
