export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  dateAdded: string;
  expiration?: string;
  type: string;     // '', 'vegan', 'gluten-free', 'nut-free', 'vegetarian'
  source: string;     // 'Sysco', 'Daylight Foods', 'Aggie Fresh', 'Donations' 
  isAvailable: boolean;
  section: 'pantry' | 'freedge';
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  products: string[];
  productTypes: string[];
  status: 'arrived' | 'pending';
  lastDelivery?: string;
  nextDelivery?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  shift: string;
  position: string;
  startDate: string;
  active: boolean;
}

export interface FilterOptions {
  type: string[];
  source: string[];
  searchTerm: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface BarData {
  name: string;
  value: number;
}

export interface LineData {
  date: string;
  distributed: number;
  received: number;
}