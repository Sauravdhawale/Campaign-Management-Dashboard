
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { AddUserModal } from "@/components/AddUserModal";
import { UserTable } from "@/components/UserTable";
import { toast } from "sonner";
import { Plus, Users as UsersIcon } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

interface CurrentUser {
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

const Users = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [users, setUsers] = useState<User[]>([]);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);

const handleAddUser = async (newUser: Omit<User, 'id'>) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/add_user.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    const result = await res.json();

    if (result.success) {
      toast.success("User added successfully");
      setIsAddModalOpen(false);
      loadUsers(); // Refresh
    } else {
      toast.error(result.error || "Failed to add user");
    }
  } catch (error) {
    console.error("Error adding user:", error);
    toast.error("An error occurred while adding user");
  }
};

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'Admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/dashboard');
      return;
    }
    
    setCurrentUser(parsedUser);
    loadUsers();
  }, [navigate]);

  const loadUsers = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fetch_users.php`);
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Failed to load users:", error);
    toast.error("Unable to fetch users");
  }
};

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

const handleDeleteUser = async (id: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/delete_user.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    const result = await res.json();

    if (result.success) {
      toast.success("User deleted successfully");
      loadUsers(); // reload from backend
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("An error occurred while deleting user");
  }
};


  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={currentUser} onLogout={handleLogout} />
      
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage system users and their permissions</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="default" className="px-3 py-1">
                {currentUser.role}
              </Badge>
              <span className="text-gray-700">Welcome, {currentUser.name}</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                <div className="h-4 w-4 bg-red-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role === 'Admin').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'User').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>System Users</CardTitle>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-[#B71C1C] hover:bg-[#9A1515]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <UserTable 
                users={users}
                onDelete={handleDeleteUser}
              />
            </CardContent>
          </Card>
        </main>
      </div>

      <AddUserModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
};

export default Users;
