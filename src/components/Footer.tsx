import React from 'react';
import { Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 text-center text-slate-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2">
          <Coffee className="w-4 h-4" />
          <p>2023 Inzamul Hoque. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;