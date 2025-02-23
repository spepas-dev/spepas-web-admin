import { Car, Wrench, GlassWater, Battery } from "lucide-react";
import { MenuGroup } from "../../types/MenuItem";


export const menuGroups: MenuGroup[] = [
    {
      id: 'vehicles',
      title: 'Vehicle Categories',
      items: [
        {
          id: 'passenger',
          name: 'Passenger Vehicles',
          icon: Car,
          path: '/vehicles/passenger',
          children: [
            {
              id: 'sedans',
              name: 'Sedans',
              path: '/vehicles/passenger/sedans',
              count: 124,
              children: [
                { 
                  id: 'compact', 
                  name: 'Compact Sedans', 
                  path: '/vehicles/passenger/sedans/compact',
                  count: 45, 
                  
                },
                { 
                  id: 'midsize', 
                  name: 'Midsize Sedans', 
                  path: '/vehicles/passenger/sedans/midsize',
                  count: 42 
                },
                { 
                  id: 'luxury', 
                  name: 'Luxury Sedans', 
                  path: '/vehicles/passenger/sedans/luxury',
                  count: 37,
                  permissions: 'premium',
                  children: [
                    {
                      id: 'sedan',
                      name: 'Sedan',
                      path: '/vehicles/passenger/sedans/luxury/sedan',
                    }
                  ]
                }
              ]
            },
            {
              id: 'suvs',
              name: 'SUVs',
              path: '/vehicles/passenger/suvs',
              count: 87,
              children: [
                { 
                  id: 'compact-suv', 
                  name: 'Compact SUVs', 
                  path: '/vehicles/passenger/suvs/compact',
                  count: 28 
                },
                { 
                  id: 'midsize-suv', 
                  name: 'Midsize SUVs', 
                  path: '/vehicles/passenger/suvs/midsize',
                  count: 34 
                },
                { 
                  id: 'full-suv', 
                  name: 'Full-size SUVs', 
                  path: '/vehicles/passenger/suvs/full',
                  count: 25,
                  permissions: 'premium' 
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'parts',
      title: 'Parts & Components',
      items: [
        {
          id: 'engine',
          name: 'Engine Components',
          icon: Wrench,
          path: '/parts/engine',
          children: [
            {
              id: 'filters',
              name: 'Filters',
              path: '/parts/engine/filters',
              count: 45,
              children: [
                { 
                  id: 'air-filters', 
                  name: 'Air Filters', 
                  path: '/parts/engine/filters/air',
                  count: 18 
                },
                { 
                  id: 'oil-filters', 
                  name: 'Oil Filters', 
                  path: '/parts/engine/filters/oil',
                  count: 15 
                },
                { 
                  id: 'fuel-filters', 
                  name: 'Fuel Filters', 
                  path: '/parts/engine/filters/fuel',
                  count: 12,
                  permissions: 'dealer' 
                }
              ]
            },
            {
              id: 'fluids',
              name: 'Fluids & Chemicals',
              icon: GlassWater,
              path: '/parts/fluids',
              children: [
                { 
                  id: 'oils', 
                  name: 'Motor Oils', 
                  path: '/parts/fluids/oils',
                  count: 67 
                },
                { 
                  id: 'transmission', 
                  name: 'Transmission Fluid', 
                  path: '/parts/fluids/transmission',
                  count: 22 
                },
                { 
                  id: 'coolant', 
                  name: 'Coolant', 
                  path: '/parts/fluids/coolant',
                  count: 18 
                }
              ]
            },
            {
              id: 'electrical',
              name: 'Electrical Systems',
              icon: Battery,
              path: '/parts/electrical',
              children: [
                { 
                  id: 'batteries', 
                  name: 'Batteries & Power', 
                  path: '/parts/electrical/batteries',
                  count: 54 
                },
                { 
                  id: 'alternators', 
                  name: 'Alternators', 
                  path: '/parts/electrical/alternators',
                  count: 29,
                  permissions: 'dealer' 
                }
              ]
            }
          ]
        }
      ]
    }
  ];