import { useState } from "react"
import CardReview from "./CardReview";
import { getImageUrl } from "../../../utils/image";


export default function ProductInfo({ styles, infor }) {

    const imgs = infor.imgs || infor.hinhAnh || [];
    const reviewers = infor.reviewers || infor.danhGia || [];
    const [imgMain, setImgMain] = useState(imgs.length ? imgs[0].url_anh || imgs[0].url || imgs[0] : "");
    const [showFullImg, setShowFull] = useState(false);


    const handleCloseOverlay = (e) => {
        if (e.target === e.currentTarget) {
            setShowFull(false);
        }
    }

    return (<>
    {
        showFullImg &&
        (<div onClick={handleCloseOverlay} className="overlay">
                <img
                style={{
                    objectFit: "contain",
                    width: "80%",
                    height: "80%",
                    borderRadius: "10px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }} src={getImageUrl(imgMain)} alt="" />
                <button className="btn" style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px"
                }} 
                onClick={() => setShowFull(false)}
                ><i className="bi bi-x-lg text-danger"></i></button>
        </div>)
        

    }

        <div className={styles.left}>

            <div className={styles.imgGroup}>
                <div className={styles.mainImg}>
                    <img onClick={ () => setShowFull(true)} src={getImageUrl(imgMain)} alt="" />

                </div>
                <div className={styles.imgExtra}>

                    {
                        imgs.map((i) => {
                            const url = i.url_anh || i.url || i;
                            const key = i.id || url;
                            return (
                                <img key={key} className={imgMain == url && styles.imgSelected} onClick={() => setImgMain(url)} src={getImageUrl(url)} alt="" />
                            )
                        })
                    }
                </div>
            </div>

            <strong>ĐÁNH GIÁ SẢN PHẨM</strong>
            {
                reviewers.map((r) => 
                (<CardReview reviewer={r} /> ))
            }
        </div>
   </> )
}