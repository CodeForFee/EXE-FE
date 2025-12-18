export interface Product {
    id: string;
    title: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    images: string[];
    rating: number;
    reviews: number;
    badge?: string;
    description: string;
    shortDescription: string;
    category: string;
    tags: string[];
    specifications: {
        key: string;
        value: string;
    }[];
    features: string[];
}

export interface Combo {
    id: string;
    name: string;
    description: string;
    items: {
        Icon: any; // Using any for icons to avoid complex type issues in data file
        name: string;
    }[];
    originalPrice: number;
    comboPrice: number;
    image: string;
    tag: string;
}

export const products: Product[] = [
    {
        id: "1",
        title: "Ghế xoay công sở Ergonomic Modern",
        price: 1250000,
        originalPrice: 1500000,
        discount: 16,
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1688578734203-d050529b5586?q=80&w=800&auto=format&fit=crop"
        ],
        rating: 4.8,
        reviews: 124,
        badge: "Bán chạy",
        category: "chair",
        tags: ["furniture", "office", "study", "ergonomic"],
        shortDescription: "Ghế xoay công thái học cao cấp, hỗ trợ cột sống, phù hợp cho sinh viên học tập cường độ cao.",
        description: "Ghế xoay Ergonomic Modern là sự kết hợp hoàn hảo giữa thiết kế hiện đại và tính năng công thái học. Với lưới thoáng khí cao cấp, tựa lưng điều chỉnh và bánh xe di chuyển mượt mà.",
        specifications: [
            { key: "Chất liệu", value: "Lưới cao cấp, Khung thép" },
            { key: "Kích thước", value: "60 x 60 x 110-120 cm" }
        ],
        features: ["Tựa lưng cong", "Điều chỉnh độ cao", "Lưới thoáng khí"]
    },
    {
        id: "2",
        title: "Bàn làm việc gỗ thông tối giản",
        price: 850000,
        originalPrice: 950000,
        discount: 10,
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop"],
        rating: 4.5,
        reviews: 89,
        badge: "Mới",
        category: "desk",
        tags: ["furniture", "wood", "study", "minimalist"],
        shortDescription: "Bàn làm việc từ gỗ thông tự nhiên, thiết kế tối giản, dễ dàng lắp ráp.",
        description: "Sản phẩm được chế tác từ gỗ thông nhập khẩu, đã qua xử lý chống mối mọt và cong vênh.",
        specifications: [{ key: "Chất liệu", value: "Gỗ thông tự nhiên" }],
        features: ["Gỗ bền bỉ", "Dễ tháo rời"]
    },
    {
        id: "3",
        title: "Đèn bàn học chống cận thị Pro",
        price: 350000,
        originalPrice: 450000,
        discount: 22,
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop"],
        rating: 4.9,
        reviews: 312,
        category: "lighting",
        tags: ["decor", "study", "led"],
        shortDescription: "Đèn LED bảo vệ mắt với 3 chế độ ánh sáng.",
        description: "Đèn học Pro là phụ kiện không thể thiếu cho bàn học sinh viên với công nghệ LED không nhấp nháy.",
        specifications: [{ key: "Công suất", value: "10W" }],
        features: ["Bảo vệ mắt", "Tiết kiệm điện"]
    },
    {
        id: "4",
        title: "Giường Pallet gỗ thông 1m2",
        price: 650000,
        originalPrice: 750000,
        discount: 13,
        image: "https://images.unsplash.com/photo-1505693419173-42b9258a6347?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1505693419173-42b9258a6347?q=80&w=800&auto=format&fit=crop"],
        rating: 4.7,
        reviews: 56,
        category: "furniture",
        tags: ["bed", "wood", "pallet"],
        shortDescription: "Giường gỗ Pallet phong cách tối giản.",
        description: "Giải pháp tiết kiệm không gian và chi phí tuyệt vời cho sinh viên.",
        specifications: [{ key: "Kích thước", value: "120 x 190 cm" }],
        features: ["Lắp đặt nhanh", "Chịu lực tốt"]
    },
    {
        id: "5",
        title: "Kệ sách xương cá 5 tầng",
        price: 450000,
        originalPrice: 550000,
        discount: 18,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop"],
        rating: 4.6,
        reviews: 72,
        category: "storage",
        tags: ["bookshelf", "storage"],
        shortDescription: "Kệ sách thiết kế xương cá độc đáo.",
        description: "Kệ sách giúp bạn sắp xếp tài liệu gọn gàng và là điểm nhấn decor cho căn phòng.",
        specifications: [{ key: "Số tầng", value: "5 tầng" }],
        features: ["Thiết kế hiện đại", "Dễ vệ sinh"]
    },
    {
        id: "6",
        title: "Thảm trải sàn nỉ nhung decor",
        price: 280000,
        originalPrice: 380000,
        discount: 26,
        image: "https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=800&auto=format&fit=crop"],
        rating: 4.8,
        reviews: 156,
        category: "decoration",
        tags: ["rug", "decor"],
        shortDescription: "Thảm nỉ nhung mềm mại, họa tiết tối giản.",
        description: "Bề mặt mềm mịn, không rụng lông, dễ dàng giặt máy.",
        specifications: [{ key: "Chất liệu", value: "Nỉ nhung" }],
        features: ["Chống trượt", "Mềm mịn"]
    },
    {
        id: "7",
        title: "Gương tròn khung gỗ Nordic",
        price: 320000,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop"],
        rating: 4.7,
        reviews: 43,
        category: "decoration",
        tags: ["mirror", "decor"],
        shortDescription: "Gương treo tường khung gỗ phong cách Bắc Âu.",
        description: "Thiết kế thanh lịch giúp tạo cảm giác không gian rộng rãi hơn.",
        specifications: [{ key: "Đường kính", value: "50 cm" }],
        features: ["Khung gỗ chống ẩm", "Dễ lắp đặt"]
    },
    {
        id: "8",
        title: "Kệ treo quần áo gỗ chữ A",
        price: 480000,
        originalPrice: 580000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1596462502278-27bfaf410911?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1596462502278-27bfaf410911?q=80&w=800&auto=format&fit=crop"],
        rating: 4.6,
        reviews: 92,
        category: "storage",
        tags: ["storage", "clothes"],
        shortDescription: "Sào treo đồ gỗ thông thiết kế chữ A.",
        description: "Chắc chắn và thẩm mỹ, phù hợp cho phòng trọ sinh viên.",
        specifications: [{ key: "Chất liệu", value: "Gỗ thông" }],
        features: ["Chịu lực tốt", "Dễ tháo lắp"]
    },
    {
        id: "9",
        title: "Chậu cây Monstera decor",
        price: 150000,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop"],
        rating: 4.9,
        reviews: 65,
        category: "decoration",
        tags: ["plant", "decor"],
        shortDescription: "Cây Monstera mang lại không gian xanh mát.",
        description: "Cây xanh giúp lọc không khí và giảm căng thẳng sau giờ học.",
        specifications: [{ key: "Loại cây", value: "Monstera" }],
        features: ["Dễ chăm sóc", "Lọc không khí"]
    },
    {
        id: "10",
        title: "Gối tựa lưng sofa họa tiết",
        price: 950000,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop"],
        rating: 4.5,
        reviews: 28,
        category: "decoration",
        tags: ["pillow", "decor"],
        shortDescription: "Gối tựa mềm mại với họa tiết hiện đại.",
        description: "Chất liệu vải canvas bền màu, ruột bông gòn êm ái.",
        specifications: [{ key: "Kích thước", value: "45 x 45 cm" }],
        features: ["Vỏ gối có khóa kéo", "Dễ giặt giũ"]
    },
    {
        id: "11",
        title: "Bàn trà tròn chân gỗ",
        price: 520000,
        image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop"],
        rating: 4.7,
        reviews: 37,
        category: "desk",
        tags: ["table", "decor"],
        shortDescription: "Bàn trà nhỏ gọn, mặt bàn chống thấm.",
        description: "Thiết kế tròn tinh tế giúp tránh va chạm, an toàn cho không gian hẹp.",
        specifications: [{ key: "Chất liệu", value: "Gỗ MDF, Gỗ Sồi" }],
        features: ["Chống thấm nước", "Di chuyển linh hoạt"]
    },
    {
        id: "12",
        title: "Hộp lưu trữ vải Canvas",
        price: 85000,
        image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=800&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=800&auto=format&fit=crop"],
        rating: 4.8,
        reviews: 112,
        category: "storage",
        tags: ["box", "storage"],
        shortDescription: "Hộp vải lưu trữ đồ đạc đa năng.",
        description: "Giải pháp lưu trữ quần áo, sách vở hoặc đồ cá nhân cực kỳ tiện lợi.",
        specifications: [{ key: "Chất liệu", value: "Vải Canvas cao cấp" }],
        features: ["Có thể gấp gọn", "Tay cầm chắc chắn"]
    }
];

