// Removed Node.js crypto import to ensure compatibility with client-side code


export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

// Auth Models
export interface UserResponse {
    id: string;
    fullName: string;
    email: string;
    status: 'ACTIVE' | 'BANNED' | 'UNVERIFIED';
    role: 'ADMIN' | 'STAFF' | 'USER';
    address: string;
    phone: string;
    image: string;
}

export interface AuthenticationResponse {
    token: string;
    userId: string;
    roles: string[];
    fullName: string;
    image: string;
}

export interface RegistrationRequest {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface IntrospectRequest {
    token: string;
}

export interface VerifyTokenResponse {
    valid: boolean;
    message: string;
}

export interface IntrospectTokenResponse {
    valid: boolean;
}

export interface ChangePasswordRequest {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export interface UserCreateRequest {
    fullName: string;
    email: string;
    password: string;
    role: string;
    address: string;
    phone: string;
}

export interface UserRequest {
    fullName?: string;
    address?: string;
    phone?: string;
    image?: string;
}


// Furniture Models
export interface FurnitureResponse {
    furnitureId: string; // UUID - Backend uses furnitureId, not id
    name: string;
    description?: string;
    price: number;
    finalPrice: number;
    stock: number;
    image?: string; // May come from images array or separate field
    categoryId: string; // UUID
    categoryName: string;
    status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';
    hasDiscount?: boolean;
    discountPercentage?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateFurnitureRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string; // UUID
    images: string[]; // Usually handled via separate upload or list of URLs
    status: 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';
}

export interface UpdateFurnitureRequest {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string; // UUID
    images?: string[];
    status?: 'AVAILABLE' | 'OUT_OF_STOCK' | 'DISCONTINUED';
}


// Category Models
export interface CategoryResponse {
    categoryId: string; // UUID
    name: string;
    description?: string; // Optional if missing from current DTO
    image?: string;       // Optional if missing from current DTO
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateCategoryRequest {
    name: string;
    description: string;
    image: string;
}

export interface UpdateCategoryRequest {
    name?: string;
    description?: string;
    image?: string;
}


// Discount Models
export interface DiscountResponse {
    discountId: string; // Backend returns 'discountId', not 'id'
    name: string; // Backend returns 'name'
    description: string | null; // Backend can return null
    value: number; // Backend returns 'value' (percentage as decimal)
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    appliedFurnitureCount: number;
}

export interface CreateDiscountRequest {
    name: string; // Backend expects 'name' not 'description'
    value: number; // Backend expects 'value' not 'percentage'
    startDate: string;
    endDate: string;
    furnitureIds?: string[]; // Optional to apply immediately
}

export interface UpdateDiscountRequest {
    name?: string;
    value?: number;
    startDate?: string;
    endDate?: string;
}

export interface ApplyDiscountRequest {
    furnitureIds: string[];
}


// Notification Models
export interface Notification {
    id: string;
    title: string;
    message: string;
    userId: string;
    isRead: boolean;
    createdAt: string;
    type?: string;
}

export interface NotificationRequest {
    title: string;
    message: string;
    userId: string;
    type?: string;
}

// Cart Models
export interface CartItemResponse {
    itemId: string;
    furnitureId: string;
    furnitureName: string;
    furnitureImage: string;
    price: number;
    quantity: number;
    subTotal: number;
}

export interface CartResponse {
    cartId: string;
    items: CartItemResponse[];
    totalAmount: number;
}

export interface CartItemRequest {
    furnitureId: string;
    quantity: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

// Order Models
export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED'
}

export interface OrderItemResponse {
    orderItemId: string;
    furnitureId: string;
    furnitureName: string;
    furnitureImage: string;
    price: number;
    quantity: number;
    subTotal: number;
}

export interface OrderResponse {
    orderId: string;
    userId: string;
    items: OrderItemResponse[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: string;
    shippingPhone: string;
    note?: string; // Add note field if needed/supported later
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderRequest {
    shippingAddress: string;
    shippingPhone: string;
    note?: string;
    items?: { furnitureId: string; quantity: number }[]; // Optional if buying from cart directly
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
}


// Review Models
export interface FurnitureReviewResponse {
    reviewId: string;
    userId: string;
    userName: string;
    userImage?: string;
    furnitureId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface SubmitReviewRequest {
    rating: number;
    comment: string;
}

// Post Models
export type PostStatus = 'ACTIVE' | 'SOLD' | 'INACTIVE' | 'DELETED' | 'ARCHIVED';

export interface PostDetailResponse {
    id: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostResponse {
    id: string;
    title: string;
    price: number;
    status: PostStatus | string;
    categoryId: string;
    categoryName: string;
    userId: string;
    userName: string;
    userImage?: string;
    postDetail: PostDetailResponse[];
    createdAt: string;
    updatedAt: string;
    boost: boolean;
}

export interface CreatePostDetailRequest {
    description: string;
    image: string;
}

export interface CreatePostRequest {
    title: string;
    price: number;
    categoryId: string; // UUID
    status: PostStatus;
    image: string;
    description: string;
}

export interface UpdatePostRequest {
    title?: string;
    price?: number;
    categoryId?: string; // UUID
    status?: PostStatus;
}

// Comment Models
export interface CommentResponse {
    id: string;
    content: string;
    userId: string;
    userName: string;
    userImage: string;
    postId: string;
    replyId?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCommentRequest {
    content: string;
    replyId?: string;
}

export interface UpdateCommentRequest {
    content: string;
}

// Chat Models
export interface ChatRoom {
    id: string;
    userAId: string; // Current user or initiator
    userBId: string; // Other user
    userAName?: string;
    userBName?: string;
    userAImage?: string;
    userBImage?: string;
    lastMessage?: string;
    lastMessageTime?: string;
    type: 'PRIVATE' | 'BOT'; // Assuming types
    createdAt: string;
    updatedAt: string;
}

export interface ChatRoomResponse { // For the create room response
    id: string;
    userAId: string;
    userBId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChatMessage {
    id: string;
    roomId: string;
    senderId: string;
    content: string;
    isRead: boolean;
    createdAt: string;
}

export interface ChatMessageResponse {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    isRead: boolean;
}


// Distance Models
export interface DistanceResponse {
    distance: number; // in meters or km
    duration: number; // in seconds
    unit: string;
}

// Boost Usage Models
export type BoostStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export interface BoostUsageResponse {
    id: string;
    postId: string;
    userId: string;
    userBoostId: string; // The specific boost package ID used
    startDate: string;
    endDate: string;
    status: BoostStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateBoostUsageRequest {
    postId: string;
    userBoostId: string;
    startDate?: string;
}

export interface UpdateBoostUsageRequest {
    status?: BoostStatus;
    endDate?: string;
}

