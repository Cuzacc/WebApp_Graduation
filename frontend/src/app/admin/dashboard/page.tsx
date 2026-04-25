"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [pendingData, setPendingData] = useState({ pending_guests: [], pending_messages: [] });
  const [approvedData, setApprovedData] = useState({ approved_guests: [], approved_messages: [] });
  const [trashData, setTrashData] = useState({ trash_guests: [], trash_messages: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'LIVES' | 'TRASH'>('PENDING');
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const fetchData = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    try {
      const [resPending, resApproved, resTrash] = await Promise.all([
        fetch(`${API_URL}/api/admin/pending`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/approved`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${API_URL}/api/admin/trash`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      if (resPending.status === 401 || resApproved.status === 401 || resTrash.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
        return;
      }
      setPendingData(await resPending.json());
      setApprovedData(await resApproved.json());
      setTrashData(await resTrash.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const approveGuest = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!confirm("Xác nhận duyệt người này và TỰ ĐỘNG gửi email cảm ơn?")) return;
    try {
      await fetch(`${API_URL}/api/admin/approve/guest/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const approveMessage = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`${API_URL}/api/admin/approve/message/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const rejectGuest = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!confirm("Ném RSVP này vào thùng rác?")) return;
    try {
      await fetch(`${API_URL}/api/admin/reject/guest/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const rejectMessage = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!confirm("Ném lá thư này vào thùng rác?")) return;
    try {
      await fetch(`${API_URL}/api/admin/reject/message/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const restoreGuest = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`${API_URL}/api/admin/restore/guest/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const restoreMessage = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`${API_URL}/api/admin/restore/message/${id}`, { method: "PUT", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteGuestHard = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!confirm("Xóa VĨNH VIỄN RSVP này? Dữ liệu không thể khôi phục.")) return;
    try {
      await fetch(`${API_URL}/api/admin/guest/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const deleteMessageHard = async (id: number) => {
    const token = localStorage.getItem("adminToken");
    if (!confirm("Xóa VĨNH VIỄN bức thư này? Dữ liệu không thể khôi phục.")) return;
    try {
      await fetch(`${API_URL}/api/admin/message/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (loading) return <div className="min-h-screen bg-admin-bg text-white flex items-center justify-center">Đang tải Terminal...</div>;

  return (
    <div className="min-h-screen admin-body font-inter selection:bg-brand-accent selection:text-white pb-20">
      <header className="admin-glass-panel sticky top-0 z-50 border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(128,0,0,0.5)] border border-red-900">
            A
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-white leading-tight">Terminal.</h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest">DEVOPS CONTROL DOCK</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-gray-800">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#10b981] animate-pulse"></div>
            <span className="text-xs text-gray-300 font-mono">Metrics: HEALTHY</span>
          </div>
          <button onClick={handleLogout} className="text-sm font-semibold text-brand-accent hover:text-white transition-colors border border-brand-accent/40 hover:border-brand-accent px-4 py-2 rounded-lg bg-brand-accent/10 hover:bg-brand-accent/20 cursor-pointer">
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
        
        <div className="xl:col-span-2 space-y-8">
          
          <div className="flex gap-4 border-b border-gray-800 pb-2">
            <button onClick={() => setActiveTab('PENDING')} className={`font-bold px-6 py-2 rounded-t-lg transition-colors border-b-2 ${activeTab === 'PENDING' ? 'text-brand-accent border-brand-accent' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>HÀNG ĐỢI (PENDING)</button>
            <button onClick={() => setActiveTab('LIVES')} className={`font-bold px-6 py-2 rounded-t-lg transition-colors border-b-2 ${activeTab === 'LIVES' ? 'text-green-500 border-green-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>ĐÃ DUYỆT (LIVES)</button>
            <button onClick={() => setActiveTab('TRASH')} className={`font-bold px-6 py-2 rounded-t-lg transition-colors border-b-2 ${activeTab === 'TRASH' ? 'text-red-500 border-red-500' : 'text-gray-500 border-transparent hover:text-gray-300'}`}>THÙNG RÁC (TRASH)</button>
          </div>

          {activeTab === 'PENDING' && (
          <>
          <div className="admin-glass-panel rounded-2xl p-6 border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-transparent"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
               <span className="p-2 bg-gray-800 rounded-lg text-brand-accent">🎫</span> Hàng đợi RSVP <span className="text-sm font-normal py-1 px-2 bg-gray-800 text-gray-400 rounded-full">{pendingData.pending_guests.length} PENDING</span>
            </h2>
            
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-black/20">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 bg-black/40">
                    <th className="py-4 px-5 font-medium tracking-wider">THÔNG TIN KHÁCH</th>
                    <th className="py-4 px-5 font-medium tracking-wider">LIÊN HỆ / PHÂN LOẠI</th>
                    <th className="py-4 px-5 font-medium tracking-wider text-center">TRẠNG THÁI</th>
                    <th className="py-4 px-5 font-medium tracking-wider text-right">MISSION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {pendingData.pending_guests.map((guest: any) => (
                    <tr key={guest.id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-5 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs">{guest.name.substring(0,2).toUpperCase()}</div>
                        {guest.name}
                      </td>
                      <td className="py-4 px-5 text-gray-400">
                        {guest.email || "Không có Email"} <br/>
                        <span className="text-[10px] bg-brand-primary/20 text-brand-primary border border-brand-primary/30 px-2 rounded-sm mt-1 inline-block uppercase font-bold tracking-wider">{guest.relationship_type} ({guest.attendees_count})</span>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded text-xs font-bold shadow-[0_0_10px_rgba(234,179,8,0.1)]">{guest.status}</span>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2">
                        <button onClick={() => approveGuest(guest.id)} className="bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/30 px-4 py-2 rounded-lg transition-all text-xs font-bold shadow-sm cursor-pointer" title="Và Tự động kích hoạt Gửi Mail Cảm ơn (Background Worker)">
                          ✅ Duyệt Data
                        </button>
                        <button onClick={() => rejectGuest(guest.id)} className="bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500/30 px-4 py-2 rounded-lg transition-all text-xs font-bold cursor-pointer">
                          🗑 Đốt
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pendingData.pending_guests.length === 0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-gray-500">Trống rỗng. Radar không thấy ai.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-glass-panel rounded-2xl p-6 border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-transparent"></div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
               <span className="p-2 bg-gray-800 rounded-lg text-brand-accent">✉️</span> Kiểm Duyệt Thư <span className="text-sm font-normal py-1 px-2 bg-gray-800 text-gray-400 rounded-full">{pendingData.pending_messages.length} PENDING</span>
            </h2>
            
            <div className="space-y-4">
              {pendingData.pending_messages.map((msg: any) => (
                <div key={msg.id} className="bg-black/30 border border-gray-800 p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 group hover:border-gray-600 transition-colors">
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg">{msg.sender_name} <span className="font-normal text-xs text-gray-500 ml-2">#{msg.id}</span></h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-serif italic border-l-2 border-brand-accent/50 pl-3">"{msg.content}"</p>
                    <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">🕒 {new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-3 md:shrink-0">
                    <button onClick={() => approveMessage(msg.id)} className="text-green-500 cursor-pointer hover:text-white bg-green-500/10 hover:bg-green-500 px-4 py-2 rounded-lg transition-colors font-bold text-sm border border-green-500/30 box-border text-center">
                      Bấm Hiện Web
                    </button>
                    <button onClick={() => rejectMessage(msg.id)} className="text-orange-500 hover:text-white bg-orange-500/10 hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors font-bold text-sm border border-orange-500/30 box-border w-10 text-center cursor-pointer">
                      🗑
                    </button>
                  </div>
                </div>
              ))}
              {pendingData.pending_messages.length === 0 && (
                <div className="text-center text-gray-500 py-4">Không có thư rác / chờ duyệt mới.</div>
              )}
            </div>
          </div>
          </>
          )}

          {activeTab === 'LIVES' && (
          <>
          <div className="admin-glass-panel rounded-2xl p-6 border border-green-900/50 shadow-2xl relative overflow-hidden bg-green-950/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-500">
               <span>🌍</span> RSVP Đang Public <span className="text-sm font-normal py-1 px-2 bg-green-900/40 text-green-300 rounded-full">{approvedData.approved_guests.length} LIVES</span>
            </h2>
            <div className="space-y-2">
              {approvedData.approved_guests.map((guest: any) => (
                <div key={guest.id} className="bg-black/50 border border-green-900/30 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <strong className="text-gray-300">{guest.name}</strong> <span className="text-xs text-gray-500 ml-2">({guest.email})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => rejectGuest(guest.id)} className="text-xs uppercase bg-orange-900/40 text-orange-400 border border-orange-900 px-3 py-1 rounded hover:bg-orange-800 hover:text-white transition shadow-[0_0_10px_rgba(255,165,0,0.1)]">Thu hồi về Thùng Rác</button>
                  </div>
                </div>
              ))}
              {approvedData.approved_guests.length === 0 && <div className="text-center text-gray-600 py-4 text-sm font-mono tracking-widest">CHƯA CÓ LIVES NÀO CHẠY</div>}
            </div>
          </div>

          <div className="admin-glass-panel rounded-2xl p-6 border border-green-900/50 shadow-2xl relative overflow-hidden bg-green-950/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-green-500">
               <span>✉️</span> Thư Đang Public <span className="text-sm font-normal py-1 px-2 bg-green-900/40 text-green-300 rounded-full">{approvedData.approved_messages.length} LIVES</span>
            </h2>
            <div className="space-y-4">
              {approvedData.approved_messages.map((msg: any) => (
                <div key={msg.id} className="bg-black/50 border border-green-900/30 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-300">{msg.sender_name}</h4>
                    <p className="text-gray-500 text-sm mt-1">"{msg.content}"</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button onClick={() => rejectMessage(msg.id)} className="text-xs uppercase bg-orange-900/40 text-orange-400 border border-orange-900 px-3 py-1.5 rounded hover:bg-orange-800 hover:text-white transition w-full text-center shadow-[0_0_10px_rgba(255,165,0,0.1)]">Thu hồi</button>
                  </div>
                </div>
              ))}
              {approvedData.approved_messages.length === 0 && <div className="text-center text-gray-600 py-4 text-sm font-mono tracking-widest">CHƯA CÓ LIVES NÀO CHẠY</div>}
            </div>
          </div>
          </>
          )}

          {activeTab === 'TRASH' && (
          <>
          <div className="admin-glass-panel rounded-2xl p-6 border border-red-900/50 shadow-2xl relative overflow-hidden bg-red-950/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-500">
               <span>🗑️</span> RSVP Đã Xóa <span className="text-sm font-normal py-1 px-2 bg-red-900/40 text-red-300 rounded-full">{trashData.trash_guests.length} TROLLS</span>
            </h2>
            <div className="space-y-2">
              {trashData.trash_guests.map((guest: any) => (
                <div key={guest.id} className="bg-black/50 border border-red-900/30 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <strong className="text-gray-300">{guest.name}</strong> <span className="text-xs text-gray-500 ml-2">({guest.email})</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => restoreGuest(guest.id)} className="text-xs uppercase bg-gray-800 text-gray-400 px-3 py-1 rounded hover:bg-gray-700 transition">Khôi phục</button>
                    <button onClick={() => deleteGuestHard(guest.id)} className="text-xs uppercase bg-red-900 text-white px-3 py-1 rounded hover:bg-red-700 transition font-bold shadow-[0_0_10px_rgba(255,0,0,0.3)]">Xóa vĩnh viễn</button>
                  </div>
                </div>
              ))}
              {trashData.trash_guests.length === 0 && <div className="text-center text-gray-600 py-4 text-sm font-mono tracking-widest">THÙNG RÁC TRỐNG</div>}
            </div>
          </div>

          <div className="admin-glass-panel rounded-2xl p-6 border border-red-900/50 shadow-2xl relative overflow-hidden bg-red-950/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-red-500">
               <span>🗑️</span> Thư Đã Xóa <span className="text-sm font-normal py-1 px-2 bg-red-900/40 text-red-300 rounded-full">{trashData.trash_messages.length} TROLLS</span>
            </h2>
            <div className="space-y-4">
              {trashData.trash_messages.map((msg: any) => (
                <div key={msg.id} className="bg-black/50 border border-red-900/30 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-300">{msg.sender_name}</h4>
                    <p className="text-gray-500 text-sm mt-1">"{msg.content}"</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button onClick={() => restoreMessage(msg.id)} className="text-xs uppercase bg-gray-800 text-gray-400 px-3 py-1.5 rounded hover:bg-gray-700 transition w-full text-center">🔁 Khôi phục</button>
                    <button onClick={() => deleteMessageHard(msg.id)} className="text-xs uppercase bg-red-900 text-white px-3 py-1.5 rounded hover:bg-red-700 transition font-bold text-center">🚨 Xóa tận gốc</button>
                  </div>
                </div>
              ))}
              {trashData.trash_messages.length === 0 && <div className="text-center text-gray-600 py-4 text-sm font-mono tracking-widest">THÙNG RÁC TRỐNG</div>}
            </div>
          </div>
          </>
          )}

        </div>

        <div className="space-y-8">
          
          <div className="admin-glass-panel p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px]"></div>
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 font-mono flex items-center gap-2">
                📡 Server Metrics
             </h3>
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2 font-mono">
                    <span className="text-gray-300">FastAPI Pipeline</span>
                    <span className="text-green-400 font-bold">READY (0.2s)</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                    <div className="bg-brand-accent h-full w-[100%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2 font-mono">
                    <span className="text-gray-300">Database Connection</span>
                    <span className="text-green-400 font-bold">CONNECTED</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                    <div className="bg-blue-500 h-full w-[100%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2 font-mono">
                    <span className="text-gray-300">Background Worker</span>
                    <span className="text-yellow-500 font-bold">💤 IDLE</span>
                  </div>
                  <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
                    <div className="bg-yellow-500/50 h-full w-[0%]"></div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">Sẽ hoạt động khi Bấm Duyệt Khách VIP có Email.</p>
                </div>
             </div>
          </div>

          <div className="admin-glass-panel p-8 rounded-2xl border border-brand-primary/30 text-center shadow-[0_0_30px_rgba(128,0,0,0.1)] hover:border-brand-primary transition-colors cursor-default">
             <div className="text-6xl mb-4 drop-shadow-md">🚀</div>
             <p className="text-sm text-gray-300 font-medium mb-1">Mọi thứ đã kết nối hoàn hảo.</p>
             <p className="text-xs text-gray-500 mb-6">Tên lửa DevOps Launch Pad</p>
             <Link href="/" target="_blank" className="bg-white text-black text-sm font-bold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors inline-flex items-center gap-2 w-full justify-center">
                Mở Mặt Tiền ↗
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
