require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
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
  { id: '10', name: 'Rose Garden Blouse', price: 1299, category: 'Accessible', image: 'https://images.pexels.com/photos/19780968/pexels-photo-19780968.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'A delicate floral blouse with romantic rose details.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 18 },
  { id: '11', name: 'Sunset Pleated Dress', price: 1899, category: 'Accessible', image: 'https://images.pexels.com/photos/16698354/pexels-photo-16698354.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'A flowing pleated dress in warm sunset hues.', sizes: ['S', 'M', 'L', 'XL'], countInStock: 14 },
  { id: '12', name: 'Crystal Embroidered Top', price: 2499, category: 'Premium', image: 'https://images.pexels.com/photos/37068087/pexels-photo-37068087.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'An elegantly embroidered top with crystal accents.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 8, isPreorder: true },
  { id: '13', name: 'Midnight Silk Wrap', price: 2999, category: 'Statement', image: 'https://images.pexels.com/photos/38962066/pexels-photo-38962066.jpeg?auto=compress&cs=tinysrgb&w=800', scarcity: 'Selling Fast!', description: 'A luxurious silk wrap dress in deep midnight tones.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 6 },
  { id: '14', name: 'Golden Hour Maxi', price: 1599, category: 'Accessible', image: 'https://images.pexels.com/photos/34726708/pexels-photo-34726708.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'A stunning maxi dress capturing the golden hour glow.', sizes: ['S', 'M', 'L', 'XL'], countInStock: 12 },
  { id: '15', name: 'Pearl Cascade Dress', price: 3499, category: 'Statement', image: 'https://images.pexels.com/photos/30326211/pexels-photo-30326211.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'A cascading dress adorned with delicate pearl details.', sizes: ['XS', 'S', 'M'], countInStock: 5 },
  { id: '16', name: 'Velvet Orchid Gown', price: 3999, category: 'Statement', image: 'https://images.pexels.com/photos/36378795/pexels-photo-36378795.jpeg?auto=compress&cs=tinysrgb&w=800', scarcity: 'Only 3 left!', description: 'A rich velvet gown in deep orchid purple.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 3 },
  { id: '17', name: 'Celestial Tulle Dress', price: 2799, category: 'Premium', image: 'https://images.pexels.com/photos/38963569/pexels-photo-38963569.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'An ethereal tulle dress with celestial shimmer.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 7, isPreorder: true },
  { id: '18', name: 'Azure Wave Maxi', price: 1399, category: 'Accessible', image: 'https://images.pexels.com/photos/38507485/pexels-photo-38507485.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'A breezy maxi dress with flowing azure wave patterns.', sizes: ['S', 'M', 'L', 'XL'], countInStock: 16 },
  { id: '19', name: 'Blush Champagne Cocktail', price: 2299, category: 'Premium', image: 'https://images.pexels.com/photos/30842648/pexels-photo-30842648.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'An elegant cocktail dress in soft blush champagne tones.', sizes: ['XS', 'S', 'M', 'L'], countInStock: 9 },
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
