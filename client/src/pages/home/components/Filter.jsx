export default function Filter({ styles, handleFilerPrice }) {
  return (
    <div className={styles.filter}>
      <strong>Bộ lọc :</strong>
      <span>Giá :</span>

      <label>
        từ 0 - 200k&nbsp;
        <input
          type="radio"
          name="priceFil"
          onChange={() => handleFilerPrice(0)}
        />
      </label>

      <label>
        200 - 700k&nbsp;
        <input
          type="radio"
          name="priceFil"
          onChange={() => handleFilerPrice(1)}
        />
      </label>

      <label>
        từ 1 triệu&nbsp;
        <input
          type="radio"
          name="priceFil"
          onChange={() => handleFilerPrice(2)}
        />
      </label>

      <label>
        Tăng dần&nbsp;
        <input
          type="radio"
          name="priceFil"
          onChange={() => handleFilerPrice(3)}
        />
      </label>
      <label>
        Giảm dần&nbsp;
        <input
          type="radio"
          name="priceFil"
          onChange={() => handleFilerPrice(4)}
        />
      </label>
    </div>
  );
}
