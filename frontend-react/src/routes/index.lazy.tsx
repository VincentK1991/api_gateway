import { createLazyFileRoute } from '@tanstack/react-router'
import { IconHome, IconUser, IconShield, IconBuilding } from '@tabler/icons-react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-500 rounded-full">
              <IconHome className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
              Welcome
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Navigate to different sections using the floating dock below
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <IconUser className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              User Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access your personal dashboard, manage your profile, and view your activity.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-500 rounded-full">
                <IconShield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Admin Panel
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage users, monitor system performance, and configure administrative settings.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-500 rounded-full">
                <IconBuilding className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Organization
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View organizational structure, manage teams, and access company resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
