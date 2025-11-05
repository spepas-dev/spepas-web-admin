import { motion } from 'framer-motion';
import { Archive, Clock, Package, Users } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbPatterns, CardGrid, PageHeader } from '@/components/ui/custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AssignedHistory from './assignedHistory';
import UnassignedHistory from './unassignedHistory';

// Mock data for history stats - replace with actual API call
const mockHistoryStats = {
  totalAssignedHistory: 89,
  totalUnassignedHistory: 34,
  completedRequests: 67,
  averageCompletionTime: '2.5 days'
};

export default function HistoryPage() {
  const { id } = useParams<{ id: string }>();
  console.log('Gopa ID:', id); // TODO: Use gopaId for API calls
  const [activeTab, setActiveTab] = useState('assigned');

  const stats = [
    {
      title: 'Assigned History',
      value: mockHistoryStats.totalAssignedHistory,
      Icon: Archive,
      description: 'Completed assigned requests',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Unassigned History',
      value: mockHistoryStats.totalUnassignedHistory,
      Icon: Package,
      description: 'Historical unassigned requests',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Completed Requests',
      value: mockHistoryStats.completedRequests,
      Icon: Users,
      description: 'Successfully completed',
      trend: '+8.7%',
      trendUp: true
    },
    {
      title: 'Avg Completion Time',
      value: mockHistoryStats.averageCompletionTime,
      Icon: Clock,
      description: 'Average time to complete',
      trend: '-0.5 days',
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
          'History'
        )}
      />

      {/* Header */}
      <PageHeader title="Gopa History" description="View assigned and unassigned request history for this gopa" />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* History Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#4A36EC]">Request History</CardTitle>
            <CardDescription>View and analyze assigned and unassigned request history</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="assigned" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  Assigned History ({mockHistoryStats.totalAssignedHistory})
                </TabsTrigger>
                <TabsTrigger value="unassigned" className="data-[state=active]:bg-[#4A36EC] data-[state=active]:text-white">
                  Unassigned History ({mockHistoryStats.totalUnassignedHistory})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="assigned" className="space-y-4">
                <div className="border rounded-lg p-4 bg-green-50/50">
                  <h3 className="text-sm font-medium text-[#10B981] mb-2">Assigned History</h3>
                  <p className="text-xs text-muted-foreground mb-4">Historical records of requests assigned to this gopa</p>
                  <AssignedHistory />
                </div>
              </TabsContent>

              <TabsContent value="unassigned" className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50/50">
                  <h3 className="text-sm font-medium text-[#6B7280] mb-2">Unassigned History</h3>
                  <p className="text-xs text-muted-foreground mb-4">Historical records of unassigned requests</p>
                  <UnassignedHistory />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
