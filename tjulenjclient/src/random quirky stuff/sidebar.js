import React, { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <p>This is the sidebar content.</p>
      </div>
    </>
  );
}

export default Sidebar;