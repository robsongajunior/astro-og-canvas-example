import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const paths = process.env.SKIP_OG ? [] : await getCollection('[astro collection name]');
const pages = Object.fromEntries(paths.map(({ id, slug, data }) => [id, { slug, data }]));

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'path',
  pages,
  getImageOptions: async (_, { slug, data }) => {
    return {
      title: (data.title.length > 48) ? `${data.title.substr(0, 48)}...` : data.title,
      description: (data.description.length) > 172 ? `${data.description.substr(0, 172)}...` : data.description,
      logo: {
        path: 'path/to/image.png',
        size: [200]
      },
      border: {
        color: [243, 101, 43],
        width: 4,
        side: 'inline-start'
      },
      bgGradient: [
        [13, 13, 13],
        [30, 30, 30]
      ],
      font: {
        title: {
          size: 78,
          families: ['Roboto'],
          weight: 'Bold'
        },
        description: {
          size: 45,
          lineHeight: 1.25,
          families: ['Roboto'],
          weight: 'Normal'
        }
      },
      fonts: [
        'https:/path/to/font-bold.ttf',
        'https:/path/to/font-regular.ttf',
      ]
    }
  }
});
