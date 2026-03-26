// app/api/search/route.ts
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  // request enter =>http://localhost:3000/api/search?q=nordic
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  //  request out => nordic

  try {
    const res = await fetch('https://api.npoint.io/ecb00cdce41597903e6c', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    const products = data.products || [];

    const filteredProducts = products
      .filter(
        (p: any) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
      .slice(0, 6);

    return NextResponse.json(filteredProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
