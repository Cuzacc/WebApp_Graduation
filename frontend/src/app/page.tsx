"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GraduationLanding() {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [relationship, setRelationship] = useState("Bạn bè");
  const [attendees, setAttendees] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState("");

  const [msgName, setMsgName] = useState("");
  const [msgContent, setMsgContent] = useState("");
  const [msgStatus, setMsgStatus] = useState("");

  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [approvedMessages, setApprovedMessages] = useState([]);

  const t = {
    vi: {
      navTitle: "LỄ TỐT NGHIỆP", navRsvp: "Tham dự", navGuestbook: "Lưu bút",
      days: "Ngày", hours: "Giờ",
      rsvpTitle: "Xác nhận tham dự", rsvpSubtitle: "Sự hiện diện của bạn là niềm vinh hạnh của tớ!",
      formName: "Họ và tên của bạn", formNamePlaceholder: "Ví dụ: Hoàng Tuấn",
      formEmail: "Email", formEmailSub: " (Để hệ thống tự động gửi ảnh sau lễ)",
      formRel: "Mối quan hệ", optFamily: "Gia đình", optFriends: "Bạn bè", optOther: "Khác",
      formCount: "Số lượng người", btnRsvp: "GỬI XÁC NHẬN 🎉",
      guestbookTitle: "Sổ Lưu Bút", guestbookSubtitle: "Gửi một lời yêu thương cho chặn đường kế tiếp!",
      msgNamePlaceholder: "Tên của bạn...", msgContentPlaceholder: "Châm ngôn, lời chúc rực rỡ...", btnMsg: "GỬI LỜI CHÚC",
      emptyMsg: "Chưa có lời chúc nào được hiển thị. Trở thành người đầu tiên nhé!",
      footerDesc: "© 2026 Designed with ❤️ for The Graduation.", loginStr: "🔑 ĐĂNG NHẬP HỆ THỐNG",
      sendingStr: "Đang gửi...", errorSys: "Có lỗi xảy ra, vui lòng thử lại.",
      msgSuccess: "Đã gửi! Lời chúc đang chờ duyệt để hiển thị 💌",
      rsvpSuccess: "Tuyệt vời! Cảm ơn bạn đã xác nhận tham dự. Hẹn gặp bạn nhé! 🎉",
    },
    en: {
      navTitle: "GRADUATION 26'", navRsvp: "RSVP", navGuestbook: "Guestbook",
      days: "Days", hours: "Hours",
      rsvpTitle: "RSVP Confirmation", rsvpSubtitle: "Your presence is an absolute honor!",
      formName: "Full Name", formNamePlaceholder: "e.g., Emily Rose",
      formEmail: "Email", formEmailSub: " (For automatic thank you photos)",
      formRel: "Relationship", optFamily: "Family", optFriends: "Friends", optOther: "Other",
      formCount: "Attendees Count", btnRsvp: "SUBMIT RSVP 🎉",
      guestbookTitle: "Guestbook", guestbookSubtitle: "Send some love for the upcoming journey!",
      msgNamePlaceholder: "Your name...", msgContentPlaceholder: "A warm wish or quote...", btnMsg: "SEND WISH",
      emptyMsg: "No wishes have been displayed yet. Be the brave first!",
      footerDesc: "© 2026 Built with ❤️ for The Graduation Event.", loginStr: "🔑 SYSTEM COMMANDER",
      sendingStr: "Sending...", errorSys: "System error, please try again.",
      msgSuccess: "Sent! Your wish is pending approval 💌",
      rsvpSuccess: "Awesome! Thanks for RSVPing. See you there! 🎉",
    }
  }[lang];

  useEffect(() => {
    // Tự động load dữ liệu đã duyệt khi vừa vào trang
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${API_URL}/api/messages`)
      .then(res => res.json())
      .then(data => setApprovedMessages(data))
      .catch(err => console.error("Error fetching messages:", err));
  }, []);

  // Handler Gửi Form Lời Chúc
  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsgStatus(t.sendingStr);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${API_URL}/api/guestbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_name: msgName,
          content: msgContent
        })
      });
      if (res.ok) {
        setMsgStatus(t.msgSuccess);
        setMsgName("");
        setMsgContent("");
      } else {
        setMsgStatus(t.errorSys);
      }
    } catch (err) {
      setMsgStatus(t.errorSys);
    }
  };

  // Handler Gửi Form RSVP
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpStatus(t.sendingStr);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${API_URL}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: guestName,
          email: guestEmail || null,
          relationship_type: relationship,
          attendees_count: attendees
        })
      });
      if (res.ok) {
        setRsvpStatus(t.rsvpSuccess);
        setGuestName("");
        setGuestEmail("");
        setAttendees(1);
      } else {
        setRsvpStatus(t.errorSys);
      }
    } catch (err) {
      console.error(err);
      setRsvpStatus(t.errorSys);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text font-inter selection:bg-brand-accent selection:text-white">
      {/* KHỐI 1: STICKY NAV */}
      <nav className="sticky top-0 z-50 w-full glass-panel border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-lora text-xl md:text-2xl font-bold tracking-tight text-brand-primary">{t.navTitle}</div>
          <div className="flex gap-4 md:gap-6 items-center">
            <button onClick={() => scrollToSection('rsvp')} className="text-xs md:text-sm font-semibold hover:text-brand-accent transition-colors cursor-pointer outline-none">{t.navRsvp}</button>
            <button onClick={() => scrollToSection('guestbook')} className="text-xs md:text-sm font-semibold hover:text-brand-accent transition-colors cursor-pointer outline-none">{t.navGuestbook}</button>
            <select value={lang} onChange={(e) => setLang(e.target.value as "vi" | "en")} className="text-xs bg-brand-primary text-white px-2 py-1 rounded border-none outline-none font-semibold cursor-pointer">
              <option value="vi">VNI</option>
              <option value="en">ENG</option>
            </select>
          </div>
        </div>
      </nav>

      {/* KHỐI 2: HERO */}
      <section id="hero" className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 to-black z-0"></div>
        <div className="z-10 text-center px-4">
          <h1 className="font-lora text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg scale-105">
            Save The Date
          </h1>
          <p className="text-xl md:text-2xl text-brand-accent font-medium mb-12 tracking-widest">2026.06.30</p>
          
          <div className="flex justify-center gap-4 text-white">
            <div className="flex flex-col glass-panel !border-brand-accent/40 px-6 py-4 rounded-xl min-w-24 shadow-2xl backdrop-blur-md">
              <span className="text-4xl font-bold text-brand-accent">14</span>
              <span className="text-xs uppercase tracking-wider mt-1 text-gray-200">{t.days}</span>
            </div>
            <div className="flex flex-col glass-panel !border-brand-accent/40 px-6 py-4 rounded-xl min-w-24 shadow-2xl backdrop-blur-md">
              <span className="text-4xl font-bold text-brand-accent">08</span>
              <span className="text-xs uppercase tracking-wider mt-1 text-gray-200">{t.hours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* KHỐI 3: FORM NHẬP RSVP THEO DB SCHEMA */}
      <section id="rsvp" className="py-24 px-4 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="max-w-2xl mx-auto bg-brand-surface rounded-3xl shadow-2xl p-8 md:p-12 transform -translate-y-32 relative z-20 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-brand-primary">{t.rsvpTitle}</h2>
            <p className="text-gray-500 mt-3 font-medium">{t.rsvpSubtitle}</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleRsvpSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">{t.formName}</label>
              <input type="text" value={guestName} onChange={e=>setGuestName(e.target.value)} placeholder={t.formNamePlaceholder} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all bg-gray-50 focus:bg-white" required/>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">{t.formEmail} <span className="text-brand-primary font-normal italic">{t.formEmailSub}</span></label>
              <input type="email" value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} placeholder="hello@gmail.com" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all bg-gray-50 focus:bg-white" required/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">{t.formRel}</label>
                <select value={relationship} onChange={e=>setRelationship(e.target.value)} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50 focus:bg-white cursor-pointer">
                  <option value={t.optFamily}>{t.optFamily}</option>
                  <option value={t.optFriends}>{t.optFriends}</option>
                  <option value={t.optOther}>{t.optOther}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">{t.formCount}</label>
                <input type="number" min="1" max="5" value={attendees} onChange={e=>setAttendees(Number(e.target.value))} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-accent bg-gray-50 focus:bg-white" />
              </div>
            </div>
            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-[#600000] focus:ring-4 focus:ring-red-200 transition-all shadow-lg shadow-brand-primary/40 mt-8 text-lg">
              {t.btnRsvp}
            </button>
            {rsvpStatus && <p className="text-center font-bold text-brand-primary mt-4 py-2 bg-red-50 rounded-lg">{rsvpStatus}</p>}
          </form>
        </div>
      </section>

      {/* KHỐI 4: GUESTBOOK DISPLAY & SUBMIT */}
      <section id="guestbook" className="py-20 bg-brand-bg px-4 relative -mt-32 z-10">
        <div className="max-w-5xl mx-auto mt-16 pt-10 border-t border-gray-200">
          <div className="text-center mb-16">
            <h2 className="font-lora text-4xl font-bold text-brand-primary">{t.guestbookTitle}</h2>
            <p className="text-gray-500 mt-3 text-lg">{t.guestbookSubtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Form Gửi Lời Chúc */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl h-fit">
              <form className="space-y-5" onSubmit={handleGuestbookSubmit}>
                <input type="text" value={msgName} onChange={e=>setMsgName(e.target.value)} placeholder={t.msgNamePlaceholder} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none bg-gray-50 focus:bg-white transition-all font-medium" required/>
                <textarea value={msgContent} onChange={e=>setMsgContent(e.target.value)} rows={5} placeholder={t.msgContentPlaceholder} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none resize-none bg-gray-50 focus:bg-white transition-all" required></textarea>
                <button type="submit" className="px-6 py-4 bg-brand-accent text-white font-bold text-lg rounded-xl hover:bg-yellow-600 transition-colors w-full shadow-lg shadow-yellow-500/20 active:scale-[0.98]">
                  {t.btnMsg}
                </button>
                {msgStatus && <p className="text-center font-bold text-brand-accent mt-2">{msgStatus}</p>}
              </form>
            </div>
            
            {/* Data Thực tế tải từ API (APPROVED) */}
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {approvedMessages.map((msg: any) => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
                  <div className="absolute -left-px top-6 w-1.5 h-10 bg-brand-accent rounded-r-md"></div>
                  <h4 className="font-bold text-gray-800 text-lg">{msg.sender_name}</h4>
                  <p className="text-gray-600 mt-2 italic font-serif leading-relaxed">"{msg.content}"</p>
                  <span className="text-xs text-gray-400 mt-4 block uppercase tracking-wider font-semibold">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
              {approvedMessages.length === 0 && (
                <div className="text-center text-gray-500 font-medium py-10 opacity-70">{t.emptyMsg}</div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* CUỐI TRANG */}
      <footer className="bg-brand-text text-gray-400 py-12 text-center border-t-4 border-brand-primary">
        <p className="text-sm">{t.footerDesc}</p>
        <Link href="/admin/login" className="text-xs mt-6 inline-block bg-white/5 px-4 py-2 rounded-full hover:bg-white/20 hover:text-white transition-all tracking-widest font-semibold border border-white/10">
          {t.loginStr}
        </Link>
      </footer>
    </main>
  );
}
