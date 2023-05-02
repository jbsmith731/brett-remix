/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  tailwind: true,
  future: {
    v2_normalizeFormMethod: true,
    v2_errorBoundary: true,
    v2_routeConvention: true,
  },
};
