import { IconUser } from "@tabler/icons-react";

export function UserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <IconUser className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              User Dashboard
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Profile Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your personal information and account settings.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Activity Log
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              View your recent activities and system interactions.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Preferences
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Customize your experience and notification settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
