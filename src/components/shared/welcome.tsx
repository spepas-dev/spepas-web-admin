import { motion } from "framer-motion"
import { 
  Users, 
  Bike, 
  Car, 
  Wallet, 
  ArrowRight, 
  Activity,
  UserCheck
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stats = [
  {
    title: "Total Users",
    value: "2,345",
    trend: "+12.5%",
    trendUp: true,
    icon: Users,
    description: "Active platform users",
    color: "text-blue-500"
  },
  {
    title: "Active Riders",
    value: "856",
    trend: "+8.2%",
    trendUp: true,
    icon: Bike,
    description: "Registered riders",
    color: "text-green-500"
  },
  {
    title: "Registered Vehicles",
    value: "1,204",
    trend: "+15.3%",
    trendUp: true,
    icon: Car,
    description: "Fleet size",
    color: "text-purple-500"
  },
  {
    title: "Payment Methods",
    value: "3,678",
    trend: "+10.8%",
    trendUp: true,
    icon: Wallet,
    description: "Active accounts",
    color: "text-orange-500"
  }
]

const quickActions = [
  {
    title: "User Management",
    description: "Manage users, roles, and permissions",
    icon: UserCheck,
    path: "/user-management",
    color: "bg-[#4A36EC]"
  },
  {
    title: "Vehicle Registry",
    description: "Register and manage vehicles",
    icon: Car,
    path: "/vehicles",
    color: "bg-[#F5B127]"
  },
  {
    title: "Rider Operations",
    description: "Monitor rider activities and routes",
    icon: Bike,
    path: "/riders",
    color: "bg-[#22C55E]"
  },
  {
    title: "Payment Records",
    description: "Handle payment records",
    icon: Wallet,
    path: "/payments",
    color: "bg-[#EC4899]"
  }
]

const activityItems = [
  {
    title: "New Rider Registration",
    time: "2 minutes ago",
    description: "John Doe completed registration process",
    icon: UserCheck
  },
  {
    title: "Vehicle Added",
    time: "15 minutes ago",
    description: "New vehicle registered to fleet",
    icon: Car
  },
  {
    title: "Payment Method Updated",
    time: "1 hour ago",
    description: "Mobile money account added",
    icon: Wallet
  }
]

export default function WelcomePage() {
//   const navigate = useNavigate()

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold text-[#4A36EC]">
          Welcome Back, Stephen!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your platform today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border border-gray-200 hover:border-[#4A36EC] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                  </div>
                  <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
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
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group"
            //   onClick={() => navigate(action.path)}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className={`${action.color} p-3 rounded-lg w-fit`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4A36EC]">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {action.description}
                    </p>
                  </div>
                  <div className="flex items-center text-[#4A36EC] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            {activityItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-start space-x-4 ${
                  index !== activityItems.length - 1 ? 'pb-4 mb-4 border-b' : ''
                }`}
              >
                <div className="bg-[#4A36EC]/10 p-2 rounded-lg">
                  <item.icon className="w-5 h-5 text-[#4A36EC]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Platform Performance</h2>
          <Button variant="outline" className="text-[#4A36EC] hover:bg-[#4A36EC]/10">
            <Activity className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              Chart Component Goes Here
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
