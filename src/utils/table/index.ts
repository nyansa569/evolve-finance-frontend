export function globalTableFilterFn(
  row: any,
  columnId: any,
  filterValues: any,
): boolean {
  const status: string = row.getValue(columnId);
  return filterValues.includes(status.toLowerCase());
}
