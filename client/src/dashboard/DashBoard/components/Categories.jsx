import React, {  memo, useState } from "react";

import styles from "../DashBoard.module.css";
import Loading from "../../../components/Loading";
import Modal from "../../../components/Modal/Modal";


export default memo( function Categories({cats, loading, onUpdateCategoryName, onCreateCategory, onDeleteCategory}) {


  const [editingId, setEditingId] = useState(null);
  const [values, setValues] = useState({});
  const [modalCreate, setModalCreate] = useState(false);
    const [newName, setNewName] = useState("");



  if (loading)
    return <Loading title={"đang tải danh mục"} />;



  return (<>
  <Modal open={modalCreate} title={"Nhập tên danh mục"}
   onCancel={() => setModalCreate(false)}
   onConfirm={() => {onCreateCategory(newName), setModalCreate(false)}}
     >
        <label htmlFor="">
            <input value={newName} onChange={(e) => setNewName(e.target.value)}
             className="form-control" type="text" name="" id="" /></label>
     </Modal>
    <div className={styles.card}>
      <div className="d-flex"><h3>Danh mục</h3>
      <button onClick={() => setModalCreate(true)} className="btn"><i className="bi bi-patch-plus text-success"></i> Thêm mới</button>
      </div>
      <ul className="d-flex flex-column gap-3">
{cats.map(c => {
  const currentValue = values[c.id] ?? c.ten_danh_muc;
  const isChanged = currentValue !== c.ten_danh_muc;

  return (
    <li key={c.id} style={{ listStyle: "none" }}>
      <div className="d-flex gap-2">
        <input
          className="form-control"
          type="text"
          disabled={editingId !== c.id}
          value={currentValue}
          onChange={(e) =>
            setValues(prev => ({
              ...prev,
              [c.id]: e.target.value
            }))
          }
        />

        {editingId === c.id && isChanged ? (
          <button onClick={() => onUpdateCategoryName(c.id, currentValue)}
           className="btn btn-success">
            ok
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditingId(c.id)}
          >
            Sửa
          </button>
        )}

        <button onClick={() =>onDeleteCategory(c.id)} className="btn btn-danger">
          xóa
        </button>
      </div>
    </li>
  );
})}


      </ul>
    </div>
 </> );
}
)