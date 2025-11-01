import { NextRequest, NextResponse } from 'next/server';

export interface HomeProduct {
  id: string;
  name: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | 'very-high';
  concerns: string[];
  saferAlternative: string;
  detectedKeywords?: string[];
  addedAt: string;
  scanId?: string;
}

// GET - Retrieve all products in user's home
export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from a database using user session/auth
    // For now, we'll return a message that this should be called from the client
    // The client will use localStorage
    
    return NextResponse.json({
      success: true,
      message: 'Use client-side localStorage for now. Products stored locally.',
    });
  } catch (error) {
    console.error('Get home products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home products' },
      { status: 500 }
    );
  }
}

// POST - Add products to user's home
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products, scanId } = body;
    
    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Invalid products data' },
        { status: 400 }
      );
    }

    // In production, this would save to a database
    // For now, return success and let client handle localStorage
    return NextResponse.json({
      success: true,
      message: 'Products should be saved to localStorage on client side',
      products,
    });
  } catch (error) {
    console.error('Add home products error:', error);
    return NextResponse.json(
      { error: 'Failed to add products to home' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a product from user's home
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }

    // In production, this would remove from database
    return NextResponse.json({
      success: true,
      message: 'Product should be removed from localStorage on client side',
    });
  } catch (error) {
    console.error('Remove home product error:', error);
    return NextResponse.json(
      { error: 'Failed to remove product from home' },
      { status: 500 }
    );
  }
}

