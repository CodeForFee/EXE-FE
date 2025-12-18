"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChatBubbleLeftRightIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon, HomeModernIcon } from "@heroicons/react/24/solid";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    time: string;
}

const quickReplies = [
    { text: "Tư vấn sản phẩm", emoji: "🛋️", color: "from-emerald-500 to-teal-600" },
    { text: "Hỏi về giá", emoji: "💰", color: "from-amber-500 to-orange-600" },
    { text: "Chính sách đổi trả", emoji: "🔄", color: "from-sky-500 to-blue-600" },
    { text: "Liên hệ hỗ trợ", emoji: "📞", color: "from-rose-500 to-pink-600" },
];

const botResponses: Record<string, string> = {
    "Tư vấn sản phẩm": "Chào bạn! 🛋️ UniHome có đầy đủ nội thất từ bàn ghế, giường, đèn đến phụ kiện trang trí. Bạn đang tìm kiếm sản phẩm nào? Mình sẽ tư vấn chi tiết cho bạn!",
    "Hỏi về giá": "Giá sản phẩm tại UniHome dao động từ 200K - 5 triệu đồng, phù hợp túi tiền sinh viên! 💰 Bạn quan tâm đến mức giá nào để mình gợi ý sản phẩm phù hợp?",
    "Chính sách đổi trả": "UniHome cam kết đổi trả miễn phí trong 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất. 🔄 Bảo hành 12 tháng cho tất cả sản phẩm. Bạn yên tâm mua sắm nhé!",
    "Liên hệ hỗ trợ": "Bạn có thể liên hệ UniHome qua:\n📞 Hotline: 1900-xxxx\n📧 Email: support@unihome.vn\n💬 Zalo: UniHome Official\nĐội ngũ hỗ trợ hoạt động từ 8h - 22h hàng ngày!",
};

