import { Table } from "@tanstack/react-table";
import { Cross2Icon } from "@radix-ui/react-icons";

import { TableFacetProps } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Typography from "../typography";
import { DataTableFacetedFilter } from "./data-table-facet-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  title?: string;
  table: Table<TData>;
  inputKey?: string;
  inputPlaceholder?: string;
  facetOptions?: TableFacetProps[];
  showColumnControl: boolean;
}

export function DataTableToolbar<TData>({
  table,
  title,
  inputKey,
  facetOptions,
  showColumnControl,
  inputPlaceholder = "Filter anything...",
}: Readonly<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="h-auto px-2 flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        {title && (
          <Typography typo="header-6-medium" className="">
            {title}
          </Typography>
        )}

        {showColumnControl && <DataTableViewOptions table={table} />}
      </div>

      <div className="flex gap-x-2 items-center justify-between">
        {inputKey && (
          <Input
            type="search"
            placeholder={inputPlaceholder}
            value={
              (table.getColumn(inputKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(inputKey)?.setFilterValue(event.target.value)
            }
            containerClassName="w-full sm:max-w-xs lg:w-[250px]"
          />
        )}

        <div className="flex flex-col items-center md:flex-row gap-1 md:gap-x-2">
          {facetOptions?.map(
            (option) =>
              table.getColumn(option.key) && (
                <DataTableFacetedFilter
                  key={option.key}
                  column={table.getColumn(option.key)}
                  title={option.label}
                  options={option.options}
                />
              ),
          )}

          {isFiltered && (
            <Button
              variant="table"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
