import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ScanLine } from "lucide-react"

export function HouseholdSearch() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="输入业主姓名、房号、手机号码..." className="pl-10" />
          </div>
          <Button>
            <ScanLine className="mr-2 h-4 w-4" />
            搜索
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-muted-foreground">快速搜索:</span>
          <Badge variant="secondary" className="cursor-pointer">
            高风险业主
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            长期欠费
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            投诉记录
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            优质客户
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
