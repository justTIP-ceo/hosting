import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/hosting/markdown-page',
    component: ComponentCreator('/hosting/markdown-page', '52e'),
    exact: true
  },
  {
    path: '/hosting/my-markdown-page',
    component: ComponentCreator('/hosting/my-markdown-page', '16a'),
    exact: true
  },
  {
    path: '/hosting/my-react-page',
    component: ComponentCreator('/hosting/my-react-page', 'e2d'),
    exact: true
  },
  {
    path: '/hosting/past-deadlines',
    component: ComponentCreator('/hosting/past-deadlines', '088'),
    exact: true
  },
  {
    path: '/hosting/table-distribution',
    component: ComponentCreator('/hosting/table-distribution', '71e'),
    exact: true
  },
  {
    path: '/hosting/table-grades',
    component: ComponentCreator('/hosting/table-grades', '536'),
    exact: true
  },
  {
    path: '/hosting/tip',
    component: ComponentCreator('/hosting/tip', '9bd'),
    exact: true
  },
  {
    path: '/hosting/typicalcalculation',
    component: ComponentCreator('/hosting/typicalcalculation', '000'),
    exact: true
  },
  {
    path: '/hosting/docs',
    component: ComponentCreator('/hosting/docs', '203'),
    routes: [
      {
        path: '/hosting/docs',
        component: ComponentCreator('/hosting/docs', '27c'),
        routes: [
          {
            path: '/hosting/docs',
            component: ComponentCreator('/hosting/docs', 'f7a'),
            routes: [
              {
                path: '/hosting/docs/hello',
                component: ComponentCreator('/hosting/docs/hello', '08d'),
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
    path: '/hosting/',
    component: ComponentCreator('/hosting/', 'd85'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
