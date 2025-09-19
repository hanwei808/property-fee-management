import { TodoQueue } from "@/components/todo-queue"
import { QuickActions } from "@/components/quick-actions"
import { TodayStats } from "@/components/today-stats"

export default function TodoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">催收管理</h1>
          <p className="text-muted-foreground text-pretty">AI智能排序，优先处理高价值高成功率案件</p>
        </div>
      </div>

      <TodayStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodoQueue />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
