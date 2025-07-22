import { IconBuilding } from "@tabler/icons-react";

export function OrganizationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500 rounded-full">
              <IconBuilding className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Organization Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Company Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage organization information, branding, and public profile.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Team Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Organize teams, departments, and employee hierarchies.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Policies & Procedures
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Define organizational policies and standard procedures.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View organizational metrics, performance, and insights.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Resource Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage organizational resources, assets, and allocations.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Compliance
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Track regulatory compliance and organizational standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
