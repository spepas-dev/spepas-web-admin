import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Bike, MapPin, Users, IdCard } from "lucide-react"
import { RiderDialog } from "./riderDialog"
import { RiderTable } from "./riderTable"
import { RiderMap } from "./riderMap"
import { Card, CardContent } from "@/components/ui/card"

export interface Rider {
  licenseNumber: string
  longitude: number
  latitude: number
  User_ID: string
}

export default function RidersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [riders, setRiders] = useState<Rider[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddRiders = async (newRiders: Rider[]) => {
    try {
      // Handle API call here
      console.log(newRiders)
      setRiders([...riders, ...newRiders])
      setIsDialogOpen(false)
      setError(null)
    } catch (err) {
      setError('Failed to add riders')
      console.error(err)
    }
  }

  const stats = [
    {
      title: "Total Riders",
      value: riders.length,
      icon: Bike,
      description: "Registered riders",
      trend: "+2.8%",
      trendUp: true
    },
    {
      title: "Active Locations",
      value: riders.length,
      icon: MapPin,
      description: "Service areas",
      trend: "+1.9%",
      trendUp: true
    },
    {
      title: "License Types",
      value: new Set(riders.map(r => r.licenseNumber.split('-')[0])).size,
      icon: IdCard,
      description: "Different categories",
      trend: "+3.1%",
      trendUp: true
    },
    {
      title: "Service Areas",
      value: "8",
      icon: Users,
      description: "Coverage zones",
      trend: "+2.4%",
      trendUp: true
    }
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">Dashboard</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/user-management" className="hover:text-[#4A36EC]">User Management</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Riders</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Delivery Riders</h1>
          <p className="text-sm text-gray-600">
            Manage delivery riders and their locations
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Rider
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
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Map and Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden border"
        >
          <RiderMap 
            riders={riders}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4"
        >
          <RiderTable 
            riders={riders}
            onLocationSelect={setSelectedLocation}
          />
        </motion.div>
      </div>

      {/* Show error if exists */}
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <RiderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddRiders}
        selectedLocation={selectedLocation}
      />
    </div>
  )
} 