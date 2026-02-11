import { useState } from "react";

export default function CategoryPanel({ styles, categories, handleFilerCategories }) {
  const [selected, setSelected] = useState(-1);

  const handleClick = (id) => {
    setSelected(id);
    handleFilerCategories(id);
  };

  return (
    <ul className={styles.categories}>
      <li
        className={selected === -1 ? styles.active : undefined}
        onClick={() => handleClick(-1)}
      >
        Tất cả
      </li>

      {categories.map((dm) => (
        <li
          key={dm.id}
          className={selected === dm.id ? styles.active : undefined}
          onClick={() => handleClick(dm.id)}
        >
          {dm.ten_danh_muc}
        </li>
      ))}
    </ul>
  );
}
