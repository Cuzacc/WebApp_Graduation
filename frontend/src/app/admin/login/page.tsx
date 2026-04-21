"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminToken", data.access_token);
        router.push("/admin/dashboard");
      } else {
        const errorData = await res.json();
        setErrorMsg(errorData.detail || "Đăng nhập thất bại");
      }
    } catch (err) {
      setErrorMsg("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center font-inter px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-brand-accent/20 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-10 relative z-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gray-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-5 border border-gray-100 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 font-lora">Trạm Chỉ Huy</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Bảo mật cấp độ siêu việt</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tài khoản</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="admin" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all bg-gray-50 focus:bg-white" required/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Chìa khóa</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all bg-gray-50 focus:bg-white" required/>
          </div>
          
          {errorMsg && <p className="text-red-500 text-sm font-semibold text-center bg-red-50 py-2 rounded-lg">{errorMsg}</p>}

          <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-brand-text text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg active:scale-[0.98] disabled:opacity-50">
             {isLoading ? "Đang dò..." : "Kích Hoạt"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors inline-flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay đầu là bờ (Về trang chủ)
          </Link>
        </div>
      </div>
    </div>
  );
}
