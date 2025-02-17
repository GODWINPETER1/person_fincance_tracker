import {  useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { AppDispatch , RootState } from "@/store/store";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { AiOutlineLoading } from "react-icons/ai";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/dialog/dialog";
import { NavLink } from "react-router-dom";


export default function Login() {

    const dispatch = useDispatch<AppDispatch>();
    const {loading , error , user  } = useSelector((state: RootState) => state.auth );

    const [formData , setFormData] = useState({ email: " " , password: " "});
    const [isDialogOpen , setIsDialogOpen] = useState(false)
    
    useEffect(() => {

      if(user) {

         setIsDialogOpen(true)
      }
    } , [user])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login(formData))
    }

    return (
        <div  className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Login To Your Account</h2>
      <p className="text-sm text-center text-gray-500 mb-4">Login and start managing your finances efficiently.</p>
      {error && <p> {error} </p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" name="email"  type="email" value={formData.email} onChange={handleChange} required />
        <Input label="Password" name="password"  type="password" value={formData.password} onChange={handleChange} required />
        <Button loading={loading} type="submit" className="w-full">{loading && <AiOutlineLoading className="animate-spin text-lg"/>} Login </Button>
        <p className="mt-3 text-lg font-semibold"> Do not have an Account ? <NavLink to="/register"> <a className="text-emerald-300"> Sign up now </a> </NavLink> </p>
      </form>

      {/* success Dialog */}
      { <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
           <DialogHeader>
              <DialogTitle> Login successfully </DialogTitle>
              <DialogDescription>
                 {typeof user === "object" && user !== null ? "Welcome back, " + user.name  : "Your account has been created successfully!!"}
              </DialogDescription>
           </DialogHeader>
           <DialogClose asChild>
              <Button className="mt-4 w-full"> Ok </Button>
           </DialogClose>
        </DialogContent>

      </Dialog> }
    </div>
    )
}