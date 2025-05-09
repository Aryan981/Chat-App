import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Shield, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage,setSelectedImage]=useState(null)

  const handleImageUpload = async (e) => {
    const file=e.target.files[0]
    if(!file)return;

    const reader=new FileReader()

    reader.readAsDataURL(file)

    reader.onload=async()=>{
      const base64Image=reader.result
      setSelectedImage(base64Image)
      await updateProfile({profilePic:base64Image})
    }
  };

  return (
    <div className="h-screen pt-12 bg-base-100">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl shadow-lg overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-base-200 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="relative">
                <img
                  src={selectedImage||authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-base-300 shadow-md"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 pt-20 space-y-8">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold">{authUser?.fullName}</h1>
              <p className="mt-1 text-sm text-zinc-400">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* User Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2 font-medium">
                  <User className="size-4" />
                  Full Name
                </div>
                <div className="px-4 py-3 bg-base-200 rounded-lg border flex items-center">
                  {authUser?.fullName}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2 font-medium">
                  <Mail className="size-4" />
                  Email Address
                </div>
                <div className="px-4 py-3 bg-base-200 rounded-lg border flex items-center">
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className="mt-8 bg-base-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Account Information</h2>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-3 px-4 border-b border-base-300 rounded-md bg-base-100/50">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-zinc-400" />
                    <span>Member Since</span>
                  </div>
                  <span className="font-medium">{authUser?.createdAt.split("T")[0]}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-base-100/50">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500"></div>
                    <span>Account Status</span>
                  </div>
                  <span className="font-medium text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;