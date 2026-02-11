// src/components/Auth/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import styles from './Auth.module.css';

const AuthPage = () => {
  // State quản lý việc đang hiển thị Login hay Register
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        
        {/* Render có điều kiện */}
        {isLoginView ? <LoginForm /> : <RegisterForm />}

        {/* Nút Switch chuyển đổi */}
        <div className={styles.toggleText}>
          {isLoginView ? (
            <>
              Chưa có tài khoản? 
              <button className={styles.toggleBtn} onClick={toggleView}>
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản? 
              <button className={styles.toggleBtn} onClick={toggleView}>
                Đăng nhập
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPage;