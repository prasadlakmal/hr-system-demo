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
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

type TableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  onDeleteClick?: (id: string) => void;
  rowCount: number;
  pagination: Pagination;
  setPagination: Dispatch<SetStateAction<Pagination>>;
};

function Table<T extends MRT_RowData>({
  columns,
  data,
  loading,
  onDeleteClick,
  rowCount = 0,
  pagination,
  setPagination,
}: TableProps<T>) {
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data,
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: true,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enableColumnPinning: true,
    enableRowVirtualization: true,
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    onSortingChange: setSorting,
    state: { isLoading: loading, sorting, pagination },
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        size: 110,
        grow: false,
      },
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
        <Link href={`/users/${row.original.id}/update`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton onClick={() => onDeleteClick?.(row.original.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: rowCount,
  });

  return <MaterialReactTable table={table} />;
}

export default Table;
