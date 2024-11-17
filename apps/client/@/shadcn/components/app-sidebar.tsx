import {
  Building,
  FileText,
  ListPlus,
  Settings,
  SquareKanban,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/shadcn/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/shadcn/ui/sidebar";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateTicketModal from "../../../components/CreateTicketModal";
import ThemeSettings from "../../../components/ThemeSettings";
import { useUser } from "../../../store/session";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useRouter();

  const { loading, user, fetchUserProfile } = useUser();
  const locale = user ? user.language : "en";

  const [keypressdown, setKeyPressDown] = useState(false);

  const { t, lang } = useTranslation();
  const sidebar = useSidebar();

  if (!user) {
    location.push("/auth/login");
  }

  if (location.pathname.includes("/admin") && user.isAdmin === false) {
    location.push("/");
    alert(t("common:warn.you_not_admin"));
  }

  if (user && user.external_user) {
    location.push("/portal");
  }

  const data = {
    teams: [
      {
        name: t("common:main.product_name"),
        plan: `${t("common:nav.version")}: ${process.env.NEXT_PUBLIC_CLIENT_VERSION}`,
      },
    ],
    navMain: [
      {
        title: t("_sidebar_dashboard:nav.create_ticket"),
        url: ``,
        icon: ListPlus,
        isActive: location.pathname === "/" ? true : false,
        initial: "c",
      },
      {
        title: t("_sidebar_dashboard:nav.dashboard"),
        url: `/`,
        icon: Building,
        isActive: location.pathname === "/" ? true : false,
        initial: "h",
      },
      {
        title: t("_sidebar_dashboard:nav.documents"),
        url: `/documents`,
        icon: FileText,
        isActive: location.pathname === "/documents" ? true : false,
        initial: "d",
        internal: true,
      },
      {
        title: t("_sidebar_dashboard:nav.tickets.title"),
        url: `/issues`,
        icon: SquareKanban,
        isActive: location.pathname === "/issues" ? true : false,
        initial: "t",
        items: [
          {
            title: t("_sidebar_dashboard:nav.tickets.open"),
            url: "/issues/open",
            initial: "o",
          },
          {
            title: t("_sidebar_dashboard:nav.tickets.closed"),
            url: "/issues/closed",
            initial: "f",
          },
        ],
      },
      {
        title: t("_sidebar_dashboard:nav.admin_panel"),
        url: "/admin",
        icon: Settings,
        isActive: true,
        initial: "a",
      },
    ],
  };

  function handleKeyPress(event: any) {
    const pathname = location.pathname;

    // Check for Ctrl or Meta key to bypass the shortcut handler
    if (event.ctrlKey || event.metaKey) {
      return; // Don't override browser shortcuts
    }

    if (
      document.activeElement!.tagName !== "INPUT" &&
      document.activeElement!.tagName !== "TEXTAREA" &&
      !document.activeElement!.className.includes("ProseMirror") &&
      !pathname.includes("/new")
    ) {
      switch (event.key) {
        case "c":
          setKeyPressDown(true);
          break;
        case "h":
          location.push("/");
          break;
        case "d":
          location.push("/documents");
          break;
        case "t":
          location.push("/issues");
          break;
        case "a":
          location.push("/admin");
          break;
        case "o":
          location.push("/issues/open");
          break;
        case "f":
          location.push("/issues/closed");
          break;
        case "[":
          sidebar.toggleSidebar();
          break;

        default:
          break;
      }
    }
  }

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, location]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center gap-2 ">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <img src="/favicon/favicon-32x32.png" className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-xl">{t("common:main.product_name")}</span>
            <span className="truncate text-xs">
              {t("common:nav.version")}: {process.env.NEXT_PUBLIC_CLIENT_VERSION}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <CreateTicketModal
          keypress={keypressdown}
          setKeyPressDown={setKeyPressDown}
        />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="hidden sm:block ">
          <ThemeSettings />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
