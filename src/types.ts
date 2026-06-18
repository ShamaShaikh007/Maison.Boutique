export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  badge?: string;
  colors?: { name: string; hex: string; bgClass: string }[];
  sizes?: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique cart item ID (combines product ID + selected size + selected color)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: string;
  maxPrice: number;
}
