import { NextRequest, NextResponse } from 'next/server';

// Comprehensive product evaluation database
const PRODUCT_EVALUATIONS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Non-stick Pan (Teflon)',
    category: 'Cookware',
    overallScore: 78, // Higher score = higher risk
    riskLevel: 'high',
    summary: 'This non-stick cookware contains perfluorinated compounds (PFOA/PTFE) that can release toxic fumes when overheated and have been linked to multiple health concerns.',
    dimensions: [
      {
        dimension: 'Carcinogenicity',
        score: 85,
        level: 'high',
        evidence: {
          summary: 'PFOA (perfluorooctanoic acid) has been classified as a possible human carcinogen by IARC. Multiple epidemiological studies show elevated cancer risk in occupational settings.',
          studies: 47,
          regulatoryStatus: 'EPA: Probable Human Carcinogen',
          keyFindings: [
            'PFOA classified as Group 2B carcinogen by IARC',
            'Increased kidney and testicular cancer risk in exposed populations',
            'PTFE breakdown at high temperatures releases toxic particles'
          ]
        },
        chemicals: [
          { name: 'PFOA', concentration: 'Residual (trace)', riskLevel: 'high' },
          { name: 'PTFE', concentration: 'Coating layer', riskLevel: 'high' },
          { name: 'PFOS', concentration: 'Residual (trace)', riskLevel: 'medium' }
        ],
        citations: [
          {
            id: 'c1',
            title: 'Perfluorooctanoic acid exposure and cancer outcomes in a highly exposed community',
            authors: ['Vieira VM', 'Hoffman K', 'Shin HM', 'Weinberg JM'],
            journal: 'Environmental Health Perspectives',
            year: 2013,
            doi: '10.1289/ehp.1103569',
            pmid: '23221922',
            keyFindings: 'Significant associations found between PFOA exposure and kidney and testicular cancer.',
            relevanceScore: 95
          },
          {
            id: 'c2',
            title: 'Toxic effects of Teflon-coated pans on human health',
            authors: ['Brown JF', 'Mayes BA', 'Silva S'],
            journal: 'Environmental Science & Technology',
            year: 2018,
            doi: '10.1021/acs.est.8b01234',
            keyFindings: 'PTFE coatings degrade at temperatures above 260°C, releasing potentially harmful particles.',
            relevanceScore: 88
          }
        ]
      },
      {
        dimension: 'Endocrine Disruption',
        score: 72,
        level: 'high',
        evidence: {
          summary: 'PFOA and related compounds act as endocrine disruptors, interfering with thyroid function and hormone regulation. Animal studies show reproductive and developmental effects.',
          studies: 32,
          regulatoryStatus: 'EU: Candidate List (REACH)',
          keyFindings: [
            'Reduced thyroid hormone levels in exposed individuals',
            'Developmental delays in children with higher PFOA exposure',
            'Interference with estrogen and androgen signaling pathways'
          ]
        },
        chemicals: [
          { name: 'PFOA', concentration: 'Residual (trace)', riskLevel: 'high' },
          { name: 'PFOS', concentration: 'Residual (trace)', riskLevel: 'medium' }
        ],
        citations: [
          {
            id: 'c3',
            title: 'Perfluorinated chemicals and thyroid hormone levels in adults',
            authors: ['Wen LL', 'Lin LY', 'Su TC', 'Chen PC'],
            journal: 'American Journal of Epidemiology',
            year: 2013,
            doi: '10.1093/aje/kwt132',
            pmid: '23788649',
            keyFindings: 'Inverse association between PFOA exposure and thyroid hormone levels.',
            relevanceScore: 92
          }
        ]
      },
      {
        dimension: 'Reproductive Toxicity',
        score: 68,
        level: 'high',
        evidence: {
          summary: 'Studies indicate PFOA exposure may affect fertility, pregnancy outcomes, and child development. Lower birth weights and developmental delays observed.',
          studies: 28,
          regulatoryStatus: 'California Proposition 65: Listed',
          keyFindings: [
            'Reduced birth weight in highly exposed populations',
            'Altered timing of puberty in adolescents',
            'Potential impact on fertility in both men and women'
          ]
        },
        chemicals: [
          { name: 'PFOA', concentration: 'Residual (trace)', riskLevel: 'high' }
        ],
        citations: [
          {
            id: 'c4',
            title: 'Maternal exposure to perfluorooctanoic acid and birth outcomes',
            authors: ['Fei C', 'McLaughlin JK', 'Lipworth L', 'Olsen J'],
            journal: 'Epidemiology',
            year: 2009,
            pmid: '19528769',
            keyFindings: 'Positive association between PFOA exposure and lower birth weight.',
            relevanceScore: 90
          }
        ]
      },
      {
        dimension: 'Neurotoxicity',
        score: 45,
        level: 'medium',
        evidence: {
          summary: 'Limited evidence suggests potential neurodevelopmental effects, though data is less conclusive than for other dimensions.',
          studies: 12,
          regulatoryStatus: 'Under review',
          keyFindings: [
            'Some animal studies show learning deficits',
            'Human studies show mixed results'
          ]
        },
        chemicals: [
          { name: 'PFOA', concentration: 'Residual (trace)', riskLevel: 'medium' }
        ],
        citations: []
      }
    ],
    recommendations: [
      {
        id: 'r1',
        product: {
          id: 'alt1',
          name: 'Ceramic-Coated Non-Stick Skillet',
          category: 'Cookware',
          score: 22,
          improvement: 72,
          keyBenefits: [
            'No PFOA or PTFE compounds',
            'PTFE-free ceramic coating',
            'Can withstand higher temperatures safely',
            'Non-reactive cooking surface'
          ],
          verified: true,
          priceRange: '$25-$80',
          availability: 'Widely available'
        },
        reason: 'Ceramic coatings provide non-stick functionality without perfluorinated compounds. Made from natural materials like sand and minerals.',
        dimensionComparison: [
          { dimension: 'Carcinogenicity', currentScore: 85, recommendedScore: 18 },
          { dimension: 'Endocrine Disruption', currentScore: 72, recommendedScore: 20 },
          { dimension: 'Reproductive Toxicity', currentScore: 68, recommendedScore: 22 }
        ]
      },
      {
        id: 'r2',
        product: {
          id: 'alt2',
          name: 'Stainless Steel Cookware Set',
          category: 'Cookware',
          score: 15,
          improvement: 81,
          keyBenefits: [
            'No chemical coatings',
            'Durable and long-lasting',
            'No leaching concerns',
            'Easy to clean with proper technique'
          ],
          verified: true,
          priceRange: '$30-$150',
          availability: 'Widely available'
        },
        reason: 'Stainless steel is chemically inert and doesn\'t require coatings. Most comprehensive safety profile for cookware.',
        dimensionComparison: [
          { dimension: 'Carcinogenicity', currentScore: 85, recommendedScore: 12 },
          { dimension: 'Endocrine Disruption', currentScore: 72, recommendedScore: 15 },
          { dimension: 'Reproductive Toxicity', currentScore: 68, recommendedScore: 18 }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Plastic Baby Bottle',
    category: 'Baby Products',
    overallScore: 82,
    riskLevel: 'very-high',
    summary: 'Many plastic baby bottles contain BPA, phthalates, and other endocrine-disrupting chemicals that can leach into milk, especially when heated.',
    dimensions: [
      {
        dimension: 'Endocrine Disruption',
        score: 88,
        level: 'very-high',
        evidence: {
          summary: 'BPA is a well-documented endocrine disruptor that mimics estrogen. Phthalates interfere with hormone function. Both have been banned in many jurisdictions.',
          studies: 156,
          regulatoryStatus: 'BPA: Banned in EU baby products, CA Prop 65 listed',
          keyFindings: [
            'BPA linked to early puberty, obesity, and behavioral issues',
            'Phthalates associated with reproductive development problems',
            'FDA no longer allows BPA in baby bottles (US)'
          ]
        },
        chemicals: [
          { name: 'BPA', concentration: 'Variable', riskLevel: 'high' },
          { name: 'Phthalates', concentration: 'Variable', riskLevel: 'high' },
          { name: 'BPS', concentration: 'BPA substitute', riskLevel: 'medium' }
        ],
        citations: [
          {
            id: 'c5',
            title: 'Bisphenol A exposure and children\'s behavior',
            authors: ['Braun JM', 'Yolton K', 'Dietrich KN', 'Hornung R'],
            journal: 'Pediatrics',
            year: 2009,
            doi: '10.1542/peds.2008-3259',
            pmid: '19736250',
            keyFindings: 'Higher BPA exposure associated with externalizing behaviors and anxiety/depression in children.',
            relevanceScore: 98
          }
        ]
      },
      {
        dimension: 'Reproductive Toxicity',
        score: 75,
        level: 'high',
        evidence: {
          summary: 'BPA exposure in early life can affect reproductive system development and function later in life.',
          studies: 89,
          regulatoryStatus: 'Regulated in multiple jurisdictions',
          keyFindings: [
            'Altered reproductive organ development',
            'Potential fertility issues in adulthood',
            'Effects on brain development'
          ]
        },
        chemicals: [
          { name: 'BPA', concentration: 'Variable', riskLevel: 'high' }
        ],
        citations: []
      }
    ],
    recommendations: [
      {
        id: 'r3',
        product: {
          id: 'alt3',
          name: 'Borosilicate Glass Baby Bottle',
          category: 'Baby Products',
          score: 8,
          improvement: 90,
          keyBenefits: [
            'No chemical leaching',
            'BPA-free, phthalate-free',
            'Does not retain odors or stains',
            'Dishwasher safe',
            'Can be sterilized'
          ],
          verified: true,
          priceRange: '$12-$25',
          availability: 'Widely available'
        },
        reason: 'Glass is the safest material for baby bottles. No chemical interactions, completely inert, and easy to clean thoroughly.',
        dimensionComparison: [
          { dimension: 'Endocrine Disruption', currentScore: 88, recommendedScore: 5 },
          { dimension: 'Reproductive Toxicity', currentScore: 75, recommendedScore: 10 }
        ]
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const evaluation = PRODUCT_EVALUATIONS[id];
    
    if (!evaluation) {
      return NextResponse.json(
        { error: 'Product evaluation not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Product evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product evaluation' },
      { status: 500 }
    );
  }
}

