import crc from 'crc-32';

export default function processFormConfig({ config, path }) {
  return {
    ...config,
    namespace: crc.str(path),
  };
}
