import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Building2, Car, ChevronRight, Factory, Plus, Tags } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useGlobal } from '@/stores';
import { useStore } from '@/stores';

import { useCreateBrand } from '../../api/mutations/brandMutations';
import { useBrands } from '../../api/queries/brandsQueries';
import { Brand, CreateBrandDTO } from '../../types';
import { BrandDialog } from './brandDialog';

// Type for potential nested manufacturer data from API
interface BrandWithManufacturer extends Brand {
  manufacturer?: {
    name: string;
    Manufacturer_ID: string;
  };
}

export default function BrandsPage() {
  const { data: inventoryData, isLoading: isInventoryLoading } = useGlobal();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // brands related code
  const { data, isLoading, isError } = useBrands();

  const brands = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  // Create manufacturer lookup map for O(1) performance
  const manufacturerLookup = useMemo(() => {
    if (!inventoryData?.manufacturers) {
      return new Map();
    }

    return new Map(inventoryData.manufacturers.map((manufacturer) => [manufacturer.Manufacturer_ID, manufacturer]));
  }, [inventoryData?.manufacturers]);

  // Helper function to get manufacturer name with fallback
  const getManufacturerName = useCallback(
    (manufacturerId: string): string => {
      const manufacturer = manufacturerLookup.get(manufacturerId);
      return manufacturer?.name || manufacturerId || 'Unknown';
    },
    [manufacturerLookup]
  );

  const columns = useMemo((): ColumnDef<Brand>[] => {
    return [
      {
        header: 'Brand Name',
        accessorKey: 'name',
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>
      },
      {
        header: 'Brand Type',
        accessorKey: 'type',
        cell: ({ row }) => <span className="capitalize text-gray-600">{row.original.type.toLowerCase()}</span>
      },
      {
        header: 'Manufacturer',
        accessorKey: 'manufacturer_ID',
        cell: ({ row }) => {
          // Handle both direct manufacturer_ID and potential nested manufacturer data
          const brandWithManufacturer = row.original as BrandWithManufacturer;
          const manufacturerId = brandWithManufacturer.manufacturer_ID;
          const nestedManufacturer = brandWithManufacturer.manufacturer;
          const manufacturerName = getManufacturerName(manufacturerId);
          const isLoading = isInventoryLoading && !inventoryData?.manufacturers;
          const isUnknown = manufacturerName === manufacturerId;

          // Enhanced debug logging for development
          console.log('Debug Brand Manufacturer:', {
            brandName: row.original.name,
            manufacturerId,
            nestedManufacturer,
            fullBrandObject: row.original,
            manufacturerName,
            availableManufacturers:
              inventoryData?.manufacturers?.map((m) => ({
                id: m.Manufacturer_ID,
                name: m.name
              })) || [],
            lookupResult: manufacturerLookup.get(manufacturerId),
            manufacturerLookupSize: manufacturerLookup.size
          });

          if (isLoading) {
            return (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            );
          }

          // If nested manufacturer data exists, use it directly
          if (nestedManufacturer?.name) {
            return (
              <div className="flex flex-col">
                <span className="font-medium text-gray-900" title={nestedManufacturer.name}>
                  {nestedManufacturer.name}
                </span>
                <span className="text-xs text-gray-500">From API: {manufacturerId}</span>
              </div>
            );
          }

          if (!manufacturerId) {
            return <span className="text-gray-400">No manufacturer ID</span>;
          }

          return (
            <div className="flex flex-col">
              <span
                className={cn('font-medium', isUnknown ? 'text-amber-600' : 'text-gray-900')}
                title={isUnknown ? `ID: ${manufacturerId}` : manufacturerName}
              >
                {manufacturerName}
              </span>
              {isUnknown && <span className="text-xs text-gray-400">ID: {manufacturerId}</span>}
            </div>
          );
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
        header: 'Added On',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          try {
            const date = new Date(row.original.createdAt);
            return <span className="text-gray-600">{format(date, 'dd/MM/yyyy')}</span>;
          } catch {
            return <span className="text-gray-400">Invalid date</span>;
          }
        }
      }
    ];
  }, [getManufacturerName, isInventoryLoading, inventoryData?.manufacturers]);

  useEffect(() => {
    // Use the store's direct reference to avoid re-render issues
    const loadData = useStore.getState().actions.loadInventoryData;
    loadData();
  }, []);

  useEffect(() => {
    if (inventoryData) {
      console.log('Inventory data loaded:', {
        manufacturers: inventoryData.manufacturers?.length || 0,
        brands: inventoryData.brands?.length || 0,
        models: inventoryData.models?.length || 0
      });
    }
  }, [inventoryData]);

  //function to handle add brands
  const { mutate: createBrand } = useCreateBrand();
  const handleAddBrands = async (newBrands: CreateBrandDTO[]) => {
    // Handle API call here
    console.log(newBrands);
    createBrand(newBrands, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toastConfig.success('Brand created successfully');
      },
      onError: () => {
        setIsDialogOpen(false);
        toastConfig.error('Failed to create brand');
      }
    });
  };

  const stats = [
    {
      title: 'Total Brands',
      value: brands.length,
      Icon: Building2,
      description: 'Active brands in the system',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Manufacturers',
      value: new Set(brands.map((b) => b.manufacturer_ID)).size,
      Icon: Factory,
      description: 'Associated manufacturers',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Car Brands',
      value: brands.filter((b) => b.type === 'CAR').length,
      Icon: Car,
      description: 'Passenger vehicle brands',
      trend: '+3.4%',
      trendUp: true
    },
    {
      title: 'Brand Types',
      value: new Set(brands.map((b) => b.type)).size,
      Icon: Tags,
      description: 'Different brand categories',
      trend: '+1.2%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading brands</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/inventory" className="hover:text-[#4A36EC]">
          Inventory
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Brands</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Vehicle Brands</h1>
          <p className="text-sm text-gray-600">Manage vehicle brands and their associations</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={brands}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>

      <BrandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddBrands} />
    </div>
  );
}
