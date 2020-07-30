export default function (rowKey) {
  return (record) => {
    let key;
    switch (typeof rowKey) {
      case 'function':
        key = rowKey(record);
        break;
      case 'string':
        key = record[rowKey];
        break;
      default:
    }
    return key;
  };
}
