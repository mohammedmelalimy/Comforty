import Card from './Card';

export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  priceAfterDiscount: number;
  discount: number;
  rating: number;
  image: string;
  category: string;
}

async function getFurnitureData() {
  try {
    const res = await fetch('https://api.npoint.io/664dbf69f3cc3b9c6544', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Fetch failed');
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching furniture:', error);
    return [];
  }
}

export const Products = async ({ lang }: { lang: string }) => {
  const products: Product[] = await getFurnitureData();
  const isArabic = lang === 'ar';

  if (products.length === 0) {
    return (
      <p className="text-center py-10">
        {isArabic ? ' لا توجد منتجات حاليا' : 'No products found'}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} product={product} lang={lang} />
      ))}
    </div>
  );
};