// Stagger animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Xin chào! 👋 Mình là UniBot - trợ lý ảo của UniHome. Mình có thể giúp gì cho bạn hôm nay?",
            isBot: true,
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                chatWindowRef.current &&
                !chatWindowRef.current.contains(event.target as Node) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSend = (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: messageText,
            isBot: false,
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const botResponse: Message = {
                id: Date.now() + 1,
                text: botResponses[messageText] || "Cảm ơn bạn đã liên hệ! 🙏 Mình đã ghi nhận yêu cầu của bạn. Nhân viên tư vấn sẽ phản hồi trong thời gian sớm nhất nhé!",
                isBot: true,
                time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, botResponse]);
        }, 1200);
    };

    const handleQuickReply = (reply: string) => {
        handleSend(reply);
    };

    return (
        <>
            {/* Floating Chat Button - Organic Shape with Breathing Animation */}
            <motion.button
                ref={toggleButtonRef}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                    scale: 1,
                    rotate: 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 group"
            >
                {/* Breathing glow effect */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[28px] blur-xl"
                />

                {/* Button Container */}
                <div className={`relative w-16 h-16 rounded-[28px] flex items-center justify-center transition-all duration-500 overflow-hidden ${isOpen
                    ? "bg-gradient-to-br from-slate-700 to-slate-900"
                    : "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600"
                    }`}
                    style={{
                        boxShadow: isOpen
                            ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                            : "0 8px 32px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                    }}
                >
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                        }}
                    />

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.25, ease: "backOut" }}
                            >
                                <XMarkIcon className="w-7 h-7 text-white drop-shadow-sm" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.25, ease: "backOut" }}
                            >
                                <ChatBubbleLeftRightIcon className="w-7 h-7 text-white drop-shadow-sm" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>

            {/* Notification Badge - Enhanced */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="fixed bottom-[5.25rem] right-4 z-50"
                    >
                        <span className="flex h-6 w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white text-[11px] font-bold items-center justify-center shadow-lg shadow-rose-500/30">
                                1
                            </span>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window - Premium Glass Design */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatWindowRef}
                        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden"
                        style={{
                            height: "600px",
                            maxHeight: "calc(100vh - 140px)",
                            borderRadius: "24px",
                            background: "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))",
                            boxShadow: `
                                0 25px 80px -15px rgba(0, 0, 0, 0.25),
                                0 0 0 1px rgba(0,0,0,0.04),
                                inset 0 1px 0 rgba(255,255,255,1)
                            `,
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        {/* Header - Organic Gradient with Depth */}
                        <div className="relative overflow-hidden" style={{ padding: "28px 24px 24px" }}>
                            {/* Animated gradient background */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                                style={{
                                    background: "linear-gradient(135deg, #059669 0%, #0d9488 25%, #14b8a6 50%, #0d9488 75%, #059669 100%)",
                                    backgroundSize: "200% 200%",
                                }}
                            />

                            {/* Organic shapes */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-sm" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/4" />
                            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full" />

                            <div className="relative flex items-center gap-4">
                                {/* Avatar with animated ring */}
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-1 rounded-2xl"
                                        style={{
                                            background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)",
                                        }}
                                    />
                                    <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                                        <HomeModernIcon className="w-7 h-7 text-white" />
                                    </div>
                                    {/* Online indicator */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-300 to-emerald-400 rounded-full border-2 border-white shadow-md"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        UniBot
                                    </h3>
                                    <p className="text-emerald-100/90 text-sm font-medium flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                        Trợ lý nội thất của bạn
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area - Clean with Subtle Texture */}
                        <div
                            className="flex-1 overflow-y-auto p-5 space-y-5"
                            style={{
                                background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
                            }}
                        >
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: index === messages.length - 1 ? 0.1 : 0,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                    className={`flex gap-3 ${message.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    {message.isBot && (
                                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200/50">
                                            <SparklesIcon className="w-5 h-5 text-emerald-600" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[78%] p-4 ${message.isBot
                                            ? "bg-white rounded-2xl rounded-tl-md shadow-sm border border-slate-100"
                                            : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl rounded-tr-md shadow-lg shadow-emerald-500/20"
                                            }`}
                                        style={{
                                            ...(message.isBot && {
                                                boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
                                            }),
                                        }}
                                    >
                                        <p className={`text-sm leading-relaxed whitespace-pre-line ${message.isBot ? "text-slate-700" : "text-white"}`}>
                                            {message.text}
                                        </p>
                                        <p className={`text-[10px] mt-2 font-medium ${message.isBot ? "text-slate-400" : "text-emerald-100"}`}>
                                            {message.time}
                                        </p>
                                    </div>
                                    {!message.isBot && (
                                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                            <UserCircleIcon className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Enhanced Typing Indicator */}
                            <AnimatePresence>
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex gap-3 justify-start"
                                    >
                                        <div className="w-9 h-9 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-200/50">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <SparklesIcon className="w-5 h-5 text-emerald-600" />
                                            </motion.div>
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-slate-100">
                                            <div className="flex gap-1.5">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.span
                                                        key={i}
                                                        animate={{
                                                            y: [0, -6, 0],
                                                            opacity: [0.4, 1, 0.4],
                                                        }}
                                                        transition={{
                                                            duration: 0.8,
                                                            repeat: Infinity,
                                                            delay: i * 0.15,
                                                        }}
                                                        className="w-2 h-2 bg-emerald-500 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies - Staggered Animation with Rich Colors */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="px-5 py-4 bg-gradient-to-b from-slate-50/80 to-white border-t border-slate-100"
                        >
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
                                Chọn nhanh
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {quickReplies.map((reply, index) => (
                                    <motion.button
                                        key={reply.text}
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.03,
                                            y: -2,
                                            transition: { duration: 0.2 },
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleQuickReply(reply.text)}
                                        className="group relative px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm overflow-hidden transition-all hover:border-emerald-300 hover:shadow-md"
                                    >
                                        {/* Hover gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${reply.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                        <span className="relative z-10 text-base">{reply.emoji}</span>
                                        <span className="relative z-10 group-hover:text-emerald-700 transition-colors">{reply.text}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Input Area - Premium Feel */}
                        <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Nhập tin nhắn của bạn..."
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 text-sm rounded-2xl focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-slate-400"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                            >
                                <PaperAirplaneIcon className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
