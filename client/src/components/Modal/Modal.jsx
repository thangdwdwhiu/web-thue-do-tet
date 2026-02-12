import React from "react";
import styles from "./Modal.module.css";

export default function Modal({
  open,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Xác nhận",
  cancelText = "Hủy"
}) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h4>{title}</h4>

        <div className={styles.content}>
          {children}
        </div>

        <div className={styles.actions}>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="btn btn-primary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
