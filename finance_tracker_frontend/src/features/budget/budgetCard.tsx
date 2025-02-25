import { Card , CardContent} from "@/components/card/card";

interface BudgetCardProps {
    category: string;
    amount: number;
    month: number;
    year: number
}

const BudgetCard: React.FC<BudgetCardProps> = ({ category , amount , month , year}) => {

    return (
        <Card className="shadow-md border rounded-lg p-4 w-full sm:w-72">
            <CardContent>
                <h3 className="text-lg font-semibold"> {category} </h3>
                <p className="text-gray-500"> Amount: <span className="font-medium">{amount.toFixed(2)}</span></p>
                <p className="text-gray-500"> Month: {month} / Year: {year} </p>
            </CardContent>

        </Card>
    )
}

export default BudgetCard;