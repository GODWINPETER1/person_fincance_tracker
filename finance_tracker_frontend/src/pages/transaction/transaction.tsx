import { useState } from "react";
import TransactionForm from "@/features/transactions/AddTransaction";
import TransactionList from "@/features/transactions/TransactionList";
import { Button } from "@/components/button/button";
import { Dialog, DialogOverlay, DialogContent } from "@/components/dialog/dialog";

const TransactionPage = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col flex-grow overflow-auto-y ">
          
            <div className="w-full p-6 justify-center">
                <Button
                    className=" py-2 px-6 rounded-lg shadow-lg"
                    onClick={() => setShowForm(true)}
                >
                    Add Transaction
                </Button>
            </div>

            
            <div className="flex-grow flex justify-center items-center overflow-y-auto p-6">
                <TransactionList />
            </div>

           
            <Dialog open={showForm} onOpenChange={setShowForm}>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Transaction</h2>
                    <TransactionForm />
                    <div className="flex justify-end mt-4">
                        <Button className="bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={() => setShowForm(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TransactionPage;
