'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { STATUS_OPTIONS } from '@/features/projects/constants/project-options';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { Project } from '../../api/types';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Project>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Project' />
    ),
    cell: ({ row }) => (
      <div className='max-w-80'>
        <p className='truncate font-medium'>{row.original.name}</p>
        <p className='text-muted-foreground truncate text-xs'>{row.original.description}</p>
      </div>
    ),
    meta: {
      label: 'Project',
      placeholder: 'Search projects...',
      variant: 'text',
      icon: Icons.search
    },
    enableColumnFilter: true
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableSorting: false,
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ cell }) => <Badge variant='outline'>{cell.getValue<Project['status']>()}</Badge>,
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: STATUS_OPTIONS
    }
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ cell }) => <Badge variant='secondary'>{cell.getValue<Project['priority']>()}</Badge>
  },
  {
    id: 'lead',
    accessorKey: 'lead',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Lead' />
    )
  },
  {
    id: 'due_date',
    accessorKey: 'due_date',
    header: ({ column }: { column: Column<Project, unknown> }) => (
      <DataTableColumnHeader column={column} title='Due Date' />
    ),
    cell: ({ cell }) => format(new Date(cell.getValue<string>()), 'MMM d, yyyy')
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
