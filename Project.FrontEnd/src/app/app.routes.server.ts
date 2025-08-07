import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'genres',
  //   renderMode: RenderMode.Client //  SSR will skip this route completely
  // },
  {
    path: '**',
    renderMode: RenderMode.Prerender //  SSR enabled for all other routes
  }
];
