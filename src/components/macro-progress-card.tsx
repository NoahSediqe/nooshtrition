import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function MacroProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Macro Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm font-medium">1200 / 2000</span>
          </div>
          <Progress value={60} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm font-medium">60g / 100g</span>
          </div>
          <Progress value={60} className="bg-protein-light dark:bg-protein-dark">
            <div className="bg-protein-fill" style={{ width: '60%' }} />
          </Progress>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm font-medium">150g / 250g</span>
          </div>
          <Progress value={60} className="bg-carbs-light dark:bg-carbs-dark">
            <div className="bg-carbs-fill" style={{ width: '60%' }} />
          </Progress>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm font-medium">40g / 65g</span>
          </div>
          <Progress value={62} className="bg-fat-light dark:bg-fat-dark">
            <div className="bg-fat-fill" style={{ width: '62%' }} />
          </Progress>
        </div>
      </CardContent>
    </Card>
  )
}

