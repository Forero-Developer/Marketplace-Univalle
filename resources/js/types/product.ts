export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    faculty: string;
    images: string[];
    user_id: number;
    user: {
      id: number;
      name: string;
    };
  }
  