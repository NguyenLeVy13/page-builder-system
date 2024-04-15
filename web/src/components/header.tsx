import Navigation from "./navigation"

// Icons
import {
  Search,
} from "lucide-react"

// Shadcn UI components
import { Input } from "@/components/ui/input"
import AccountDropdown from "./account-dropdown"

function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6" style={{
      zIndex: 40
    }}>
      <Navigation />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <AccountDropdown />
      </div>
    </header>
  );
}

export default Header;
