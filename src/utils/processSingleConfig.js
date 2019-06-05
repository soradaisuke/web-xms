export default function processSingleConfig({ config, path }) {
  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@')
  };
}
