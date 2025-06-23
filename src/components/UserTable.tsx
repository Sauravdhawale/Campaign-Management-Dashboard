
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
}

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  const getRoleBadge = (role: string) => {
    return (
      <Badge 
        variant={role === 'Admin' ? 'default' : 'secondary'}
        className={role === 'Admin' ? 'bg-[#B71C1C] hover:bg-[#9A1515]' : ''}
      >
        {role}
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left p-4 font-medium text-gray-900">S. No</th>
            <th className="text-left p-4 font-medium text-gray-900">Name</th>
            <th className="text-left p-4 font-medium text-gray-900">Email</th>
            <th className="text-left p-4 font-medium text-gray-900">Role</th>
            <th className="text-left p-4 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-4 text-gray-900">{index + 1}</td>
              <td className="p-4 text-gray-900 font-medium">{user.name}</td>
              <td className="p-4 text-gray-900">{user.email}</td>
              <td className="p-4">{getRoleBadge(user.role)}</td>
              <td className="p-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{user.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(user.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
