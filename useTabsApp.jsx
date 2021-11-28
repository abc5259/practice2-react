import React, { useState } from "react";

const content = [
  {
    tab: "section1",
    content: "I'm the content of the section 1",
  },
  {
    tab: "section2",
    content: "I'm the content of the section 2",
  },
];

const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) return;
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

const UseTabsApp = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div>
      {content.map((section, i) => (
        <button key={i} onClick={() => changeItem(i)}>
          {section.tab}
        </button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};

export default UseTabsApp;
