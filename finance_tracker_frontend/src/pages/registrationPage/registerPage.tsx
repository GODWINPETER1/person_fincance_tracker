import React from "react";
import RegisterForm from "@/features/auth/Register";
import ImageCarousel from "@/components/carousel/imageCarousel";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* Left Side - Image Carousel Card */}
      <div className="hidden md:flex w-1/2 justify-center">
        <ImageCarousel />
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
