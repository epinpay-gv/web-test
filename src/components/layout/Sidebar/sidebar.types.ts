import { ComponentType } from "react";

export interface SidebarItemData {
  label: string;
  url: string;
  icon?: ComponentType<{ className?: string }>;
}