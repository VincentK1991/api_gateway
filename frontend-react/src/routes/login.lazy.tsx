import { createLazyFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@/components/pages/Login/LoginPage'

export const Route = createLazyFileRoute('/login')({
  component: LoginPage,
})
