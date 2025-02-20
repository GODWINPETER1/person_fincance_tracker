import { Card , CardContent , CardDescription , CardHeader , CardFooter , CardTitle } from "@/components/card/card"
import { GetDashboardData } from "../../data/dashboardData";
export default function dashboard() {

  const Dashboard_data = GetDashboardData()

  return (
    <div className="grid grid-col-1 md:grid-cols-3 gap-4 p-6">

      {
        Dashboard_data.map((card) => (

          <Card key={card.id} className={`shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 ${
            card.type === "Income" ? "bg-green-100": card.type === "Expenses" ? "bg-red-100" : "bg-blue-100"
          }`}>
              <CardHeader className="p-4 bg-opacity-75">
                 <CardTitle className="text-xl font-bold text-gray-800"> {card.title} </CardTitle>
                 <CardDescription className="text-gray-600">{ card.description }</CardDescription>
              </CardHeader>

              <CardContent className="flex items-center justify-center p-6 text-3xl font-semibold">
                 <span className={`${card.type === "Income" ? "text-green-700" : card.type === "Expenses" ? "text-red-700" : "text-blue-700"}`}> {card.content} </span>
              </CardContent>

              <CardFooter className="p-4 text-gray-600 text-sm text-center">
                  {card.footer} 
              </CardFooter>
          </Card>
        ))
      }

    </div>
  )
}
