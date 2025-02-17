import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch , RootState} from "@/store/store";
import { register } from "@/features/auth/authSlice";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import {AiOutlineLoading} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dialog/dialog";


export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading , error , user } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isDialogOpen , setIsDialogOpen] = useState<boolean>(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  // open dialog when the user register successfully
  useEffect(() => {
    if(user) {
      setIsDialogOpen(true)
    }
  } , [user])

  return (
    <div  className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
      <p className="text-sm text-center text-gray-500 mb-4">Join and start managing your finances efficiently.</p>
      {error && <p className="text-center text-red-500 text-sm"> {error} </p>}
    
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name"  value={formData.name} onChange={handleChange} required />
        <Input label="Email" name="email"  value={formData.email} onChange={handleChange} required />
        <Input label="Password" name="password"  value={formData.password} onChange={handleChange} required />
        <Button loading={loading} type="submit" className="w-full">{loading && <AiOutlineLoading className="animate-spin text-lg"/>} Sign Up </Button>
        <p className="mt-3 text-lg font-semibold"> Already have an account ? <NavLink to="/login"> <a className="text-emerald-300"> Login </a> </NavLink> </p>
      </form>

      {/* success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
           <DialogHeader>
              <DialogTitle> Registration successfully </DialogTitle>
              <DialogDescription>
                 {typeof user === "object" && user !== null ? user.message : "Your account has been created successfully!!"}
              </DialogDescription>
           </DialogHeader>
           <DialogClose asChild>
              <Button className="mt-4 w-full"> Ok </Button>
           </DialogClose>
        </DialogContent>

      </Dialog>
    </div>
  );
}
