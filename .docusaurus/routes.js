import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/my-markdown-page',
    component: ComponentCreator('/my-markdown-page', '438'),
    exact: true
  },
  {
    path: '/my-react-page',
    component: ComponentCreator('/my-react-page', 'f2d'),
    exact: true
  },
  {
    path: '/table-distribution',
    component: ComponentCreator('/table-distribution', 'e3d'),
    exact: true
  },
  {
    path: '/table-grades',
    component: ComponentCreator('/table-grades', 'c16'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e0a'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '325'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '36e'),
            routes: [
              {
                path: '/docs/hello',
                component: ComponentCreator('/docs/hello', '847'),
                exact: true,
                sidebar: "Sidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'fd5'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
