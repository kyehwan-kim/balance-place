import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import KakaoLogin from "./pages/KakaoLogin";
import Home from "./pages/Home";

export default function Router({ isLogin, setIsLogin }) {
  return (
    <Routes>
      <Route path="/" element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="kakaologin" element={<KakaoLogin isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="/register" element={<Register isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="/blog" element={<Blog isLogin={isLogin} setIsLogin={setIsLogin} />} />
    </Routes>
  );
}
