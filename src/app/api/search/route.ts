import { NextRequest, NextResponse } from 'next/server';

// Product search index - maps keywords to product IDs
const PRODUCT_SEARCH_INDEX: Record<string, string[]> = {
  'teflon': ['1'],
  'pan': ['1'],
  'non-stick': ['1'],
  'nonstick': ['1'],
  'pfoa': ['1'],
  'ptfe': ['1'],
  'cookware': ['1'],
  'baby': ['2'],
  'bottle': ['2'],
  'plastic': ['2'],
  'bpa': ['2'],
  'shampoo': [], // No product yet
  'rug': [], // No product yet
  'rugs': [], // No product yet
  'soap': [], // No product yet
  'hand soap': [], // No product yet
};

// Product metadata for search results
const PRODUCT_METADATA: Record<string, {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  riskLevel: string;
  overallScore: number;
}> = {
  '1': {
    id: '1',
    name: 'Pots and Pans',
    category: 'Cookware',
    keywords: ['pots', 'pans', 'cookware', 'teflon', 'pan', 'non-stick', 'nonstick', 'pfoa', 'ptfe', 'skillet', 'frying pan', 'cookware set', 'pots and pans'],
    riskLevel: 'high',
    overallScore: 78,
  },
  '2': {
    id: '2',
    name: 'Baby Bottles',
    category: 'Baby Products',
    keywords: ['baby', 'bottle', 'baby bottles', 'plastic', 'bpa', 'baby bottle', 'infant bottle', 'feeding bottle'],
    riskLevel: 'very-high',
    overallScore: 82,
  },
};

function searchProducts(query: string): Array<typeof PRODUCT_METADATA[string]> {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }

  // Split query into individual words
  const queryWords = normalizedQuery.split(/\s+/);
  const matchedProducts = new Set<string>();
  const productScores = new Map<string, number>();

  // Check each query word against product keywords
  queryWords.forEach(word => {
    // Direct keyword match
    Object.entries(PRODUCT_METADATA).forEach(([id, product]) => {
      product.keywords.forEach(keyword => {
        if (keyword.includes(word) || word.includes(keyword)) {
          matchedProducts.add(id);
          const currentScore = productScores.get(id) || 0;
          productScores.set(id, currentScore + 1);
        }
      });
    });

    // Search index lookup
    Object.entries(PRODUCT_SEARCH_INDEX).forEach(([keyword, productIds]) => {
      if (keyword.includes(word) || word.includes(keyword)) {
        productIds.forEach(id => {
          matchedProducts.add(id);
          const currentScore = productScores.get(id) || 0;
          productScores.set(id, currentScore + 1);
        });
      }
    });
  });

  // Convert to array and sort by relevance score
  const results = Array.from(matchedProducts)
    .map(id => PRODUCT_METADATA[id])
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .sort((a, b) => {
      const scoreA = productScores.get(a.id) || 0;
      const scoreB = productScores.get(b.id) || 0;
      return scoreB - scoreA; // Higher score first
    });

  return results;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    
    if (!query.trim()) {
      return NextResponse.json({
        query: '',
        results: [],
        total: 0,
      });
    }

    const results = searchProducts(query);

    return NextResponse.json({
      query,
      results,
      total: results.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}

