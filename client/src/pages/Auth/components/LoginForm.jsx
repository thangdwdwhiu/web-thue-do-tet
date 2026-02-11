// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import InputGroup from '../../../components/InputGroup';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    ten_tai_khoan: '',
    mat_khau: ''
  });
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   try { 
    e.preventDefault();
    console.log("Login Payload:", formData);
    
      await dispatch(login(formData)).unwrap();
      navigate("/");
    }
    catch(err) {
      toast.error(err.error);
     
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in">
      <h3 className="text-center mb-4 text-primary">Đăng Nhập</h3>
      
      {/* Khớp với column: ten_tai_khoan */}
      <InputGroup 
        label="Tên tài khoản" 
        name="ten_tai_khoan" 
        value={formData.ten_tai_khoan} 
        onChange={handleChange} 
        placeholder="Nhập username..."
        required
      />

      {/* Khớp với column: mat_khau */}
      <InputGroup 
        label="Mật khẩu" 
        type="password" 
        name="mat_khau" 
        value={formData.mat_khau} 
        onChange={handleChange} 
        placeholder="Nhập mật khẩu..."
        required
      />

      <button type="submit" className="btn btn-primary w-100 py-2 mt-3 fw-bold shadow-sm">
        Đăng nhập
      </button>
      
      <div className="text-center mt-3">
        <a href="#" className="text-decoration-none small text-muted">Quên mật khẩu?</a>
      </div>
    </form>
  );
};

export default LoginForm;