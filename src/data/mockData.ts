import { Product, Supplier, Volunteer } from '../types';

export const productData: Product[] = [
  {
    id: '1',
    name: 'Broccoli',
    description: 'Fresh testadam broccoli',
    imageUrl: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg',
    quantity: 15,
    dateAdded: '2023-04-15',
    expiration: '2023-04-22',
    type: 'nut-free',
    source: 'Aggie Fresh',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '2',
    name: 'Canned Black Beans',
    description: 'Non-perishable black beans',
    imageUrl: 'https://images.pexels.com/photos/5848704/pexels-photo-5848704.jpeg',
    quantity: 50,
    dateAdded: '2023-04-10',
    type: 'vegetarian',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '3',
    name: 'Milk',
    description: 'Gallon of whole milk',
    imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    quantity: 8,
    dateAdded: '2023-04-16',
    expiration: '2023-04-23',
    type: '',
    source: 'Sysco',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '4',
    name: 'Strawberries',
    description: 'Fresh strawberries',
    imageUrl: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg',
    quantity: 10,
    dateAdded: '2023-04-14',
    expiration: '2023-04-20',
    type: 'gluten-free',
    source: 'Aggie Fresh',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '5',
    name: 'Bagels',
    description: 'Plain bagels',
    imageUrl: 'https://images.pexels.com/photos/5419317/pexels-photo-5419317.jpeg',
    quantity: 12,
    dateAdded: '2023-04-15',
    expiration: '2023-04-19',
    type: 'gluten-free',
    source: 'Local Bakery',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '6',
    name: 'Carrots',
    description: 'Fresh testadam carrots',
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
    quantity: 20,
    dateAdded: '2023-04-15',
    expiration: '2023-04-25',
    type: 'gluten-free',
    source: 'Aggie Fresh',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '7',
    name: 'Cream of Chicken',
    description: 'Canned cream of chicken soup',
    imageUrl: 'https://images.pexels.com/photos/5718026/pexels-photo-5718026.jpeg',
    quantity: 25,
    dateAdded: '2023-04-10',
    type: '',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '8',
    name: 'Canned Tomatoes',
    description: 'Diced tomatoes in can',
    imageUrl: 'https://images.pexels.com/photos/5946639/pexels-photo-5946639.jpeg',
    quantity: 30,
    dateAdded: '2023-04-08',
    type: 'vegetarian',
    source: 'Sysco',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '9',
    name: 'Blueberry Muffins',
    description: 'Fresh blueberry muffins',
    imageUrl: 'https://images.pexels.com/photos/4248527/pexels-photo-4248527.jpeg',
    quantity: 8,
    dateAdded: '2023-04-16',
    expiration: '2023-04-18',
    type: 'vegan',
    source: 'Local Bakery',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '10',
    name: 'Canned Green Beans',
    description: 'Canned green beans',
    imageUrl: 'https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg',
    quantity: 28,
    dateAdded: '2023-04-09',
    type: 'vegan',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '11',
    name: 'Potatoes',
    description: 'Russet potatoes',
    imageUrl: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
    quantity: 25,
    dateAdded: '2023-04-12',
    expiration: '2023-04-26',
    type: 'vegan',
    source: 'Daylight Foods',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '12',
    name: 'Red Onions',
    description: 'Fresh red onions',
    imageUrl: 'https://images.pexels.com/photos/4197557/pexels-photo-4197557.jpeg',
    quantity: 15,
    dateAdded: '2023-04-13',
    expiration: '2023-04-27',
    type: 'vegan',
    source: 'Daylight Foods',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '13',
    name: 'Toothbrush',
    description: 'Medium-soft toothbrush',
    imageUrl: 'https://images.pexels.com/photos/1333304/pexels-photo-1333304.jpeg',
    quantity: 20,
    dateAdded: '2023-04-01',
    type: '',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '14',
    name: 'Feminine Hygiene Products',
    description: 'Assorted feminine hygiene products',
    imageUrl: 'https://images.pexels.com/photos/5775004/pexels-photo-5775004.jpeg',
    quantity: 30,
    dateAdded: '2023-04-02',
    type: '',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '15',
    name: 'Toothpaste',
    description: 'Fluoride toothpaste',
    imageUrl: 'https://images.pexels.com/photos/298611/pexels-photo-298611.jpeg',
    quantity: 15,
    dateAdded: '2023-04-03',
    type: '',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '16',
    name: 'Deodorant',
    description: 'Unscented deodorant',
    imageUrl: 'https://images.pexels.com/photos/3737576/pexels-photo-3737576.jpeg',
    quantity: 12,
    dateAdded: '2023-04-05',
    type: '',
    source: 'Donations',
    isAvailable: true,
    section: 'pantry',
  },
  {
    id: '101',
    name: 'Apples',
    description: 'Fresh apples',
    imageUrl: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    quantity: 10,
    dateAdded: '2023-04-15',
    expiration: '2023-04-25',
    type: 'vegan',
    source: 'Donations',
    isAvailable: true,
    section: 'freedge',
  },
  {
    id: '102',
    name: 'Yogurt',
    description: 'Plain yogurt',
    imageUrl: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg',
    quantity: 5,
    dateAdded: '2023-04-16',
    expiration: '2023-04-20',
    type: 'vegan',
    source: 'Donations',
    isAvailable: true,
    section: 'freedge',
  },
  {
    id: '103',
    name: 'Hummus',
    description: 'Chickpea hummus',
    imageUrl: 'https://images.pexels.com/photos/1618901/pexels-photo-1618901.jpeg',
    quantity: 3,
    dateAdded: '2023-04-15',
    expiration: '2023-04-21',
    type: 'vegan',
    source: 'Donations ',
    isAvailable: true,
    section: 'freedge',
  },
  {
    id: '104',
    name: 'Eggs',
    description: 'Free-range eggs',
    imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
    quantity: 2,
    dateAdded: '2023-04-16',
    expiration: '2023-04-30',
    type: 'vegan',
    source: 'Donations',
    isAvailable: true,
    section: 'freedge',
  }
];

