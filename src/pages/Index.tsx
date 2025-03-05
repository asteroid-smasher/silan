
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import JoinCallForm from '@/components/JoinCallForm';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-[15%] right-[20%] w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-float opacity-60" />
        <div className="absolute top-[40%] left-[15%] w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-float opacity-40" style={{ animationDelay: "1s" }} />
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <div className="inline-block">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  Introducing SignaVid
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Video Calls with Sign Language Translation
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect and communicate with automatic sign language to text conversion in real-time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-12 px-6 text-base group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="h-12 px-6 text-base">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                Secure
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                Private
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                Real-time
              </div>
            </div>
          </div>
          
          <div className="glass p-8 rounded-3xl order-1 md:order-2">
            <JoinCallForm />
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t border-border/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SignaVid. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
