import { NextRequest, NextResponse } from 'next/server';
import {
  ACADEMIC_STUDIES_CATALOGUE,
  getStudiesByChemical,
  getStudiesByProductCategory,
  getStudiesByDimension,
  getSeminalStudies,
  getHighImpactStudies,
  searchStudies,
  getCatalogueStats,
  getAllChemicals,
  getAllProductCategories
} from '@/data/academic-studies-catalogue';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const chemical = searchParams.get('chemical');
    const category = searchParams.get('category');
    const dimension = searchParams.get('dimension');
    const search = searchParams.get('search');
    const seminal = searchParams.get('seminal') === 'true';
    const highImpact = searchParams.get('highImpact') === 'true';
    const impactThreshold = searchParams.get('impactThreshold') ? parseInt(searchParams.get('impactThreshold')!) : undefined;
    const stats = searchParams.get('stats') === 'true';
    const chemicals = searchParams.get('chemicals') === 'true';
    const categories = searchParams.get('categories') === 'true';

    // Return statistics
    if (stats) {
      return NextResponse.json({
        stats: getCatalogueStats(),
        totalStudies: ACADEMIC_STUDIES_CATALOGUE.length
      });
    }

    // Return all unique chemicals
    if (chemicals) {
      return NextResponse.json({
        chemicals: getAllChemicals()
      });
    }

    // Return all unique categories
    if (categories) {
      return NextResponse.json({
        categories: getAllProductCategories()
      });
    }

    // Filter studies based on parameters
    let studies = [...ACADEMIC_STUDIES_CATALOGUE];

    if (chemical) {
      studies = getStudiesByChemical(chemical);
    }

    if (category) {
      const categoryStudies = getStudiesByProductCategory(category);
      studies = studies.filter(study => categoryStudies.includes(study));
    }

    if (dimension) {
      const dimensionStudies = getStudiesByDimension(dimension);
      studies = studies.filter(study => dimensionStudies.includes(study));
    }

    if (search) {
      const searchResults = searchStudies(search);
      studies = studies.filter(study => searchResults.includes(study));
    }

    if (seminal) {
      studies = studies.filter(study => study.isSeminal === true);
    }

    if (highImpact) {
      const threshold = impactThreshold || 90;
      studies = getHighImpactStudies(threshold);
      // Also apply other filters if specified
      if (chemical) {
        studies = studies.filter(study =>
          study.chemicals.some(c => c.toLowerCase().includes(chemical.toLowerCase()))
        );
      }
      if (category) {
        studies = studies.filter(study =>
          study.productCategories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
        );
      }
      if (dimension) {
        studies = studies.filter(study =>
          study.toxicologicalDimensions.some(dim => dim.toLowerCase().includes(dimension.toLowerCase()))
        );
      }
    }

    // Sort by impact score (highest first) by default
    studies.sort((a, b) => b.impactScore - a.impactScore);

    return NextResponse.json({
      studies,
      count: studies.length,
      total: ACADEMIC_STUDIES_CATALOGUE.length
    });
  } catch (error) {
    console.error('Error fetching studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch studies' },
      { status: 500 }
    );
  }
}

