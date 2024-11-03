'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowVirtualizer,
  type MRT_SortingState,
} from 'material-react-table';
import { useEffect, useRef, useState } from 'react';

type TableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  loading?: boolean;
};

function Table<T extends MRT_RowData>({
  columns,
  data,
  loading,
}: TableProps<T>) {
  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    onSortingChange: setSorting,
    state: { isLoading: loading, sorting },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
    enableRowActions: true,
    positionActionsColumn: 'last',
    displayColumnDefOptions: {
      'mrt-row-actions': {
        size: 110, //if using layoutMode that is not 'semantic', the columns will not auto-size, so you need to set the size manually
        grow: false,
      },
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        {/* <Link href={`/users/${row.id}/update`}> */}
        <IconButton
          onClick={() => {
            table.setEditingRow(row);
            console.log(row.original.id);
            console.log(table);
          }}
        >
          <EditIcon />
        </IconButton>
        {/* </Link> */}
        <IconButton
          onClick={() => {
            console.log('delete clicked');
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
