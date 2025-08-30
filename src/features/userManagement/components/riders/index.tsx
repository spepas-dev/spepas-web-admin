import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Bike, IdCard, MapPin, Plus, Users } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';

import { useCreateRider } from '../../api/mutations/riders.mutations';
import { useGetRiderList } from '../../api/queries/riders.queries';
import { CreateRiderDTO, Rider } from '../../types/riders.types';
import { NewRiders } from './newRiders';

export default function RidersPage() {
  const { data, isLoading } = useGetRiderList();
  console.log(data);
  const riders = useMemo(() => data?.data || [], [data?.data]);
  const columns = useMemo(
    (): ColumnDef<Rider>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => <div>{row.original.name}</div>
      },
      {
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
        cell: ({ row }) => <div>{row.original.phoneNumber}</div>
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Verification Status',
        accessorKey: 'verificationStatus',
        cell: ({ row }) => (
          <span
            className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              row.original.verificationStatus === 1
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            )}
          >
            {row.original.verificationStatus === 1 ? 'Verified' : 'Unverified'}
          </span>
        )
      },
      {
        header: 'Date Added',
        accessorKey: 'createdAt',
        cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
      }
    ],
    []
  );

  const formModal = useFormModal();
  const handleAddRider = () => {
    formModal.openForm({
      title: 'Add New Rider',
      children: <NewRiders onSubmit={handleSubmitRider} loading={false} />,
      showFooter: false
    });
  };

  const { mutateAsync: createRider, isPending: isCreatingRider } = useCreateRider();
  const handleSubmitRider = async (riderData: CreateRiderDTO) => {
    try {
      const response = await createRider(riderData);
      toastConfig.success(`${response.data.name} created successfully `);
      formModal.close();
    } catch {
      toastConfig.error('Failed to create rider');
    }
  };

  const stats = [
    {
      title: 'Total Riders',
      value: riders.length,
      Icon: Bike,
      description: 'Registered riders',
      trend: '+2.8%',
      trendUp: true
    },
    {
      title: 'Active Locations',
      value: riders.length,
      Icon: MapPin,
      description: 'Service areas',
      trend: '+1.9%',
      trendUp: true
    },
    {
      title: 'License Types',
      // value: new Set(riders.map((r) => r.licenseNumber?.split('-')[0])).size,
      value: 0,
      Icon: IdCard,
      description: 'Different categories',
      trend: '+3.1%',
      trendUp: true
    },
    {
      title: 'Service Areas',
      value: '8',
      Icon: Users,
      description: 'Coverage zones',
      trend: '+2.4%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Riders')} />

      {/* Header */}
      <PageHeader
        title="Delivery Riders"
        description="Manage delivery riders and their locations"
        actions={
          <Button onClick={handleAddRider} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Rider
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={riders}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
