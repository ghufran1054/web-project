import React from 'react';
import defaultPic from '../assets/react.svg'

const ProfileSection = ({ user }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex items-center space-x-4">
        <img
          src={user.profileImage || defaultPic}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
