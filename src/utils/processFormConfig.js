export default function processFormConfig({ config, path }) {
  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@')
  };
}
