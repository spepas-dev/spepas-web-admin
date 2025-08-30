import { ColumnDef } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { MapPin, Plus, ShoppingBag, Store, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreateSeller } from '../../api/mutations/sellers.mutations';
import { useGetSellerList } from '../../api/queries/sellers.queries';
import { CreateSellerDTO, Seller } from '../../types/sellers.types';
import { NewSellers } from './newSellers';
import { SellerMap } from './sellerMap';

export default function SellersPage() {
  const { data, isLoading } = useGetSellerList();
  const sellers = useMemo(() => data?.data || [], [data?.data]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const columns = useMemo(
    (): ColumnDef<Seller>[] => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Phone',
        accessorKey: 'phoneNumber'
      },
      {
        header: 'User Type',
        accessorKey: 'user_type',
        cell: ({ row }) => {
          const userType = row.original.user_type;
          return <Badge variant="outline">{String(userType.charAt(0).toUpperCase() + userType.slice(1)).replace(/_/g, ' ')}</Badge>;
        }
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
        header: 'Verified',
        accessorKey: 'verificationStatus',
        cell: ({ row }) => {
          const isVerified = row.original.verificationStatus === 1;
          return (
            <Badge
              variant={isVerified ? 'default' : 'outline'}
              className={`${isVerified ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
            >
              {isVerified ? '✓ Verified' : '✗ Unverified'}
            </Badge>
          );
        }
      }

      // {
      //   header: 'Date Added',
      //   accessorKey: 'date_added',
      //   cell: ({ row }: { row: Row<Seller> }) => <div>{format(row.original.date_added, 'dd/MM/yyyy HH:mm:ss a')}</div>
      // }
    ],
    []
  );

  const formModal = useFormModal();
  const [selectedLocationForForm, setSelectedLocationForForm] = useState<{ lat: number; lng: number } | null>(null);

  const handleAddSeller = () => {
    formModal.openForm({
      title: 'Add New Seller',
      children: <NewSellers onSubmit={handleSubmitSeller} loading={false} selectedLocation={selectedLocationForForm} />,
      showFooter: false
    });
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    setSelectedLocationForForm(location);

    // Show a toast notification with the selected coordinates
    toast.success(`Location selected: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`);
  };

  const { mutateAsync: createSeller } = useCreateSeller();
  const handleSubmitSeller = async (sellerData: CreateSellerDTO) => {
    try {
      // Handle API call here
      console.log(sellerData);
      const response = await createSeller(sellerData);
      toast.success(`${response.data.sellerDetails.storeName} created successfully`);
    } catch {
      toast.error(`Failed to create seller ${sellerData.storeName}`);
    } finally {
      formModal.close();
    }
  };

  const stats = [
    {
      title: 'Total Sellers',
      value: sellers.length,
      Icon: Store,
      description: 'Registered sellers',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Active Locations',
      value: sellers.length,
      Icon: MapPin,
      description: 'Service locations',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Assigned Gopas',
      value: new Set(sellers.map((s) => s.sellerDetails.Gopa_ID).filter(Boolean)).size,
      Icon: Users,
      description: 'Active Gopas',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'Total Products',
      value: 156,
      Icon: ShoppingBag,
      description: 'Listed products',
      trend: '+4.3%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Sellers')} />

      {/* Header */}
      <PageHeader
        title="Sellers"
        description="Manage sellers and their locations"
        actions={
          <Button onClick={handleAddSeller} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Seller
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Map and Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-4">
          <DataTable data={sellers} columns={columns} loading={isLoading} />
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden border"
        >
          <SellerMap sellers={sellers} selectedLocation={selectedLocation} onLocationSelect={handleLocationSelect} />
        </motion.div>
      </div>
    </div>
  );
}
