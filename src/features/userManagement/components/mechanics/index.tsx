import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, Wrench, MapPin, Store, Users } from "lucide-react"
import { MechanicDialog } from "./mechanicDialog"
import { MechanicTable } from "./mechanicTable"
import { MechanicMap } from "./mechanicMap"
import { Card, CardContent } from "@/components/ui/card"

export interface Mechanic {
  shop_name: string
  longitude: number
  latitude: number
  address: string
  User_ID: string
}

export default function MechanicsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mechanics, setMechanics] = useState<Mechanic[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAddMechanics = async (newMechanics: Mechanic[]) => {
    try {
      // Handle API call here
      console.log(newMechanics)
      setMechanics([...mechanics, ...newMechanics])
      setIsDialogOpen(false)
      setError(null)
    } catch (err) {
      setError('Failed to add mechanics')
      console.error(err)
    }
  }

  const stats = [
    {
      title: "Total Mechanics",
      value: mechanics.length,
      icon: Wrench,
      description: "Registered mechanic shops",
      trend: "+2.5%",
      trendUp: true
    },
    {
      title: "Active Locations",
      value: mechanics.length,
      icon: MapPin,
      description: "Service locations",
      trend: "+1.8%",
      trendUp: true
    },
    {
      title: "Shop Types",
      value: "12",
      icon: Store,
      description: "Different specializations",
      trend: "+3.2%",
      trendUp: true
    },
    {
      title: "Service Areas",
      value: new Set(mechanics.map(m => m.address.split(',').pop()?.trim())).size,
      icon: Users,
      description: "Areas covered",
      trend: "+0.9%",
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
        <span className="text-[#4A36EC] font-medium">Mechanics</span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Mechanic Shops</h1>
          <p className="text-sm text-gray-600">
            Manage mechanic shops and their locations
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Mechanic Shop
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
          <MechanicMap 
            mechanics={mechanics}
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
          <MechanicTable 
            mechanics={mechanics}
            onLocationSelect={setSelectedLocation}
          />
        </motion.div>
      </div>

      {/* Show error if exists */}
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <MechanicDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddMechanics}
        selectedLocation={selectedLocation}
      />
    </div>
  )
} 