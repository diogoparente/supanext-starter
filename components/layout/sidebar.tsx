// components/layout/sidebar.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { useState } from "react";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative min-h-screen border-r transition-all duration-300 mr-4",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-2 z-10 rounded-md border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeftIcon
          className={cn("h-4 w-4 transition-all", isCollapsed && "rotate-180")}
        />
      </Button>

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2
            className={cn(
              "mb-2 px-4 text-lg font-semibold transition-all",
              isCollapsed && "hidden"
            )}
          >
            Dashboard
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <HomeIcon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Home</span>}
            </Button>

            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <UserIcon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Profile</span>}
            </Button>

            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}
            >
              <SettingsIcon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Settings</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