// Helper to get product by ID
export const getProductById = (id: string) => products.find(p => p.id === id);

// Combos Data
export const combos: Combo[] = [
    {
        id: "1",
        name: "Combo Phòng Trọ Cơ Bản",
        description: "Đầy đủ nội thất thiết yếu cho căn phòng trọ nhỏ gọn",
        items: [
            { Icon: null, name: "Bàn làm việc" },
            { Icon: null, name: "Ghế ergonomic" },
            { Icon: null, name: "Đèn bàn LED" },
            { Icon: null, name: "Kệ sách 3 tầng" },
        ],
        originalPrice: 3200000,
        comboPrice: 2499000,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        tag: "Bán chạy",
    },
    {
        id: "2",
        name: "Combo Học Tập Pro",
        description: "Thiết kế tối ưu cho việc học và làm việc hiệu quả",
        items: [
            { Icon: null, name: "Bàn nâng hạ" },
            { Icon: null, name: "Ghế gaming" },
            { Icon: null, name: "Đèn kẹp" },
            { Icon: null, name: "Tủ hồ sơ" },
        ],
        originalPrice: 5500000,
        comboPrice: 4299000,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
        tag: "Premium",
    },
    {
        id: "3",
        name: "Combo Decor Nghệ Thuật",
        description: "Biến không gian sống thành tác phẩm nghệ thuật",
        items: [
            { Icon: null, name: "Tranh treo tường" },
            { Icon: null, name: "Đèn ngủ" },
            { Icon: null, name: "Thảm phòng" },
            { Icon: null, name: "Gương trang trí" },
        ],
        originalPrice: 1800000,
        comboPrice: 1299000,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        tag: "Mới",
    },
];