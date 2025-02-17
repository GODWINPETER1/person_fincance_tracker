// RegisterPage.tsx
import React from "react";
import LoginForm from "@/features/auth/Login";
import imageSrc from "@/assets/auth2.jpg"; // Update with actual image path

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2  items-center justify-center">
        <img src={imageSrc} alt="Register" className="max-w-s md:max-w-md" />
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;