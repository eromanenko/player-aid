import { XMLParser } from 'fast-xml-parser';

export interface BggData {
  id: number;
  thumbnail: string;
  rating: number;
}

export async function getBggData(ids: number[]): Promise<Record<number, BggData>> {
  if (!ids || ids.length === 0) return {};

  const idString = ids.join(',');
  const url = `https://boardgamegeek.com/xmlapi2/thing?id=${idString}&stats=1`;

  try {
    const res = await fetch(url, { 
      next: { revalidate: 86400 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      // API is returning 401 due to Cloudflare/Auth, silently fail and return empty data
      return {};
    }
    const xmlData = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const result = parser.parse(xmlData);

    const items = result.items?.item;
    if (!items) return {};

    const itemsArray = Array.isArray(items) ? items : [items];
    const dataMap: Record<number, BggData> = {};

    itemsArray.forEach((item: any) => {
      const id = parseInt(item['@_id'], 10);
      const thumbnail = item.thumbnail || '';
      const averageRating = item.statistics?.ratings?.average?.['@_value'] || 0;
      
      dataMap[id] = {
        id,
        thumbnail,
        rating: parseFloat(averageRating),
      };
    });

    return dataMap;
  } catch (error) {
    console.error("Failed to fetch BGG data:", error);
    return {};
  }
}
