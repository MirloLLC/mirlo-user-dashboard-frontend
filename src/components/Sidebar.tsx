import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  Phone,
  HelpCircle,
  LogOut,
  Menu,
  X,
  History,
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { setUserInfo } = useUser();
  const logoUrl =
    'https://2b28fe318f761049de1a7d7244088022.cdn.bubble.io/f1715722050404x301641641093912640/Property%201%3DDefault.svg';

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === '/lines' && location.pathname === '/') ||
      (path === '/agent/events' &&
        location.pathname.startsWith('/agent/events'))
    );
  };

  const handleLogout = () => {
    // Clear user data
    setUserInfo(null);
    // Remove session token
    localStorage.removeItem('sessionToken');
    // Redirect to home
    window.location.href = '/';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out z-40
        w-64 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      >
        <div className="p-6">
          <img src={logoUrl} alt="mirlo" className="h-8" />
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/lines"
            className={`flex items-center px-4 py-3 rounded-lg ${
              isActive('/lines')
                ? 'text-white bg-[#0F1822]'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <Phone className="h-5 w-5 mr-3" />
            <span>Mis líneas</span>
          </Link>

          <Link
            to="/faq"
            className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            <span>Preguntas frecuentes</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 w-full transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
