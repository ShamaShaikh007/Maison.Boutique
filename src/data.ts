import { Product } from './types';

export const CATEGORIES = ['All', 'Apothecary', 'Textiles', 'Kitchen', 'Accessories'];

export const PRODUCTS: Product[] = [
  {
    id: 'maison-incense-holder',
    title: 'Ceramic Arch Incense Burner',
    category: 'Apothecary',
    price: 38,
    rating: 4.8,
    reviewCount: 42,
    description: 'An architectural crescent-shaped incense holder handcrafted from textured warm clay. Each piece is unique with subtle natural speckling and accommodates both stick and cone incense.',
    imageUrl: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=600',
    badge: 'Best Seller',
    colors: [
      { name: 'Oatmeal Speckle', hex: '#EAE0D5', bgClass: 'bg-[#EAE0D5]' },
      { name: 'Slate Gray', hex: '#5E6472', bgClass: 'bg-[#5E6472]' }
    ],
    inStock: true
  },
  {
    id: 'maison-throw-blanket',
    title: 'Organic Waffle Cotton Throw',
    category: 'Textiles',
    price: 120,
    rating: 4.9,
    reviewCount: 56,
    description: 'An incredibly soft, medium-weight waffle knit throw woven in Portugal from 100% certified organic cotton. Generous proportions and exquisite raw edge details make it a living-room mainstay.',
    imageUrl: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=600',
    badge: 'Organic',
    colors: [
      { name: 'Terracotta', hex: '#D39E82', bgClass: 'bg-[#D39E82]' },
      { name: 'Sage Green', hex: '#8A9A86', bgClass: 'bg-[#8A9A86]' },
      { name: 'Classic Cream', hex: '#F5F2EB', bgClass: 'bg-[#F5F2EB]' }
    ],
    sizes: ['Standard', 'Oversized'],
    inStock: true
  },
  {
    id: 'maison-soy-candle',
    title: 'Santal & Hinoki Candle',
    category: 'Apothecary',
    price: 34,
    rating: 4.7,
    reviewCount: 118,
    description: 'A comforting, grounded blend of soothing Australian sandalwood, native hinoki cypress, and smokey cedarwood. Hand-poured in a mouth-blown amber glass vessel with a clean-burning cotton wick.',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600',
    badge: '10% OFF',
    colors: [
      { name: 'Amber Glass', hex: '#9E7B56', bgClass: 'bg-[#9E7B56]' }
    ],
    sizes: ['8 oz', '12 oz'],
    inStock: true
  },
  {
    id: 'maison-tea-mug',
    title: 'Ribbed Stoneware Mug',
    category: 'Kitchen',
    price: 26,
    rating: 4.9,
    reviewCount: 184,
    description: 'An elegant ribbed mug designed for slow morning rituals. Formed from dark iron-rich clay, finished with a satin matte speckled chalk glaze. Microwave and dishwasher safe.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    colors: [
      { name: 'Chalk White', hex: '#FDFBF7', bgClass: 'bg-[#FDFBF7]' },
      { name: 'Sage Moss', hex: '#8A9A86', bgClass: 'bg-[#8A9A86]' }
    ],
    inStock: true
  },
  {
    id: 'maison-linen-journal',
    title: 'Linen Bound Daily Journal',
    category: 'Accessories',
    price: 45,
    rating: 4.8,
    reviewCount: 37,
    description: 'A beautiful linen-wrapped lay-flat notebook featuring 160 pages of heavyweight, wire-bound cream paper. Divided into light dotted guides perfect for dreaming, planning, and bullet journaling.',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&q=80&w=600',
    badge: 'New',
    colors: [
      { name: 'Oatmeal Linen', hex: '#D7C4B7', bgClass: 'bg-[#D7C4B7]' },
      { name: 'Charcoal Linen', hex: '#3E3E3E', bgClass: 'bg-[#3E3E3E]' }
    ],
    inStock: true
  },
  {
    id: 'maison-travertine-tray',
    title: 'Honed Travertine Catchall',
    category: 'Kitchen',
    price: 68,
    rating: 4.9,
    reviewCount: 29,
    description: 'Carved from solid Italian beige travertine stone, this minimalist tray coordinates key items on your entryway console, vanity, or kitchen island. Hand-honed to a tactile matte finish.',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=600',
    colors: [
      { name: 'Porous Ivory', hex: '#E6DFD3', bgClass: 'bg-[#E6DFD3]' }
    ],
    inStock: true
  },
  {
    id: 'maison-linen-towels',
    title: 'French Flax Linen Hand Towels',
    category: 'Textiles',
    price: 48,
    rating: 4.6,
    reviewCount: 65,
    description: 'Woven in France from premium long-staple flax, this set of two hand towels is absorbent, fast-drying, and pre-washed for exquisite, relaxed crinkled softness from day one.',
    imageUrl: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=600',
    colors: [
      { name: 'Chalk Stripe', hex: '#ECE8E1', bgClass: 'bg-[#ECE8E1]' },
      { name: 'Oatmeal', hex: '#CEC5B4', bgClass: 'bg-[#CEC5B4]' },
      { name: 'Sage Solid', hex: '#A8B5A3', bgClass: 'bg-[#A8B5A3]' }
    ],
    inStock: true
  },
  {
    id: 'maison-botanical-soap',
    title: 'Wild Juniper & Cedar Soap Set',
    category: 'Apothecary',
    price: 18,
    rating: 4.7,
    reviewCount: 92,
    description: 'A bundle of three nourishing cold-pressed bars packed with French green clay, sea salt, organic plant oils, and essential oils of wild juniper and cedarwood. Gently exfoliating.',
    imageUrl: 'https://images.unsplash.com/photo-1607006342445-565a116f1618?auto=format&fit=crop&q=80&w=600',
    colors: [
      { name: 'Sage Green Clay', hex: '#9EAA98', bgClass: 'bg-[#9EAA98]' }
    ],
    inStock: false // Out of stock to show fully functional disabled/out of stock statuses perfectly
  }
];
