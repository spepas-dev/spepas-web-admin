import { motion } from 'framer-motion';
import { ChevronRight, Filter, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toastConfig } from '@/lib/toast';

import { useOrderDetails } from '../bids/api/queries/orderDetailsQueries';
import { OrderDetailsFilter } from './components/orderDetailsFilter';
import { OrderDetailsTable } from './components/orderDetailsTable';
import { OrderDetails } from './types';

export default function OrderDetailsPage() {
  const { partId } = useParams<{ partId: string }>();
  const [filteredOrders, setFilteredOrders] = useState<OrderDetails[]>([]);
  const [filters, setFilters] = useState({
    brand: '',
    seller: '',
    gopa: '',
    date: ''
  });

  // Fetch order details
  const { data, isLoading, isError } = useOrderDetails(partId || '');
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  useEffect(() => {
    if (data) {
      setOrders(data.data);
      setFilteredOrders(data.data);
    }

    return () => {
      setOrders([]);
      setFilteredOrders([]);
    };
  }, [data?.data]);

  // Apply filters
  useEffect(() => {
    let result = [...orders];

    if (filters.brand) {
      result = result.filter((order) =>
        order.orderRequest.sparePart.carModel.carBrand.name.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.seller) {
      result = result.filter((order) => order.seller.storeName.toLowerCase().includes(filters.seller.toLowerCase()));
    }

    if (filters.gopa) {
      result = result.filter((order) => order.gopa.name.toLowerCase().includes(filters.gopa.toLowerCase()));
    }

    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredOrders(result);
  }, [filters, orders]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: Package,
      description: 'All orders for this part',
      trend: '+5.2%',
      trendUp: true
    },
    {
      title: 'Filtered Orders',
      value: filteredOrders.length,
      icon: Filter,
      description: 'Orders matching filters',
      trend: `${Math.round((filteredOrders.length / orders.length) * 100)}%`,
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
    return <div>Error loading order details</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/orders" className="hover:text-[#4A36EC]">
          Orders
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/bids" className="hover:text-[#4A36EC]">
          Bids
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Order Details</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">
            {orders.length > 0 ? orders[0].orderRequest.sparePart.name : 'Part Details'}
          </h1>
          <p className="text-sm text-gray-600">View and manage orders for this spare part</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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

      {/* Filter Component */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <OrderDetailsFilter filters={filters} onFilterChange={handleFilterChange} />
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <OrderDetailsTable orders={filteredOrders} />
      </motion.div>
    </div>
  );
}
