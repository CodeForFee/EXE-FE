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
    id: string; // UUID
    code?: string; // If applicable, or just ID managed
    percentage: number;
    startDate: string;
    endDate: string;
    description: string;
    isActive: boolean;
}

export interface CreateDiscountRequest {
    percentage: number;
    startDate: string;
    endDate: string;
    description: string;
    furnitureIds?: string[]; // Optional to apply immediately
}

export interface UpdateDiscountRequest {
    percentage?: number;
    startDate?: string;
    endDate?: string;
    description?: string;
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
