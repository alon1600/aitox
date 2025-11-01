import { NextRequest, NextResponse } from 'next/server';

// Simulated product database
const PRODUCT_DATABASE = [
  {
    id: '1',
    name: 'Non-stick pan',
    category: 'Cookware',
    riskLevel: 'high' as const,
    concerns: ['PFOA/PTFE', 'Perfluorinated compounds'],
    saferAlternative: 'Ceramic-coated skillet',
    detectedKeywords: ['pan', 'skillet', 'frying pan', 'non-stick', 'teflon'],
  },
  {
    id: '2',
    name: 'Plastic baby bottle',
    category: 'Baby products',
    riskLevel: 'very-high' as const,
    concerns: ['BPA', 'Phthalates', 'Microplastics'],
    saferAlternative: 'Borosilicate glass bottle',
    detectedKeywords: ['bottle', 'baby bottle', 'plastic bottle'],
  },
  {
    id: '3',
    name: 'Fragrance hand soap',
    category: 'Personal care',
    riskLevel: 'medium' as const,
    concerns: ['Phthalates', 'Synthetic fragrances', 'Parabens'],
    saferAlternative: 'Unscented EWG-verified soap',
    detectedKeywords: ['soap', 'hand soap', 'fragrance', 'hand wash'],
  },
  {
    id: '4',
    name: 'Synthetic rug',
    category: 'Home furnishings',
    riskLevel: 'medium' as const,
    concerns: ['VOCs', 'Flame retardants', 'Formaldehyde'],
    saferAlternative: 'Wool or organic cotton rug',
    detectedKeywords: ['rug', 'carpet', 'mat'],
  },
  {
    id: '5',
    name: 'Plastic food storage',
    category: 'Kitchenware',
    riskLevel: 'medium' as const,
    concerns: ['BPA', 'Phthalates'],
    saferAlternative: 'Glass or stainless steel containers',
    detectedKeywords: ['container', 'tupperware', 'storage', 'plastic container'],
  },
];

// Simulate image analysis - in production this would use actual ML/vision APIs
function simulateProductDetection(fileCount: number): typeof PRODUCT_DATABASE[number][] {
  // Simulate detection based on "analyzing" the images
  // In reality, this would use computer vision to identify products
  const detectedProducts: typeof PRODUCT_DATABASE[number][] = [];
  const seen = new Set<string>();

  // More files = higher chance of detecting products
  const detectionRate = Math.min(0.7, 0.2 + fileCount * 0.1);
  
  PRODUCT_DATABASE.forEach(product => {
    if (Math.random() < detectionRate && !seen.has(product.name)) {
      detectedProducts.push(product);
      seen.add(product.name);
    }
  });

  // Always return at least some results for demo purposes
  if (detectedProducts.length === 0 && fileCount > 0) {
    return PRODUCT_DATABASE.slice(0, Math.min(3, fileCount));
  }

  return detectedProducts;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate product detection
    const detectedProducts = simulateProductDetection(files.length);

    // In production, you would:
    // 1. Upload images to storage (S3, Cloudinary, etc.)
    // 2. Call vision API (Google Vision, AWS Rekognition, Custom ML model)
    // 3. Extract product names/barcodes from images
    // 4. Query your product database
    // 5. Return structured results

    const scanId = `scan_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Map detected products to include IDs and metadata for home catalog
    const productsWithIds = detectedProducts.map((product, index) => ({
      ...product,
      id: product.id || `detected_${Date.now()}_${index}`,
      addedAt: timestamp,
      scanId,
    }));

    return NextResponse.json({
      success: true,
      detectedProducts: productsWithIds,
      scanId,
      timestamp,
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json(
      { error: 'Failed to process scan' },
      { status: 500 }
    );
  }
}

