import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, Home, Map, BarChart, Droplet, Leaf, Calendar, Info } from "lucide-react";
import { Link } from 'react-router-dom';
import { APP_NAME, GOVERNMENT } from '@/utils/contants';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'react-toastify';


interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const CustomHeader = () => {
  const [open, setOpen] = useState(false);
  const {isAuthenticated:isLoggedIn} = useAuthStore();
    const navigate = useNavigate();

const navItems: NavItem[] = [
    { label: 'Home', href: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    {
        label: "Information", href: "/info", icon: <Info className="w-4 h-4 mr-2" />,
        requiresAuth: true
    },
    {
        label: "Visualize Data", href: "/visualize", icon: <BarChart className="w-4 h-4 mr-2" />,
        requiresAuth: true
    },
    { label: 'Show Bins', href: '/bin-map', icon: <Map className="w-4 h-4 mr-2" /> },
    { label: 'Schedule Pickup', href: '/pickup-map', icon: <Calendar className="w-4 h-4 mr-2" /> ,requiresAuth:true},
    { 
        label: "Resolve Issues", href: "/resolve", icon: <Leaf className="w-4 h-4 mr-2" />,
        requiresAuth: true
    },
    { label: 'Report Issue', href: '/report', icon: <Droplet className="w-4 h-4 mr-2" /> },
];

  // Filter items based on auth status
  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isLoggedIn)
  );

    function handleLoginLogout(): void {
        if(isLoggedIn){
            // Implement your logout logic here
            useAuthStore.getState().logout();
            toast.success("Logged out successfully");
        }
        
        // go to login screen and remove all previous routes
        navigate('/login', { replace: true });

    }

  return (
    <header className="w-full">
      {/* Top bar with disclaimer, admin and login buttons */}
      <div className="bg-blue-800 text-white p-2 flex justify-between items-center text-sm">
        <div className="hidden md:block">
          This website does not belong to any government organization
        </div>
        <div className="flex gap-2 ml-auto">
          {isLoggedIn ? (
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-blue-700">
              Admin
            </Button>
          ) : null}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-white hover:bg-blue-700"
            onClick={handleLoginLogout}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-blue-700">
            English
          </Button>
        </div>
      </div>
      
      {/* Main header with logo and title */}
      <div className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" />
          <div>
            <h1 className="font-bold text-lg md:text-xl">{APP_NAME}</h1>
            <p className="text-xs md:text-sm">{GOVERNMENT}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://amritmahotsav.nic.in/writereaddata/portal/images/logo-black.png" alt="Badge" className=" hidden md:block" />
          {/* <img src="/badge2.png" alt="Badge" className="h-10 w-16 hidden md:block" /> */}
        </div>
      </div>
      
      {/* Navigation Menu - Desktop */}
      <nav className="bg-blue-700 text-white hidden md:block">
        <div className="flex">
          {filteredNavItems.map((item) => (
            <Link 
              key={item.label} 
              to={item.href}
              className="px-4 py-3 hover:bg-blue-800 flex items-center text-sm whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="bg-blue-700 text-white flex justify-between md:hidden px-4 py-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-blue-700 text-white border-r-blue-800">
            <div className="flex flex-col gap-2 mt-6">
              {filteredNavItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.href}
                  className="px-4 py-3 hover:bg-blue-800 flex items-center rounded"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center">
          <h2 className="text-sm font-medium">{APP_NAME}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-blue-700 text-white border-blue-800">
            {isLoggedIn && (
              <DropdownMenuItem className="hover:bg-blue-800 cursor-pointer">
                Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="hover:bg-blue-800 cursor-pointer">
              {isLoggedIn ? 'Logout' : 'Login'}
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-800 cursor-pointer">
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};

export default CustomHeader;