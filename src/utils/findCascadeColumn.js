export default function findCascadeColumn(columns) {
  if (!columns) return;
  columns.forEach(column => {
    const parentKey = column.getParentKey();
    if (parentKey) {
      const parentColumn = columns.find(c => c.getKey() === parentKey);
      if (parentColumn) {
        // eslint-disable-next-line no-param-reassign
        column.parentColumn = parentColumn;

        parentColumn.childColumn = (parentColumn.childColumn || []).concat(
          column
        );
      }
    }
  });
}
