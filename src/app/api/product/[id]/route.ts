import { NextRequest, NextResponse } from 'next/server';
import {
  ACADEMIC_STUDIES_CATALOGUE,
  getStudiesByChemical,
  getStudiesByProductCategory,
  getStudiesByDimension,
  AcademicStudy
} from '@/data/academic-studies-catalogue';

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
        preference: 'Lowest toxic risk',
        preferenceDescription: 'If you prioritize toxic profile over all other factors',
        product: {
          id: 'alt1',
          name: 'Stainless Steel Cookware Set',
          specificProduct: 'All-Clad D3 Tri-Ply Stainless Steel Cookware',
          category: 'Cookware',
          score: 15,
          improvement: 81,
          keyBenefits: [
            'No chemical coatings',
            'Most comprehensive safety profile',
            'No leaching concerns',
            'Chemically inert material'
          ],
          verified: true,
          priceRange: '$30-$150',
          availability: 'Widely available',
          imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop'
        },
        reason: 'Stainless steel is chemically inert and doesn\'t require coatings. Most comprehensive safety profile for cookware with zero toxicological concerns.',
        dimensionComparison: [
          { dimension: 'Carcinogenicity', currentScore: 85, recommendedScore: 12 },
          { dimension: 'Endocrine Disruption', currentScore: 72, recommendedScore: 15 },
          { dimension: 'Reproductive Toxicity', currentScore: 68, recommendedScore: 18 }
        ]
      },
      {
        id: 'r2',
        preference: 'Best balance',
        preferenceDescription: 'If you want non-stick convenience with minimal toxicity',
        product: {
          id: 'alt2',
          name: 'Ceramic-Coated Non-Stick Skillet',
          specificProduct: 'GreenPan Valencia Pro Ceramic Non-Stick Cookware',
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
          availability: 'Widely available',
          imageUrl: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=800&h=600&fit=crop'
        },
        reason: 'Ceramic coatings provide non-stick functionality without perfluorinated compounds. Made from natural materials like sand and minerals, offering a great balance of safety and performance.',
        dimensionComparison: [
          { dimension: 'Carcinogenicity', currentScore: 85, recommendedScore: 18 },
          { dimension: 'Endocrine Disruption', currentScore: 72, recommendedScore: 20 },
          { dimension: 'Reproductive Toxicity', currentScore: 68, recommendedScore: 22 }
        ]
      },
      {
        id: 'r3',
        preference: 'Maximum durability',
        preferenceDescription: 'If you prioritize longevity over convenience',
        product: {
          id: 'alt3',
          name: 'Cast Iron Cookware',
          specificProduct: 'Lodge Seasoned Cast Iron Skillet',
          category: 'Cookware',
          score: 20,
          improvement: 74,
          keyBenefits: [
            'Extremely durable and long-lasting',
            'No chemical coatings',
            'Excellent heat retention',
            'Can last generations with proper care'
          ],
          verified: true,
          priceRange: '$25-$120',
          availability: 'Widely available',
          imageUrl: 'https://images.unsplash.com/photo-1600172454420-38f5720c4990?w=800&h=600&fit=crop'
        },
        reason: 'Cast iron provides exceptional durability and safety. While it requires more maintenance, it offers superior longevity with no toxicological concerns.',
        dimensionComparison: [
          { dimension: 'Carcinogenicity', currentScore: 85, recommendedScore: 18 },
          { dimension: 'Endocrine Disruption', currentScore: 72, recommendedScore: 15 },
          { dimension: 'Reproductive Toxicity', currentScore: 68, recommendedScore: 20 }
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
        preference: 'Lowest toxic risk',
        preferenceDescription: 'If you prioritize safety over convenience for your baby',
        product: {
          id: 'alt3',
          name: 'Borosilicate Glass Baby Bottle',
          specificProduct: 'Evenflo Classic Glass Bottle',
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
          availability: 'Widely available',
          imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop'
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

/**
 * Convert AcademicStudy to extended citation format
 */
function formatStudyAsCitation(study: AcademicStudy) {
  return {
    id: study.id,
    title: study.title,
    authors: study.authors,
    journal: study.journal,
    year: study.year,
    doi: study.doi,
    pmid: study.pmid,
    keyFindings: study.keyFindings,
    relevanceScore: study.impactScore,
    studyType: study.studyType,
    chemicals: study.chemicals,
    toxicologicalDimensions: study.toxicologicalDimensions,
    impactScore: study.impactScore,
    isSeminal: study.isSeminal,
    methodologicalQuality: study.methodologicalQuality,
    regulatoryImpact: study.regulatoryImpact
  };
}

/**
 * Enrich dimension citations from catalogue
 */
function enrichDimensionCitations(evaluation: any): any {
  const enrichedDimensions = evaluation.dimensions?.map((dim: any) => {
    // Get existing citations (may have manual ones)
    const existingCitationIds = new Set(
      dim.citations?.map((c: any) => c.id) || []
    );

    // Get studies specific to this dimension
    const dimensionStudies = getStudiesByDimension(dim.dimension);
    
    // Also get studies for chemicals in this dimension
    const chemicalStudies: AcademicStudy[] = [];
    dim.chemicals?.forEach((chem: any) => {
      const studies = getStudiesByChemical(chem.name);
      chemicalStudies.push(...studies);
    });

    // Combine and filter to dimension-relevant studies
    const allRelevantStudies = new Map<string, AcademicStudy>();
    
    // Add dimension-specific studies
    dimensionStudies.forEach(study => {
      if (!allRelevantStudies.has(study.id)) {
        allRelevantStudies.set(study.id, study);
      }
    });

    // Add chemical-specific studies that match this dimension
    chemicalStudies.forEach(study => {
      if (
        study.toxicologicalDimensions?.includes(dim.dimension) &&
        !allRelevantStudies.has(study.id)
      ) {
        allRelevantStudies.set(study.id, study);
      }
    });

    // Merge with existing citations, prioritizing catalogue studies
    const mergedCitations: any[] = [];
    const usedIds = new Set<string>();

    // First, add existing citations (keep manual ones)
    if (dim.citations) {
      dim.citations.forEach((citation: any) => {
        // Try to find matching study in catalogue to enrich
        const matchingStudy = Array.from(allRelevantStudies.values()).find(
          s => s.id === citation.id || 
               (s.doi === citation.doi && citation.doi) ||
               (s.pmid === citation.pmid && citation.pmid)
        );

        if (matchingStudy) {
          // Enrich with catalogue data
          mergedCitations.push(formatStudyAsCitation(matchingStudy));
          usedIds.add(matchingStudy.id);
          allRelevantStudies.delete(matchingStudy.id);
        } else {
          // Keep original citation, but extend format
          mergedCitations.push({
            ...citation,
            relevanceScore: citation.relevanceScore || 75,
            impactScore: citation.relevanceScore || 75
          });
          if (citation.id) usedIds.add(citation.id);
        }
      });
    }

    // Add top catalogue studies for this dimension (not already included)
    const newStudies = Array.from(allRelevantStudies.values())
      .filter(study => !usedIds.has(study.id))
      .sort((a, b) => b.impactScore - a.impactScore)
      .slice(0, Math.max(0, 3 - mergedCitations.length)); // Up to 3 total

    newStudies.forEach(study => {
      mergedCitations.push(formatStudyAsCitation(study));
      usedIds.add(study.id);
    });

    // Sort by relevance/impact
    mergedCitations.sort((a, b) => (b.impactScore || b.relevanceScore) - (a.impactScore || a.relevanceScore));

    return {
      ...dim,
      citations: mergedCitations
    };
  });

  return {
    ...evaluation,
    dimensions: enrichedDimensions
  };
}

/**
 * Enrich product evaluation with relevant studies from the catalogue
 */
function enrichWithStudies(evaluation: any): any {
  // First, enrich dimension citations
  const evaluationWithDimensionCitations = enrichDimensionCitations(evaluation);

  // Collect IDs of studies already shown in dimension citations
  const dimensionCitationIds = new Set<string>();
  evaluationWithDimensionCitations.dimensions?.forEach((dim: any) => {
    dim.citations?.forEach((citation: any) => {
      if (citation.id) dimensionCitationIds.add(citation.id);
    });
  });

  // Collect all chemicals mentioned in the product
  const allChemicals = new Set<string>();
  evaluationWithDimensionCitations.dimensions?.forEach((dim: any) => {
    dim.chemicals?.forEach((chem: any) => {
      allChemicals.add(chem.name);
    });
  });

  // Collect all dimensions
  const allDimensions = evaluationWithDimensionCitations.dimensions?.map((d: any) => d.dimension) || [];

  // Get studies by multiple criteria - use Map for deduplication by ID
  const studyMap = new Map<string, AcademicStudy>();

  // Get studies by each chemical
  allChemicals.forEach(chemical => {
    const studies = getStudiesByChemical(chemical);
    studies.forEach(study => {
      if (!studyMap.has(study.id)) {
        studyMap.set(study.id, study);
      }
    });
  });

  // Get studies by product category
  if (evaluation.category) {
    const categoryStudies = getStudiesByProductCategory(evaluation.category);
    categoryStudies.forEach(study => {
      if (!studyMap.has(study.id)) {
        studyMap.set(study.id, study);
      }
    });
  }

  // Get studies by each dimension
  allDimensions.forEach((dimension: string) => {
    const dimensionStudies = getStudiesByDimension(dimension);
    dimensionStudies.forEach(study => {
      if (!studyMap.has(study.id)) {
        studyMap.set(study.id, study);
      }
    });
  });

  // Filter out studies already shown in dimensions, then convert to array and sort
  const researchLibrary = Array.from(studyMap.values())
    .filter(study => !dimensionCitationIds.has(study.id)) // Exclude already-shown studies
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 20); // Limit to top 20 most relevant studies

  // Convert AcademicStudy format to Citation format for compatibility
  const formattedStudies = researchLibrary.map(formatStudyAsCitation);

  return {
    ...evaluationWithDimensionCitations,
    researchLibrary: formattedStudies,
    researchLibraryStats: {
      totalStudies: formattedStudies.length,
      seminalStudies: formattedStudies.filter((s: any) => s.isSeminal).length,
      highImpactStudies: formattedStudies.filter((s: any) => s.impactScore >= 90).length,
      chemicalsCovered: Array.from(allChemicals),
      dimensionsCovered: allDimensions
    }
  };
}

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
    
    // Enrich with studies from catalogue
    const enrichedEvaluation = enrichWithStudies(evaluation);
    
    return NextResponse.json(enrichedEvaluation);
  } catch (error) {
    console.error('Product evaluation error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product evaluation' },
      { status: 500 }
    );
  }
}

