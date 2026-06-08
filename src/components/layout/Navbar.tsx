import React from 'react';
import { Moon, Sun, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Navbar({
  onNavigate,
}: {
  onNavigate: (view: 'dashboard' | 'faq') => void;
}) {
  const { theme, setTheme, language, setLanguage, t } = useApp();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Layers className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity truncate leading-none">
                {t('appName')}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={theme === 'dark' ? t('lightMode') : t('darkMode')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}>
                EN
              </button>
              <button
                onClick={() => setLanguage('fa')}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded transition-all fa-text ${
                  language === 'fa'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}>
                فارسی
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
