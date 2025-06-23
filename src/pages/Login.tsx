
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { BarChart3, Mail, Lock, LogIn, EyeClosed, EyeIcon } from "lucide-react";
import ArkenLogo from '../asset/Arken-Logo.png'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      const user = await res.json();

      if (user.success === false || !user.name) {
        toast.error(user.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      // ✅ Now only proceed if login was truly successful
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/dashboard');

    } catch (err) {
      toast.error("Something went wrong!");
    }

    setIsLoading(false);
  };

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B71C1C] rounded-2xl mb-4">
            <BarChart3 className="h-8 w-8 text-white" />
          </div> */}
          <img src={ArkenLogo} alt="" width={'50%'} className='m-auto mb-5' />
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">ArkenTech CRM</h1> */}
          <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-semibold text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2  relative">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type={type ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-11"
                />

                <div className='absolute right-1 top-7 ' onClick={() => setType(!type)}>{type ? <EyeClosed /> : <EyeIcon />}</div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-[#B71C1C] hover:bg-[#9A1515] text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        {/*
        <Card className="mt-6 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-center">Test Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-red-900">Admin Account</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillCredentials('admin@arkentech.com', 'admin123')}
                  className="text-xs h-7 border-red-200 text-red-700 hover:bg-red-100"
                >
                  Use
                </Button>
              </div>
              <p className="text-sm text-red-700">admin@arkentech.com</p>
              <p className="text-sm text-red-700">admin123</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-blue-900">User Account</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillCredentials('user@arkentech.com', 'user123')}
                  className="text-xs h-7 border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  Use
                </Button>
              </div>
              <p className="text-sm text-blue-700">user@arkentech.com</p>
              <p className="text-sm text-blue-700">user123</p>
            </div>
          </CardContent>
        </Card>*/}
      </div>
    </div>
  );
};

export default Login;
