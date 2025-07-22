import { createLazyFileRoute } from '@tanstack/react-router'
import { UserPage } from '@/components/pages/User/UserPage'

export const Route = createLazyFileRoute('/user')({
  component: UserPage,
})
