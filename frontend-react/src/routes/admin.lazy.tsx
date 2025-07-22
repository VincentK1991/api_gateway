import { createLazyFileRoute } from '@tanstack/react-router'
import { AdminPage } from '@/components/pages/Admin/AdminPage'

export const Route = createLazyFileRoute('/admin')({
  component: AdminPage,
})
