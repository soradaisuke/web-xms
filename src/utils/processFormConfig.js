import shortId from 'shortid';

export default function processFormConfig({ config }) {
  return {
    ...config,
    namespace: shortId.generate()
  };
}
