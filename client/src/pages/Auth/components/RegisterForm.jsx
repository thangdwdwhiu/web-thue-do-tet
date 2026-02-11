// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import InputGroup from '../../../components/InputGroup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { register } from '../../../features/authSlice';

const RegisterForm = () => {
  // State khởi tạo dựa trên Table NguoiDung
  const [formData, setFormData] = useState({
    ten_tai_khoan: '',
    mat_khau: '',
    ho_ten: '',
    so_dien_thoai: '',
    
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register Payload:", formData);
    try{
        await dispatch(register(formData)).unwrap();
        toast.success("Đăng kí tài khoản thành công")
    }
    catch (err){
      console.log(err);
      toast.error(err.error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in">
      <h3 className="text-center mb-4 text-success">Đăng Ký</h3>

      {/* Khớp với column: ho_ten */}
      <InputGroup 
        label="Họ và tên" 
        name="ho_ten" 
        value={formData.ho_ten} 
        onChange={handleChange} 
        placeholder="VD: Nguyễn Văn A"
        required
      />

       {/* Khớp với column: so_dien_thoai */}
       <InputGroup 
        label="Số điện thoại" 
        type="tel"
        name="so_dien_thoai" 
        value={formData.so_dien_thoai} 
        onChange={handleChange} 
        placeholder="09xx..."
        required
      />

      {/* Khớp với column: ten_tai_khoan */}
      <InputGroup 
        label="Tên tài khoản" 
        name="ten_tai_khoan" 
        value={formData.ten_tai_khoan} 
        onChange={handleChange} 
        placeholder="Username..."
        required
      />

      {/* Khớp với column: mat_khau */}
      <InputGroup 
        label="Mật khẩu" 
        type="password" 
        name="mat_khau" 
        value={formData.mat_khau} 
        onChange={handleChange} 
        placeholder="Mật khẩu..."
        required
      />

      <button type="submit" className="btn btn-success w-100 py-2 mt-3 fw-bold shadow-sm">
        Đăng ký tài khoản
      </button>
    </form>
  );
};

export default RegisterForm;