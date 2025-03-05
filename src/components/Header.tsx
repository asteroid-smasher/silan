
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VideoIcon } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 ${isHomePage ? 'bg-transparent' : 'glass'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/90 p-2 rounded-lg transform transition-all duration-300 group-hover:rotate-12">
            <VideoIcon className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl tracking-tight">SignaVid</span>
        </Link>
        
        {!isHomePage && (
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-secondary"
          >
            Exit Call
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
