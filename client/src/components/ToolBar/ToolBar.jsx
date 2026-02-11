import styles from "../index.module.css";
import {Link} from "react-router-dom";
export default function ToolBar() {



    return (

        <>
        
        <div className={`${styles.toolbar}`} title="toolbar" >
                <button className="btn" onClick={() => window.history.back()}><i className="bi bi-caret-left-fill"> quay lại</i></button>
                <div className={styles.logo}>
                <img src="/logo.jpg" alt="" />
                Shop Xuân Thắng
                </div>
        </div>
        
        </>
    )
}