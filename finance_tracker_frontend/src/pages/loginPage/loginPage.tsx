// RegisterPage.tsx
import React from "react";
import LoginForm from "@/features/auth/Login";
import ImageCarousel from "@/components/carousel/imageCarousel";

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2  justify-center">
        <ImageCarousel/>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;