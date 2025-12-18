"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    MagnifyingGlassIcon,
    PaperAirplaneIcon,
    PhotoIcon,
    FaceSmileIcon,
    EllipsisVerticalIcon,
    PhoneIcon,
    VideoCameraIcon,
    InformationCircleIcon,
    CheckIcon,
    CheckCircleIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const conversations = [
    {
        id: "1",
        name: "Shop Nội Thất Minh Anh",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        lastMessage: "Dạ em có thể ghé xem hàng vào chiều nay được không ạ?",
        time: "10:30",
        unread: 2,
        online: true,
        isShop: true,
        rating: 4.8,
        verified: true,
    },
    {
        id: "2",
        name: "Hoàng Long",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        lastMessage: "Ok anh, em sẽ ship trong hôm nay nhé!",
        time: "Hôm qua",
        unread: 0,
        online: false,
        isShop: false,
        verified: false,
    },
    {
        id: "3",
        name: "Decor House Official",
        avatar: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
        lastMessage: "Sản phẩm vẫn còn hàng ạ, anh/chị đặt luôn nhé",
        time: "Hôm qua",
        unread: 0,
        online: true,
        isShop: true,
        rating: 4.9,
        verified: true,
    },
    {
        id: "4",
        name: "Thu Hương",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        lastMessage: "Cảm ơn bạn đã mua hàng!",
        time: "20/12",
        unread: 0,
        online: false,
        isShop: false,
        verified: false,
    },
];

const mockMessages = [
    { id: 1, senderId: "shop", text: "Chào bạn, rất vui được hỗ trợ bạn! 👋", time: "09:00", status: "seen" },
    { id: 2, senderId: "me", text: "Mình muốn hỏi về ghế xoay công sở ạ. Còn hàng không shop?", time: "09:15", status: "seen" },
    { id: 3, senderId: "shop", text: "Dạ vâng ạ, hiện shop còn 5 cái màu đen và 3 cái màu xám ạ.", time: "09:20", status: "seen" },
    { id: 4, senderId: "me", text: "Mình lấy màu đen nhé. Ship về quận Gò Vấp được không ạ?", time: "09:25", status: "seen" },
    { id: 5, senderId: "shop", text: "Dạ được ạ! Ship nội thành HCM phí 30k, đơn trên 500k miễn phí 😊", time: "09:30", status: "seen" },
    { id: 6, senderId: "me", text: "Tốt quá! Mình đặt 1 cái ghế nhé.", time: "10:00", status: "seen" },
    { id: 7, senderId: "shop", text: "Dạ nếu bạn đặt hôm nay thì 2-3 ngày là nhận được ạ.", time: "10:30", status: "delivered" },
];

interface Message {
    id: number;
    senderId: string;
    text: string;
    time: string;
    status: string;
}

