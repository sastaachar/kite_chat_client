import React from "react";

const contextMenu = (props) => {
  const { xpos, ypos, visible } = props;
  //return the context menu if the menu is visible
  return visible ? (
    <div
      className="contextMenu"
      style={{ left: `${xpos}px`, top: `${ypos}px` }}
    >
      <span>contexxt</span>
    </div>
  ) : null;
};

export default contextMenu;
