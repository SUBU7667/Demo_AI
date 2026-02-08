
export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Classic' | 'Sport' | 'Luxury' | 'Minimalist';
  description: string;
  image: string;
  specs: {
    movement: string;
    case: string;
    waterResistance: string;
    diameter: string;
  };
}

export interface CartItem extends Watch {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
