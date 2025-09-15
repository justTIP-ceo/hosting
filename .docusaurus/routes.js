import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/hosting/__docusaurus/debug',
    component: ComponentCreator('/hosting/__docusaurus/debug', 'f05'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/config',
    component: ComponentCreator('/hosting/__docusaurus/debug/config', 'f7e'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/content',
    component: ComponentCreator('/hosting/__docusaurus/debug/content', 'e7f'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/globalData',
    component: ComponentCreator('/hosting/__docusaurus/debug/globalData', '43c'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/metadata',
    component: ComponentCreator('/hosting/__docusaurus/debug/metadata', '5e7'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/registry',
    component: ComponentCreator('/hosting/__docusaurus/debug/registry', '998'),
    exact: true
  },
  {
    path: '/hosting/__docusaurus/debug/routes',
    component: ComponentCreator('/hosting/__docusaurus/debug/routes', 'bcd'),
    exact: true
  },
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
