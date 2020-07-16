import React, { useEffect, useCallback } from "react";

import "./contextMenu.css";

const ContextMenu = (props) => {
  const { pos, visible, setVisible, menuItems } = props;

  const hideMenu = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useEffect(() => {
    if (visible) {
      // add listeners when visible
      document.addEventListener("click", hideMenu);
      document.addEventListener("contextmenu", hideMenu);
    } else {
      // remove listeners when not visible
      document.removeEventListener("click", hideMenu);
      document.removeEventListener("contextmenu", hideMenu);
    }
  });

  //return the context menu if the menu is visible
  return visible ? (
    <div
      className="contextMenu"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    >
      {menuItems.map((item, index) => (
        <span
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            item.callBack();
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  ) : null;
};

export default ContextMenu;
