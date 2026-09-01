const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const seedProducts = [
  { id: '1', name: 'Midnight Velvet Gown', price: 45000, category: 'Statement', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800', scarcity: 'Only 2 left in size M', description: 'A floor-length velvet gown in deep midnight blue. Perfect for galas and formal events.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 10 },
  { id: '2', name: 'Ivory Silk Suit', price: 32000, category: 'Premium', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', isPreorder: true, description: 'A tailored two-piece silk suit in ivory.', sizes: ['S', 'M', 'L', 'XL'], countInStock: 0 },
  { id: '3', name: 'Emerald Embellished Dress', price: 55000, category: 'Statement', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', description: 'Hand-embellished emerald green cocktail dress.', sizes: ['XS', 'S', 'M'], countInStock: 8 },
  { id: '4', name: 'Ruby Red Chiffon Gown', price: 62000, category: 'Statement', image: 'https://images.unsplash.com/photo-1566150908104-58686d06be36?auto=format&fit=crop&q=80&w=800', scarcity: 'Selling Fast!', description: 'A flowing chiffon gown in rich ruby red.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 5 },
  { id: '5', name: 'Vibrant Fuchsia Maxi', price: 28000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800', description: 'A bold fuchsia maxi dress with a relaxed silhouette.', sizes: ['XS', 'S', 'M', 'L', 'XL'], countInStock: 15 },
  { id: '6', name: 'Gold Pleated Midi', price: 22000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&q=80&w=800', description: 'A shimmering gold pleated midi skirt.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 12 },
  { id: '7', name: 'Royal Blue Corset', price: 34000, category: 'Premium', image: 'https://images.unsplash.com/photo-1582533561751-0c58a6cb9378?auto=format&fit=crop&q=80&w=800', isPreorder: true, description: 'A structured royal blue corset with boning.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 0 },
  { id: '8', name: 'Coral Sunset Dress', price: 19500, category: 'Accessible', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', description: 'A breezy coral-toned dress with a wrap silhouette.', sizes: ['XS', 'S', 'M', 'L', 'XL'], countInStock: 20 },
  { id: '9', name: 'Lavender Tulle Skirt', price: 21000, category: 'Accessible', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', scarcity: 'Only 1 left!', description: 'A dreamy lavender tulle midi skirt.', sizes: ['XS', 'S', 'M'], countInStock: 3 },
];

const seedAdmin = async () => {
  const exists = await User.findOne({ email: 'admin@zaqueen.com' });
  if (!exists) {
    await User.create({ name: 'ZaQueen Admin', email: 'admin@zaqueen.com', password: 'admin123', role: 'admin' });
    console.log('Admin user created: admin@zaqueen.com / admin123');
  }
};

const seed = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log('Products seeded');
  await seedAdmin();
  console.log('Seed complete');
  process.exit();
};

seed();
