import { motion } from 'framer-motion';
import { Package, Tag, Users } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, PageHeader } from '@/components/ui/custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AssignedRequest from './assignedRequest';
import UnassignedRequest from './unassignedRequest';

// Mock data for request stats - replace with actual API call
const mockRequestStats = {
  totalAssignedRequests: 156,
  totalUnassignedRequests: 43,
  pendingRequests: 89,
  completedRequests: 67
};

export default function RequestsPage() {
  const { id } = useParams();
  console.log('Gopa ID:', id); // TODO: Use gopaId for API calls
  const [activeTab, setActiveTab] = useState('assigned');

  const stats = [
    {
      title: 'Assigned Requests',
      value: mockRequestStats.totalAssignedRequests,
      Icon: Tag,
      description: 'Currently assigned to this gopa',
      trend: '+8.3%',
      trendUp: true
    },
    {
      title: 'Unassigned Requests',
      value: mockRequestStats.totalUnassignedRequests,
      Icon: Package,
      description: 'Available for assignment',
      trend: '-2.1%',
      trendUp: false
    },
    {
      title: 'Pending Requests',
      value: mockRequestStats.pendingRequests,
      Icon: Users,
      description: 'Awaiting processing',
      trend: '+5.2%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={BreadcrumbPatterns.fourTier(
          'Order Management',
          '/order-management/orders',
          'Gopas',
          '/order-management/orders/gopas',
          'Requests'
        )}
      />

      {/* Header */}
      <PageHeader title="Gopa Requests" description="Manage assigned and unassigned requests for this gopa" />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Requests Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A36EC]">Request Management</CardTitle>
            <CardDescription>View and manage assigned and unassigned requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="assigned" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  Assigned Requests ({mockRequestStats.totalAssignedRequests})
                </TabsTrigger>
                <TabsTrigger value="unassigned" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  Unassigned Requests ({mockRequestStats.totalUnassignedRequests})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="assigned" className="space-y-4">
                <div className="border rounded-lg p-4 bg-blue-50/50">
                  <h3 className="text-sm font-medium text-[#4A36EC] mb-2">Assigned Requests</h3>
                  <p className="text-xs text-muted-foreground mb-4">Requests currently assigned to this gopa for processing</p>
                  <AssignedRequest />
                </div>
              </TabsContent>

              <TabsContent value="unassigned" className="space-y-4">
                <div className="border rounded-lg p-4 bg-orange-50/50">
                  <h3 className="text-sm font-medium text-[#F59E0B] mb-2">Unassigned Requests</h3>
                  <p className="text-xs text-muted-foreground mb-4">Requests available for assignment to this gopa</p>
                  <UnassignedRequest />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