export default function MessagesPage() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputMessage, setInputMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Scroll đến cuối tin nhắn - đơn giản như ChatBot
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    // Tự động scroll xuống khi có tin nhắn mới
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        const newMessage: Message = {
            id: Date.now(),
            senderId: "me",
            text: inputMessage,
            time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
            status: "sent",
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputMessage("");

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const reply: Message = {
                id: Date.now() + 1,
                senderId: "shop",
                text: "Dạ em đã nhận được tin nhắn. Em sẽ phản hồi sớm ạ! 🙏",
                time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                status: "delivered",
            };
            setMessages((prev) => [...prev, reply]);
        }, 2000);
    };

    const filteredConversations = conversations.filter((conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-main">
            <Header />

            {/* Main content: pt-[120px] = top bar (40px) + nav (80px) */}
            <main className="pt-[120px] h-screen overflow-hidden">
                <div className="container mx-auto px-4 h-[calc(100vh-120px)] flex flex-col pb-4">
                    <nav className="flex items-center gap-3 text-sm font-heading text-muted mb-3 flex-shrink-0">
                        <Link href="/" className="hover:text-green-700 transition-colors">Trang chủ</Link>
                        <span className="text-divider">/</span>
                        <span className="text-heading font-semibold">Tin nhắn</span>
                    </nav>

                    {/* Chat Container */}
                    <div className="bg-white border border-divider rounded-2xl shadow-xl overflow-hidden flex-1 min-h-0">
                        <div className="grid grid-cols-12 h-full overflow-hidden">

                            {/* Left: Conversations */}
                            <div className="hidden md:flex col-span-4 lg:col-span-3 border-r border-divider flex-col bg-secondary/30 h-full">
                                <div className="p-4 border-b border-divider bg-white flex-shrink-0">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-lg font-heading font-bold text-heading">Tin nhắn</h2>
                                        <button className="w-8 h-8 rounded-lg bg-green-700 text-white flex items-center justify-center">
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 bg-secondary border border-divider text-sm rounded-lg focus:outline-none focus:border-green-600"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    {filteredConversations.map((conv) => (
                                        <button
                                            key={conv.id}
                                            onClick={() => setSelectedConversation(conv)}
                                            className={`w-full p-4 flex gap-3 text-left border-b border-divider/50 transition-colors ${selectedConversation.id === conv.id ? "bg-white border-l-4 border-l-green-600" : "hover:bg-white/50 border-l-4 border-l-transparent"}`}
                                        >
                                            <div className="relative flex-shrink-0">
                                                <img src={conv.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-divider shadow-sm" />
                                                {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <span className="font-bold text-sm truncate">{conv.name}</span>
                                                    <span className="text-[10px] text-muted whitespace-nowrap">{conv.time}</span>
                                                </div>
                                                <p className="text-xs text-muted truncate mt-1">{conv.lastMessage}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Chat Window */}
                            <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col h-full bg-white relative overflow-hidden">

                                {/* Chat Header */}
                                <div className="p-4 border-b border-divider flex items-center justify-between flex-shrink-0 bg-white z-10">
                                    <div className="flex items-center gap-3">
                                        <img src={selectedConversation.avatar} className="w-10 h-10 rounded-full object-cover border border-green-100" />
                                        <div>
                                            <h3 className="font-bold text-sm flex items-center gap-1">
                                                {selectedConversation.name}
                                                {selectedConversation.verified && <CheckBadgeIcon className="w-4 h-4 text-green-600" />}
                                            </h3>
                                            <span className="text-[11px] text-green-600">Đang hoạt động</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="p-2 hover:bg-secondary rounded-full"><PhoneIcon className="w-5 h-5 text-muted" /></button>
                                        <button className="p-2 hover:bg-secondary rounded-full"><VideoCameraIcon className="w-5 h-5 text-muted" /></button>
                                        <button className="p-2 hover:bg-secondary rounded-full"><InformationCircleIcon className="w-5 h-5 text-muted" /></button>
                                    </div>
                                </div>

                                {/* Messages List - scroll chỉ trong container này */}
                                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa] custom-scrollbar min-h-0">
                                    <div className="text-center my-4">
                                        <span className="px-3 py-1 bg-white border border-divider text-[10px] text-muted rounded-full shadow-sm">Hôm nay</span>
                                    </div>

                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[75%] flex gap-2 ${msg.senderId === "me" ? "flex-row-reverse" : ""}`}>
                                                {msg.senderId !== "me" && <img src={selectedConversation.avatar} className="w-8 h-8 rounded-full self-end" />}
                                                <div>
                                                    <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.senderId === "me" ? "bg-green-700 text-white rounded-br-none" : "bg-white text-body border border-divider rounded-bl-none"}`}>
                                                        {msg.text}
                                                    </div>
                                                    <div className={`text-[10px] text-muted mt-1 flex items-center gap-1 ${msg.senderId === "me" ? "justify-end" : ""}`}>
                                                        {msg.time}
                                                        {msg.senderId === "me" && (msg.status === "seen" ? <CheckCircleIcon className="w-3 h-3 text-green-600" /> : <CheckIcon className="w-3 h-3" />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex gap-2">
                                            <img src={selectedConversation.avatar} className="w-8 h-8 rounded-full self-end" />
                                            <div className="px-4 py-3 bg-white border border-divider rounded-2xl rounded-bl-none">
                                                <div className="flex gap-1">
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Chat Input */}
                                <div className="p-4 border-t border-divider bg-white flex-shrink-0">
                                    <div className="flex items-center gap-2 max-w-full">
                                        <button className="p-2 text-muted hover:text-green-700"><PhotoIcon className="w-6 h-6" /></button>
                                        <button className="p-2 text-muted hover:text-green-700"><FaceSmileIcon className="w-6 h-6" /></button>
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                            placeholder="Nhập tin nhắn..."
                                            className="flex-1 bg-secondary border border-divider px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-green-600"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-green-700 text-white p-2.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50"
                                            disabled={!inputMessage.trim()}
                                        >
                                            <PaperAirplaneIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}