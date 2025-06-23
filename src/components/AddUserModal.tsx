
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id?: number; // optional because backend assigns it
  name: string;
  email: string;
  password: string; // ✅ add this
  role: 'Admin' | 'User';
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: User) => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
const [formData, setFormData] = useState<User>({
  name: '',
  email: '',
  password: '',
  role: 'User'
});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onAdd(formData); // Sends name, email, password, role
  setFormData({
    name: '',
    email: '',
    password: '', // ✅ Reset password field too
    role: 'User'
  });
};

const handleChange = (field: keyof User, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New User</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter password"
            required
          />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value: 'Admin' | 'User') => handleChange('role', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#B71C1C] hover:bg-[#9A1515]">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
