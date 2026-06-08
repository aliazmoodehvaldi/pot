import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-slate-800 bg-background-dark text-center relative z-10">
      <div className="text-slate-500 text-sm">
        Designed & developed with <span className="text-red-500">❤️</span> by{' '}
        <span className="text-primary font-bold">Google Stitch</span> ©{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
