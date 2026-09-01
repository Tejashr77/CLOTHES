export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const lerp = (start, end, factor) => start + (end - start) * factor;

export const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const getImageUrl = (src, width = 800) => {
  if (!src) return '';
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width);
    url.searchParams.set('q', '80');
    url.searchParams.set('auto', 'format');
    return url.toString();
  }
  return src;
};

export const generateStructuredData = (type, data) => {
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
  };
  return { ...base, ...data };
};

export const productSchema = (product) => generateStructuredData('Product', {
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'INR',
    availability: product.countInStock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  },
  brand: { '@type': 'Brand', name: 'ZaQueen' },
});

export const organizationSchema = () => generateStructuredData('Organization', {
  name: 'ZaQueen',
  url: 'https://zaqueen.com',
  logo: 'https://zaqueen.com/logo_0_0.jpeg',
  sameAs: ['https://instagram.com/zaqueen', 'https://facebook.com/zaqueen'],
});
