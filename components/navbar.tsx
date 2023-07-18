import { UserButton } from "@clerk/nextjs"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { OrganizationSwitcher } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <h1 className="text-sm font-semibold">
            Complete Consulting Dashboard
          </h1>
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <OrganizationSwitcher
            appearance={{
              elements: {
                organizationSwitcherTrigger: "text-black dark:text-white",
              },
            }}
          />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
