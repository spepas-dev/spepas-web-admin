import { motion } from 'framer-motion';
import { ChevronRight, Package, Plus, Search, ShoppingCart, Tag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { Input } from '@/components/ui/input';
import { useSpareParts } from '@/features/inventoryManagement/api/queries/sparepartsQueries';

export default function BidsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: sparePartsData } = useSpareParts();

  const spareParts = useMemo(() => {
    return sparePartsData?.data.map((part) => ({
      id: part.id,
      name: part.name,
      sparePart_ID: part.SparePart_ID,
      manufacturer: part.carModel.carBrand.manufacturer.name,
      condition: 'New',
      bids: 0,
      price: part.price,
      stock: 10
    }));
  }, [sparePartsData]);

  const handleSparePartClick = (id: string) => {
    navigate(`/order-management/orders/${id}`);
  };

  const filteredParts = spareParts?.filter(
    (part) =>
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) || part.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    // part.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      title: 'Total Parts',
      value: spareParts?.length || 0,
      Icon: Package,
      description: 'Available spare parts',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Active Bids',
      value: spareParts?.reduce((sum, part) => sum + part.bids, 0) || 0,
      Icon: Tag,
      description: 'Total active bids',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Categories',
      value: [...new Set(spareParts?.map((part) => part.category))].length,
      Icon: ShoppingCart,
      description: 'Different part categories',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Manufacturers',
      value: [...new Set(spareParts?.map((part) => part.manufacturer))].length,
      Icon: Package,
      description: 'Different manufacturers',
      trend: '+3.7%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Order Management', '/order-management/orders', 'Orders')} />

      {/* Header */}
      <PageHeader
        title="Spare Parts Orders"
        description="View and manage spare parts available for bidding"
        actions={
          <div className="flex space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search spare parts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Part
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Spare Parts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredParts?.map((part) => (
          <Card
            key={part.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border border-gray-200 hover:border-[#4A36EC]"
            onClick={() => handleSparePartClick(part.sparePart_ID)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-[#4A36EC]">{part.name}</CardTitle>
                  <CardDescription>{part.manufacturer}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-[#4A36EC]/10 text-[#4A36EC]">
                  {part.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold">GHS {part.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-semibold">{part.stock} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condition:</span>
                  <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                    {part.condition}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Bids:</span>
                  <Badge variant="outline" className="border-[#4A36EC] text-[#4A36EC]">
                    {part.bids}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
