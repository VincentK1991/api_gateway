import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconUser,
  IconShield,
  IconBuilding,
  IconHome,
  IconLogout,
} from "@tabler/icons-react";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export function DockBar() {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "User",
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/user",
    },
    {
      title: "Admin",
      icon: <IconShield className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/admin",
    },
    {
      title: "Organization",
      icon: <IconBuilding className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/organization",
    },
  ];

  const handleSignOut = () => {
    signOut();
    navigate({ to: '/login' });
  };

  const allItems = [
    ...navigationItems,
    {
      title: "Sign Out",
      icon: <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
      onClick: handleSignOut,
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <FloatingDock
        items={allItems}
        desktopClassName="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg dark:bg-neutral-900/80 dark:border-neutral-700"
        mobileClassName="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg dark:bg-neutral-900/80 dark:border-neutral-700"
      />
    </div>
  );
}
