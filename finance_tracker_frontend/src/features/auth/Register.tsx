import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch , RootState} from "@/store/store";
import { register } from "@/features/auth/authSlice";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading , error } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div  className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
      <p className="text-sm text-center text-gray-500 mb-4">Join and start managing your finances efficiently.</p>
      {error && <p className="text-center text-red-500 text-sm"> {error} </p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name"  value={formData.name} onChange={handleChange} required />
        <Input label="Email" name="email"  type="email" value={formData.email} onChange={handleChange} required />
        <Input label="Password" name="password"  type="password" value={formData.password} onChange={handleChange} required />
        <Button loading={loading} type="submit" className="w-full">Sign Up</Button>
      </form>
      
    </div>
  );
}
