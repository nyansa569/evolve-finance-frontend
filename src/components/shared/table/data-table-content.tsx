import { ColumnDef, flexRender, Table } from "@tanstack/react-table";


import Icons from "@/assets/svg";
import { TableCell, TableRow } from "@/components/ui/table";

import Typography from "../typography";
import { cn } from "@/utils/helpers";

type DataTableContentProps<TData, TValue> = {
  isLoading: boolean;
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
  onClickCell?: (row: TData, column: ColumnDef<TData, TValue>) => void;
};
export function DataTableContent<TData, TValue>({
  columns,
  table,
  isLoading,
  onClickCell,
}: Readonly<DataTableContentProps<TData, TValue>>) {
  if (isLoading)
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          <Icons.Loader />
        </TableCell>
      </TableRow>
    );

  if (!table.getRowModel().rows?.length)
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          <Typography>No results.</Typography>
        </TableCell>
      </TableRow>
    );

  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-secondary-50">
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          onClick={() => {
            const clickedCell = cell.column.columnDef;
            const cellHasAccessorKey = "accessorKey" in clickedCell;

            if (
              cellHasAccessorKey &&
              (clickedCell?.accessorKey as string)
                ?.toLowerCase()
                .includes("action")
            ) {
              return;
            }

            onClickCell?.(row.original, cell.column.columnDef);
          }}
          className={cn(
            onClickCell && typeof onClickCell == "function" && "cursor-pointer",
          )}
        >
          <Typography>
            {flexRender(cell.column.columnDef.cell, cell.getContext()) ?? "---"}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  ));
}
