import React, { useState, useMemo, useRef, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils/image';
import LiXiRain from '../../../components/LiXiRain';




export default memo ( function Header({ styles, products, filterBySearch, isLogin, user , handleLogout}) {
  const navigate = useNavigate();

  const [showLiXi, setShowLiXi] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const searchRef = useRef(null);
  const [showMenuAccount, setShowMenuAccount] = useState(false);
  const menuRef = useRef(null)
  

  /* ===== LỌC SẢN PHẨM ===== */
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return [];
    return products.filter(p =>
      p.ten_san_pham.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, products]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResult(false);
      }
      if(menuRef.current && !menuRef.current.contains(e.target)){
        setShowMenuAccount(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {showLiXi && <LiXiRain onClose={() => setShowLiXi(false)} />}

      <div className="d-flex justify-content-between align-items-center">
        {/* LOGO */}
        <div>
          <img
            src="/logo.jpg"
            alt="logo"
            onClick={() => setShowLiXi(true)}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid red"
            }}
          />
          &nbsp; SHOP XUÂN THẮNG
        </div>

        {/* SEARCH */}
        <form onSubmit={(e) => {e.preventDefault(), setShowSearchResult(false)}}

          ref={searchRef}
          className={`input-group ${styles.searchBox}`}
          style={{ maxWidth: "50%", position: "relative" }}
        >
          <input
            className="form-control"
            type="text"
            placeholder="Nhập tên sản phẩm ..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowSearchResult(true);
            }}
            onFocus={() => searchText && setShowSearchResult(true)}
          />

          <button type='submit' onClick={() => filterBySearch(filteredProducts)} className="input-group-text">
            <i className="bi bi-search"></i>
          </button>

          {/* SEARCH RESULT */}
          {showSearchResult && filteredProducts.length > 0 && (
            <div className={styles.searchResult}>
              {filteredProducts.map(p => (
                <div

                  key={p.id}
                  className={styles.searchItem}
                  onClick={() => {
                    navigate(`/product-detail/${p.slug}`);
                    setShowSearchResult(false);
                    setSearchText("");
                  }}
                >
                    <img src={getImageUrl(p?.hinhAnh[0]?.url_anh)} alt="" />
                  {p.ten_san_pham}
                </div>
              ))}
            </div>
          )}
        </form>

        {/* TOOLS */}
{
isLogin ? (        <div className="d-flex gap-2 position-relative">
          <button onClick={() => navigate("/cart")} className="btn">
            giỏ hàng <i className="bi bi-cart"></i>
          </button>
            <div>
              <button onClick={() => setShowMenuAccount(true)} className='btn'>
            <img style={{width: "50px", height: "50px"}} 
            className='img-fluid rounded-circle shadow ' src={getImageUrl(user?.avatar) ?? null} alt="" /></button>
            </div>

          {
            showMenuAccount && (
                 <div ref={menuRef} style={{zIndex: "2000"}} className='card position-absolute top-100 end-0'>
              <div className="card-body">
                {
                  user.role === "admin" && (<button onClick={() => navigate("/admin/dashboard")} className='btn'><i className="bi bi-kanban"></i> dashboard</button>)
                }
                <button onClick={handleLogout} className='btn'><i className="bi bi-box-arrow-left"></i> Đăng xuất</button>
                
              </div>
            </div>
            )
          }
          
        </div>)
        : (
          <div><button onClick={() => navigate("/auth")} className='btn'>Đăng nhập</button></div>
        )
}
      </div>
    </>
  );
}
)