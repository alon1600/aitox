import { NextRequest, NextResponse } from 'next/server';

// Comprehensive product evaluation database
const PRODUCT_EVALUATIONS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Pots and Pans',
    category: 'Cookware',
    overallScore: 78, // Higher score = higher risk (average across all types)
    riskLevel: 'high',
    summary: 'Cookware encompasses various materials and coatings, each with different safety profiles. Non-stick coatings containing perfluorinated compounds (PFOA/PTFE) present significant health concerns, while materials like stainless steel and ceramic offer safer alternatives.',
    // Effectiveness criteria specific to cookware
    effectivenessCriteria: {
      heatDistribution: { score: 65, label: 'Heat Distribution', description: 'Moderate heat conductivity, but can have hot spots' },
      nonStickPerformance: { score: 95, label: 'Non-Stick Performance', description: 'Excellent non-stick properties when properly maintained' },
      durability: { score: 45, label: 'Durability', description: 'Coating can scratch and degrade over time' },
      easeOfCleaning: { score: 90, label: 'Ease of Cleaning', description: 'Very easy to clean with proper care' },
      temperatureResistance: { score: 60, label: 'Temperature Resistance', description: 'Degrades above 260°C (500°F), releases fumes' }
    },
    // Product rankings comparing top alternatives
    productRankings: [
      {
        id: 'r1',
        name: 'Ceramic-Coated Non-Stick Skillet',
        category: 'Cookware',
        effectivenessScore: 78,
        toxicologyScore: 22, // Lower is better
        overallRank: 1,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08XYZ1234',
          target: 'https://target.com/p/ceramic-skillet',
          walmart: 'https://walmart.com/ip/ceramic-pan'
        },
        effectivenessBreakdown: {
          heatDistribution: 70,
          nonStickPerformance: 85,
          durability: 65,
          easeOfCleaning: 85,
          temperatureResistance: 85
        },
        toxicologyBreakdown: {
          carcinogenicity: 18,
          endocrineDisruption: 20,
          reproductiveToxicity: 22,
          neurotoxicity: 15
        }
      },
      {
        id: 'r2',
        name: 'Stainless Steel Cookware Set',
        category: 'Cookware',
        effectivenessScore: 72,
        toxicologyScore: 15, // Lower is better
        overallRank: 2,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08ABC5678',
          target: 'https://target.com/p/stainless-cookware',
          walmart: 'https://walmart.com/ip/stainless-steel-set'
        },
        effectivenessBreakdown: {
          heatDistribution: 90,
          nonStickPerformance: 40,
          durability: 95,
          easeOfCleaning: 60,
          temperatureResistance: 95
        },
        toxicologyBreakdown: {
          carcinogenicity: 12,
          endocrineDisruption: 15,
          reproductiveToxicity: 18,
          neurotoxicity: 10
        }
      },
      {
        id: 'current',
        name: 'Non-stick Pan (Teflon)',
        category: 'Cookware',
        effectivenessScore: 71,
        toxicologyScore: 78, // Lower is better
        overallRank: 5,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08DEF9012',
          target: 'https://target.com/p/teflon-pan',
          walmart: 'https://walmart.com/ip/nonstick-pan'
        },
        effectivenessBreakdown: {
          heatDistribution: 65,
          nonStickPerformance: 95,
          durability: 45,
          easeOfCleaning: 90,
          temperatureResistance: 60
        },
        toxicologyBreakdown: {
          carcinogenicity: 85,
          endocrineDisruption: 72,
          reproductiveToxicity: 68,
          neurotoxicity: 45
        }
      },
      {
        id: 'r5',
        name: 'Cast Iron Cookware',
        category: 'Cookware',
        effectivenessScore: 75,
        toxicologyScore: 20, // Lower is better
        overallRank: 4,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08CAST001',
          target: 'https://target.com/p/cast-iron',
          walmart: 'https://walmart.com/ip/cast-iron-pan'
        },
        effectivenessBreakdown: {
          heatDistribution: 95,
          nonStickPerformance: 60,
          durability: 98,
          easeOfCleaning: 55,
          temperatureResistance: 95
        },
        toxicologyBreakdown: {
          carcinogenicity: 18,
          endocrineDisruption: 15,
          reproductiveToxicity: 20,
          neurotoxicity: 12
        }
      }
    ],
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
    name: 'Baby Bottles',
    category: 'Baby Products',
    overallScore: 82, // Average across all types
    riskLevel: 'very-high',
    summary: 'Baby bottles come in various materials, with significant safety differences. Plastic bottles containing BPA, phthalates, and other endocrine-disrupting chemicals pose serious health risks, especially when heated, while glass and silicone alternatives offer much safer options.',
    // Effectiveness criteria specific to baby products
    effectivenessCriteria: {
      easeOfUse: { score: 85, label: 'Ease of Use', description: 'Lightweight and easy for parents to hold' },
      durability: { score: 70, label: 'Durability', description: 'Can crack or scratch, may need frequent replacement' },
      temperatureResistance: { score: 50, label: 'Temperature Resistance', description: 'Limited - can degrade when heated, leaching chemicals' },
      portability: { score: 95, label: 'Portability', description: 'Very lightweight and portable' },
      easeOfCleaning: { score: 80, label: 'Ease of Cleaning', description: 'Generally easy to clean but can retain odors' }
    },
    // Product rankings comparing top alternatives
    productRankings: [
      {
        id: 'r3',
        name: 'Borosilicate Glass Baby Bottle',
        category: 'Baby Products',
        effectivenessScore: 68,
        toxicologyScore: 8, // Lower is better
        overallRank: 1,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08GLASS001',
          target: 'https://target.com/p/glass-baby-bottle',
          walmart: 'https://walmart.com/ip/glass-bottle'
        },
        effectivenessBreakdown: {
          easeOfUse: 50,
          durability: 85,
          temperatureResistance: 95,
          portability: 60,
          easeOfCleaning: 90
        },
        toxicologyBreakdown: {
          endocrineDisruption: 5,
          reproductiveToxicity: 10,
          neurotoxicity: 8,
          carcinogenicity: 5
        }
      },
      {
        id: 'r4',
        name: 'Silicone Baby Bottle',
        category: 'Baby Products',
        effectivenessScore: 82,
        toxicologyScore: 25, // Lower is better
        overallRank: 2,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08SILIC001',
          target: 'https://target.com/p/silicone-bottle',
          walmart: 'https://walmart.com/ip/silicone-baby-bottle'
        },
        effectivenessBreakdown: {
          easeOfUse: 90,
          durability: 85,
          temperatureResistance: 90,
          portability: 85,
          easeOfCleaning: 90
        },
        toxicologyBreakdown: {
          endocrineDisruption: 20,
          reproductiveToxicity: 25,
          neurotoxicity: 22,
          carcinogenicity: 18
        }
      },
      {
        id: 'current',
        name: 'Plastic Baby Bottle',
        category: 'Baby Products',
        effectivenessScore: 76,
        toxicologyScore: 82, // Lower is better
        overallRank: 3,
        buyLinks: {
          amazon: 'https://amazon.com/dp/B08PLASTIC1',
          target: 'https://target.com/p/plastic-bottle',
          walmart: 'https://walmart.com/ip/plastic-baby-bottle'
        },
        effectivenessBreakdown: {
          easeOfUse: 85,
          durability: 70,
          temperatureResistance: 50,
          portability: 95,
          easeOfCleaning: 80
        },
        toxicologyBreakdown: {
          endocrineDisruption: 88,
          reproductiveToxicity: 75,
          neurotoxicity: 60,
          carcinogenicity: 70
        }
      }
    ],
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

