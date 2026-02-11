import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/image";

export default function ProductList({ styles, products }) {
  const navigate = useNavigate();

  // ===== FORMAT GIÁ (4.000.000đ) =====
  const formatPriceVN = (price) => {
    if (price === null || price === undefined) return "0đ";
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // ===== FORMAT SỐ LƯỢT BÁN (2k, 1.5k) =====
  const formatSoldCount = (count) => {
    if (count < 1000) return count;
    const k = count / 1000;
    return Number.isInteger(k) ? `${k}k` : `${k.toFixed(1)}k`;
  };

  if (!products || products.length === 0) {
    return (
      <span style={{ textAlign: "center", width: "100%" }}>
        Không có sản phẩm nào ...
      </span>
    );
  }

  return (
    <div className={styles.productList}>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-4 w-100">
        {products.map((i, index) => (
          <div className="col" key={index}>
            <div className={styles.card}>
              <div className={styles.imageWrap}>
                <img
  src={
    i.hinhAnh?.[0]?.url_anh
      ? getImageUrl(i.hinhAnh[0].url_anh)
      : getImageUrl("/images/no-image.jpg")
  }
  alt={i.ten_san_pham}
/>

              </div>

              <div className={styles.cardBody}>
                <h6 className={styles.title}>{i.ten_san_pham}</h6>
                <p className={styles.desc}>{i.mo_ta}</p>

                <p className={styles.price}>
                  {formatPriceVN(i.gia_hien_tai)}{" "}
                  <small>
                    Đã bán: {formatSoldCount(i.so_luot_mua)}
                  </small>
                </p>

                <button
                  onClick={() => navigate(`product-detail/${i.slug}`)}
                  className={styles.button}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
