import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Building2, Brain, MessageSquare, Users, BarChart3, Settings, ChevronRight, Zap } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Link from "next/link"

const menuItems = [
  {
    title: "智能工作台",
    icon: Zap,
    items: [
      { title: "催收管理", href: "/workbench/todo" },
      { title: "欠缴业主360°", href: "/workbench/household" },
      // { title: "批量执行面板", href: "/workbench/batch" },
      { title: "催收回执监控", href: "/workbench/monitor" },
    ],
  },
  {
    title: "AI分析引擎",
    icon: Brain,
    items: [
      { title: "欠费原因模型", href: "/ai/analysis" },
      { title: "风险评分模型", href: "/ai/risk" },
      { title: "催费策略模型", href: "/ai/strategy" },
      // { title: "个性化话术", href: "/ai/scripts" },
    ],
  },
  {
    title: "多渠道触达",
    icon: MessageSquare,
    items: [
      { title: "统一发送中心", href: "/channels/send" },
      { title: "渠道管理", href: "/channels/manage" },
      { title: "频控与黑名单", href: "/channels/control" },
      { title: "发送记录", href: "/channels/history" },
    ],
  },
  {
    title: "业主自助服务",
    icon: Users,
    items: [
      { title: "账单查询支付", href: "/self-service/billing" },
      { title: "分期申请", href: "/self-service/installment" },
      { title: "异议提交", href: "/self-service/dispute" },
      { title: "开票服务", href: "/self-service/invoice" },
    ],
  },
  {
    title: "管理看板",
    icon: BarChart3,
    items: [
      { title: "回款预测", href: "/dashboard/forecast" },
      { title: "渠道效果分析", href: "/dashboard/channels" },
      { title: "合规监控", href: "/dashboard/compliance" },
    ],
  },
  {
    title: "系统设置",
    icon: Settings,
    items: [
      { title: "用户权限", href: "/settings/users" },
      { title: "项目配置", href: "/settings/projects" },
      { title: "集成管理", href: "/settings/integrations" },
      { title: "审计日志", href: "/settings/audit" },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border [&_.scrollbar-hide]:scrollbar-hide [&_*]:scrollbar-hide">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-accent">
            <Building2 className="h-4 w-4 text-sidebar-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">物业智能催收系统</span>
            <span className="text-xs text-sidebar-foreground/60">v3.0</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto px-2 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <SidebarMenu>
          {menuItems.map((item) => (
            <Collapsible key={item.title} defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.href} className="text-sm">
                            {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
