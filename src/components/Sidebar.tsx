
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart3, Users, LogOut, Home } from "lucide-react";
import ArkenLogo from '../asset/Arken-Logo.png'

interface User {
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
      show: true
    },
    {
      icon: Users,
      label: 'Users',
      path: '/users',
      show: user.role === 'Admin'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50" style={{width:"15%"}}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          {/* <div className="w-10 h-10 bg-[#B71C1C] rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">ArkenTech</h2>
            <p className="text-sm text-gray-600">CRM System</p>
          </div> */}

          <img src={ArkenLogo} alt="" width={'90%'} />
        </div>

        <nav className="space-y-2">
          {menuItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start h-11 ${
                  isActive(item.path) 
                    ? "bg-[#B71C1C] hover:bg-[#9A1515] text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className={`h-5 w-5 mr-3 ${
                  isActive(item.path) ? "text-white" : "text-gray-600"
                }`} />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-[10px] text-gray-900">{user.email}</p>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start h-11 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
  