import { motion } from 'framer-motion';
import { CheckCircle, Clock, Plus, UserPlus, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { useFormModal } from '@/components/ui/custom/modals';
import { PageHeader } from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';

export interface Application {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const addApplicationModal = useFormModal();

  const handleSubmitApplication = async (applicationData: Application) => {
    try {
      // Handle application creation
      console.log('Creating application:', applicationData);

      toast.success('Application created successfully');
      setApplications([...applications, applicationData]);
      addApplicationModal.close();
    } catch (error) {
      console.error('Error creating application:', error);
      toast.error('Failed to create application. Please try again.');
    }
  };

  const handleAddApplication = () => {
    addApplicationModal.openForm({
      title: 'Create New Application',
      size: 'md',
      showFooter: false,
      children: (
        <div className="space-y-4">
          <p className="text-gray-600">Application form will be implemented here</p>
          <Button
            onClick={() =>
              handleSubmitApplication({
                id: Date.now().toString(),
                name: 'Sample Application',
                description: 'Sample description',
                status: 'pending',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              })
            }
            className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
          >
            Create Sample Application
          </Button>
        </div>
      )
    });
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      Icon: UserPlus,
      description: 'Total applications received',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Pending Applications',
      value: applications.filter((app) => app.status === 'pending').length,
      Icon: Clock,
      description: 'Applications pending review',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Approved Applications',
      value: applications.filter((app) => app.status === 'approved').length,
      Icon: CheckCircle,
      description: 'Applications approved',
      trend: '+5.4%',
      trendUp: true
    },
    {
      title: 'Rejected Applications',
      value: applications.filter((app) => app.status === 'rejected').length,
      Icon: XCircle,
      description: 'Applications rejected',
      trend: '-1.2%',
      trendUp: false
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Access Control', '/access-control', 'Applications')} />

      {/* Header */}
      <PageHeader
        title="Applications"
        description="Manage system applications and access requests"
        actions={
          <Button onClick={handleAddApplication} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Applications Table/List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
              <p className="text-sm text-gray-400 mt-2">Create your first application to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#4A36EC] transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{app.name}</h4>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          app.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationsPage;
