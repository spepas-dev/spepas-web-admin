import { motion } from 'framer-motion';
import { Building2, Car, ChevronRight, Factory, Plus, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toastConfig } from '@/lib/toast';

import { useCreateBrand } from '../../api/mutations/brandMutations';
import { useBrands } from '../../api/queries/brandsQueries';
import { Brand, CreateBrandDTO } from '../../types';
import { BrandDialog } from './brandDialog';
import { BrandTable } from './brandTable';

export default function BrandsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // brands related code
  const { data, isLoading, isError } = useBrands();
  const [brands, setBrands] = useState<Brand[]>([]);

  // Move all useEffect hooks to the top before any conditional returns
  useEffect(() => {
    if (data) {
      setBrands(data.data);
    }

    return () => {
      setBrands([]);
    };
  }, [data?.data]);

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
      icon: Building2,
      description: 'Active brands in the system',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Manufacturers',
      value: new Set(brands.map((b) => b.manufacturer_ID)).size,
      icon: Factory,
      description: 'Associated manufacturers',
      trend: '+1.8%',
      trendUp: true
    },
    {
      title: 'Car Brands',
      value: brands.filter((b) => b.type === 'CAR').length,
      icon: Car,
      description: 'Passenger vehicle brands',
      trend: '+3.4%',
      trendUp: true
    },
    {
      title: 'Brand Types',
      value: new Set(brands.map((b) => b.type)).size,
      icon: Tags,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                </div>
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <stat.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">{stat.description}</p>
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <BrandTable brands={brands} />
      </motion.div>

      <BrandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddBrands} />
    </div>
  );
}
