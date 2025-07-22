import { createLazyFileRoute } from '@tanstack/react-router'
import { OrganizationPage } from '@/components/pages/Organization/OrganizationPage'

export const Route = createLazyFileRoute('/organization')({
  component: OrganizationPage,
})
