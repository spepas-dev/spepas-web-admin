import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Plus, Search, UserPlus } from 'lucide-react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useGetApplications } from '../../api/queries/applications.queries';
import { Application } from '../../types/application.types';

const ApplicationsPage = () => {
  const { data: applications, isLoading, isError } = useGetApplications();
  const applicationsData = useMemo(() => applications?.data || [], [applications?.data]);

  const columns: ColumnDef<Application>[] = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          return (
            <span
              className={cn(
                'px-2 py-1 rounded-md text-sm',
                row.original.status === 1 ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'
              )}
            >
              {row.original.status === 1 ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Created On',
        accessorKey: 'dateAdded'
      }
    ];
  }, []);
  const stats = [
    {
      title: 'Total Applications',
      value: 100,
      Icon: UserPlus,
      description: 'Total applications received',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Pending Applications',
      value: 100,
      Icon: UserPlus,
      description: 'Applications pending review',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Approved Applications',
      value: 100,
      Icon: UserPlus,
      description: 'Applications approved',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Rejected Applications',
      value: 100,
      Icon: UserPlus,
      description: 'Applications rejected',
      trend: '+3.2%',
      trendUp: true
    }
  ];
  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/finance" className="hover:text-[#4A36EC]">
          Finance
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Wallets</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Applications</h1>
          <p className="text-sm text-gray-600">Manage user applications</p>
        </div>
        {/* <div className="flex space-x-2">
          <Button onClick={() => setIsSearchDialogOpen(true)} className="bg-white hover:bg-gray-100 text-[#4A36EC] border border-[#4A36EC]">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Wallet
          </Button>
        </div> */}
      </motion.div>

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable columns={columns} data={applicationsData} loading={isLoading} />
      </motion.div>
    </div>
  );
};

export default ApplicationsPage;
