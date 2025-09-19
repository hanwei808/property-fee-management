import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Home, AlertTriangle, TrendingUp, Calendar, Phone, Mail, MapPin, Star } from "lucide-react"

export function HouseholdView() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 基本信息卡片 */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            业主信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?key=owner1" />
              <AvatarFallback>王女</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">王女士</h3>
              <p className="text-sm text-muted-foreground">A座1201室业主</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-chart-3">
                  <Star className="h-3 w-3 mr-1" />
                  优质客户
                </Badge>
                <Badge variant="outline" className="text-chart-4">
                  服务投诉
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>138****8888</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>wang****@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>城市花园A座1201</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>住宅 | 120㎡ | 自住</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">信用评分</span>
              <span className="text-sm font-medium">85分</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">历史缴费记录良好，偶有延迟</p>
          </div>
        </CardContent>
      </Card>

      {/* 详细信息标签页 */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>详细信息</CardTitle>
          <CardDescription>全方位业主数据分析与历史记录</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="billing" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="billing">账单记录</TabsTrigger>
              <TabsTrigger value="contact">联系记录</TabsTrigger>
              <TabsTrigger value="service">服务记录</TabsTrigger>
              <TabsTrigger value="analysis">AI分析</TabsTrigger>
            </TabsList>

            <TabsContent value="billing" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">当前欠费</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-destructive">¥3,200</div>
                    <p className="text-sm text-muted-foreground">逾期15天</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>物业费</span>
                        <span>¥2,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>停车费</span>
                        <span>¥600</span>
                      </div>
                      <div className="flex justify-between">
                        <span>滞纳金</span>
                        <span>¥200</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">缴费统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-chart-3">92%</div>
                    <p className="text-sm text-muted-foreground">按时缴费率</p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>总缴费次数</span>
                        <span>36次</span>
                      </div>
                      <div className="flex justify-between">
                        <span>延迟缴费</span>
                        <span>3次</span>
                      </div>
                      <div className="flex justify-between">
                        <span>平均延迟</span>
                        <span>8天</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">近期账单</h4>
                {[
                  { date: "2024-01", amount: 2400, status: "已缴费", delay: 0 },
                  { date: "2023-12", amount: 2400, status: "已缴费", delay: 5 },
                  { date: "2023-11", amount: 2400, status: "已缴费", delay: 0 },
                  { date: "2023-10", amount: 2400, status: "已缴费", delay: 12 },
                ].map((bill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{bill.date}</span>
                      <Badge variant={bill.status === "已缴费" ? "secondary" : "destructive"}>{bill.status}</Badge>
                      {bill.delay > 0 && (
                        <Badge variant="outline" className="text-chart-4">
                          延迟{bill.delay}天
                        </Badge>
                      )}
                    </div>
                    <span className="font-semibold">¥{bill.amount}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    date: "2024-02-15 14:30",
                    type: "电话",
                    content: "联系业主关于物业费缴纳，业主表示因服务质量问题暂缓缴费",
                    result: "未成功",
                    operator: "李经理",
                  },
                  {
                    date: "2024-02-13 09:15",
                    type: "短信",
                    content: "发送缴费提醒短信",
                    result: "已送达",
                    operator: "系统",
                  },
                  {
                    date: "2024-02-10 16:45",
                    type: "微信",
                    content: "业主主动联系，询问服务投诉处理进度",
                    result: "已回复",
                    operator: "客服小王",
                  },
                ].map((record, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{record.type}</Badge>
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                      </div>
                      <Badge
                        variant={
                          record.result === "已成功" || record.result === "已送达" || record.result === "已回复"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {record.result}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{record.content}</p>
                    <p className="text-xs text-muted-foreground">操作人: {record.operator}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="service" className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    date: "2024-02-12",
                    type: "投诉",
                    title: "电梯噪音问题",
                    status: "处理中",
                    priority: "中",
                  },
                  {
                    date: "2024-01-28",
                    type: "报修",
                    title: "水管漏水",
                    status: "已完成",
                    priority: "高",
                  },
                  {
                    date: "2024-01-15",
                    type: "咨询",
                    title: "停车位申请",
                    status: "已完成",
                    priority: "低",
                  },
                ].map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{service.type}</Badge>
                        <Badge
                          variant={
                            service.priority === "高"
                              ? "destructive"
                              : service.priority === "中"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {service.priority}优先级
                        </Badge>
                      </div>
                      <Badge variant={service.status === "已完成" ? "secondary" : "default"}>{service.status}</Badge>
                    </div>
                    <h4 className="font-medium mb-1">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      催费成功率预测
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-chart-1">92%</div>
                    <p className="text-sm text-muted-foreground">基于历史数据分析</p>
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>历史配合度</span>
                        <span className="text-chart-3">高</span>
                      </div>
                      <div className="flex justify-between">
                        <span>经济状况</span>
                        <span className="text-chart-3">良好</span>
                      </div>
                      <div className="flex justify-between">
                        <span>沟通意愿</span>
                        <span className="text-chart-3">积极</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      风险评估
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-chart-3">低风险</div>
                    <p className="text-sm text-muted-foreground">综合评估结果</p>
                    <div className="mt-3 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>逾期风险</span>
                        <span className="text-chart-4">中</span>
                      </div>
                      <div className="flex justify-between">
                        <span>投诉风险</span>
                        <span className="text-chart-4">中</span>
                      </div>
                      <div className="flex justify-between">
                        <span>法务风险</span>
                        <span className="text-chart-3">低</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI策略建议</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">推荐策略</h4>
                    <p className="text-sm text-muted-foreground">
                      建议优先处理业主的服务投诉，待投诉解决后再进行温和催费。
                      可采用微信或电话方式，避免过于强硬的语气。
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">最佳联系时间</h4>
                    <p className="text-sm text-muted-foreground">
                      根据历史数据分析，业主在工作日晚上7-9点接听电话的概率最高(85%)
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">话术建议</h4>
                    <p className="text-sm text-muted-foreground">
                      "王女士您好，关于您反映的电梯噪音问题，我们已经安排维修，
                      预计本周内完成。同时想提醒您2月份的物业费..."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
