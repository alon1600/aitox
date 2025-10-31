import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block specific LLM/AI crawlers
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'ClaudeBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'PerplexityBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: ['/'],
      },
      {
        userAgent: 'Omgilibot',
        disallow: ['/'],
      },
      {
        userAgent: 'FacebookBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: ['/'],
      },
      {
        userAgent: 'Diffbot',
        disallow: ['/'],
      },
      {
        userAgent: 'DataForSeoBot',
        disallow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        disallow: ['/'], // Microsoft's AI search bot
      },
      {
        userAgent: 'SemrushBot',
        disallow: ['/'],
      },
      {
        userAgent: 'AhrefsBot',
        disallow: ['/'],
      },
      {
        userAgent: 'MJ12bot',
        disallow: ['/'],
      },
    ],
  };
}
