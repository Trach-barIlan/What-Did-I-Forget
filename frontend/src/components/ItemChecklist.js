import React, { useState } from 'react';

const ItemChecklist = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i) => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  return (
    <div className="item-checklist">
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={checkedItems.includes(item)}
            onChange={() => toggleItem(item)}
          />
          {item}
        </div>
      ))}
    </div>
  );
};

export default ItemChecklist;
