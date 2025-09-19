import { HouseholdView } from "@/components/household-view"
import { HouseholdSearch } from "@/components/household-search"

export default function HouseholdPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">欠缴业主360°</h1>
          <p className="text-muted-foreground text-pretty">全方位了解业主信息，制定精准催费策略</p>
        </div>
      </div>

      <HouseholdSearch />
      <HouseholdView />
    </div>
  )
}
