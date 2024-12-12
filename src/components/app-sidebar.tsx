import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const navigationData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#getting-started",
      items: [
        {
          title: "Installation",
          url: "#installation",
        },
        {
          title: "Configuration",
          url: "#configuration",
        },
      ],
    },
    {
      title: "Features",
      url: "#features",
      items: [
        {
          title: "Authentication",
          url: "#authentication",
        },
        {
          title: "Email Verification",
          url: "#email-verification",
        },
        {
          title: "Password Reset",
          url: "#password-reset",
        },
        {
          title: "Role-Based Access",
          url: "#role-based-access",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#api-reference",
      items: [
        {
          title: "Authentication APIs",
          url: "#authentication-apis",
        },
        {
          title: "User APIs",
          url: "#user-apis",
        },
        {
          title: "Protected Routes",
          url: "#protected-routes",
        },
      ],
    },
    {
      title: "Deployment",
      url: "#deployment",
      items: [
        {
          title: "Environment Setup",
          url: "#environment-setup",
        },
        {
          title: "Production Build",
          url: "#production-build",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navigationData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
