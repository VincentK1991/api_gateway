import { IconShield } from "@tabler/icons-react";

export function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500 rounded-full">
              <IconShield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage user accounts, permissions, and access controls.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              System Monitoring
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor system performance, logs, and security metrics.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Configuration
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Configure system settings and administrative policies.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Reports
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Generate and view detailed system and user reports.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage security settings, audit logs, and access controls.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Backup & Recovery
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Configure backup schedules and disaster recovery options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
