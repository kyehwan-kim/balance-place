import React, { useState, useEffect } from 'react';
import InputComment from './InputComment';
import { Link, useNavigate } from 'react-router-dom';

export default function MainComment({ area, isLogin, setIsLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem('token') ||
      localStorage.getItem('kakaoAccessToken')
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate('/login');
    }
  }, [isLogin]);

  return <>{isLogin ? <InputComment area={area} /> : <Link to="/login" />}</>;
}
