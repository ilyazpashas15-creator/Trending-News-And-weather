import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://myweatherapp.com';
  const now = new Date();

  const routes = [
    '',
    '/weather',
    '/weather/5day',
    '/weather/hourly',
    '/weather/maps',
    '/news/world',
    '/news/breaking',
    '/news/local',
    '/news/weather',
    '/world-clock',
    '/time-zones/all',
    '/calendar/monthly',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route.startsWith('/weather') || route.startsWith('/news') ? 'hourly' : 'daily',
    priority: route === '' ? 1.0 : route.startsWith('/weather') || route.startsWith('/news') ? 0.9 : 0.7,
  }));
}
