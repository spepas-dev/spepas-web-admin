import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Menu, Settings, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/custom';
import { Breadcrumb } from '@/components/ui/custom/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ROUTE_PATHS } from '@/config/routes.config';
import { useGetApplications } from '@/features/accessManagement/api/queries/applications.queries';
import { cn } from '@/lib/utils';

// import { useGetApplication } from '../../../api/queries/applications.queries';
import { Application } from '../../../types/application.types';
import { ApplicationGroups } from './application-groups';
import { ApplicationInfo } from './application-info';
import { ApplicationMenus } from './application-menus';

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  // applications list
  const { data: applicationsData, isLoading: isApplicationsLoading } = useGetApplications();
  const applications = useMemo(() => {
    return applicationsData?.data;
  }, [applicationsData?.data]);

  // Dummy data for development
  const isLoading = isApplicationsLoading;
  const application: Application = useMemo(() => {
    return applications?.find((app) => app.application_id === applicationId);
  }, [applications, applicationId]);

  const breadcrumbItems = useMemo(() => {
    return [
      { label: 'Access Management', href: `/${ROUTE_PATHS.ACCESS_MANAGEMENT.BASE}` },
      { label: 'Applications', href: `/${ROUTE_PATHS.ACCESS_MANAGEMENT.BASE}/${ROUTE_PATHS.ACCESS_MANAGEMENT.APPLICATION.BASE}` },
      { label: application?.name || 'Application Details', href: '#' }
    ];
  }, [application?.name]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A36EC]"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Application not found</h2>
        <Button onClick={() => navigate(`/${ROUTE_PATHS.ACCESS_MANAGEMENT.BASE}/${ROUTE_PATHS.ACCESS_MANAGEMENT.APPLICATION.BASE}`)}>
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            {application.name}
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                application.status === 1
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', application.status === 1 ? 'bg-green-400' : 'bg-red-400')} />
              {application.status === 1 ? 'Active' : 'Inactive'}
            </span>
          </div>
        }
        description="Application Details & Management"
      />

      {/* Application Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#4A36EC]" />
            Application Overview
          </CardTitle>
          <CardDescription>Manage application details, menus, and group assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Application ID</p>
              <p className="text-sm text-gray-900 font-mono">{application.application_id}</p>
            </div> */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="text-sm text-gray-900">{new Date(application.dateAdded).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-sm text-gray-900">{application.description || 'No description provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Application Info
          </TabsTrigger>
          <TabsTrigger value="menus" className="flex items-center gap-2">
            <Menu className="w-4 h-4" />
            Menus
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <ApplicationInfo application={application} />
        </TabsContent>

        <TabsContent value="menus" className="space-y-6">
          <ApplicationMenus applicationId={application.application_id} />
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <ApplicationGroups applicationId={application.application_id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationDetail;