export const supplierData: Supplier[] = [
  {
    id: '1',
    name: 'Sysco',
    contact: '555-123-4567',
    email: 'orders@sysco.com',
    products: ['Milk', 'Canned Tomatoes', 'Canned Green Beans'],
    productTypes: ['Dairy', 'Canned Goods'],
    status: 'arrived',
    lastDelivery: '2023-04-10',
    nextDelivery: '2023-04-24',
  },
  {
    id: '2',
    name: 'Daylight Foods',
    contact: '555-987-6543',
    email: 'info@daylightfoods.com',
    products: ['Potatoes', 'Red Onions'],
    productTypes: ['Fresh Produce'],
    status: 'pending',
    lastDelivery: '2023-04-03',
    nextDelivery: '2023-04-17',
  },
  {
    id: '3',
    name: 'Aggie Fresh',
    contact: '555-789-0123',
    email: 'aggiefresh@ucdavis.edu',
    products: ['Broccoli', 'Strawberries', 'Carrots'],
    productTypes: ['testadam Produce'],
    status: 'arrived',
    lastDelivery: '2023-04-15',
    nextDelivery: '2023-04-22',
  },
  {
    id: '4',
    name: 'Donations',
    contact: '555-456-7890',
    email: 'info@localbakery.com',
    products: ['Bagels', 'Blueberry Muffins'],
    productTypes: ['Bakery Items'],
    status: 'arrived',
    lastDelivery: '2023-04-15',
    nextDelivery: '2023-04-18',
  }
];

export const volunteerData: Volunteer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '555-111-2222',
    shift: 'Monday 9am-12pm',
    position: 'Stock Clerk',
    startDate: '2023-01-15',
    active: true,
  },
  {
    id: '2',
    name: 'Jamie Smith',
    email: 'jamie.smith@example.com',
    phone: '555-333-4444',
    shift: 'Wednesday 1pm-4pm',
    position: 'Greeter',
    startDate: '2023-02-01',
    active: true,
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    email: 'taylor.wilson@example.com',
    phone: '555-555-6666',
    shift: 'Friday 10am-1pm',
    position: 'Inventory Manager',
    startDate: '2022-11-10',
    active: true,
  },
  {
    id: '4',
    name: 'Casey Brown',
    email: 'casey.brown@example.com',
    phone: '555-777-8888',
    shift: 'Tuesday 2pm-5pm',
    position: 'Stock Clerk',
    startDate: '2023-03-05',
    active: true,
  },
  {
    id: '5',
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    phone: '555-999-0000',
    shift: 'Thursday 9am-12pm',
    position: 'Inventory Manager',
    startDate: '2022-12-01',
    active: false,
  }
];

export const inventorySummaryData = [
  { name: 'Available', value: 350 },
  { name: 'Low Stock', value: 45 },
  { name: 'Out of Stock', value: 15 },
];

export const categoryDistributionData = [
  { name: 'Produce', value: 120 },
  { name: 'Canned Goods', value: 85 },
  { name: 'Dairy', value: 40 },
  { name: 'Bakery', value: 30 },
  { name: 'Toiletries', value: 75 },
  { name: 'Other', value: 60 },
];

export const distributionData = [
  { date: '2023-04-10', distributed: 45, received: 30 },
  { date: '2023-04-11', distributed: 38, received: 0 },
  { date: '2023-04-12', distributed: 52, received: 25 },
  { date: '2023-04-13', distributed: 40, received: 35 },
  { date: '2023-04-14', distributed: 55, received: 0 },
  { date: '2023-04-15', distributed: 60, received: 40 },
  { date: '2023-04-16', distributed: 35, received: 20 },
];

export const popularProductsData = [
  { name: 'Canned Black Beans', value: 45 },
  { name: 'Fresh Produce', value: 38 },
  { name: 'Milk', value: 32 },
  { name: 'Toiletries', value: 28 },
  { name: 'Bread Items', value: 25 },
];