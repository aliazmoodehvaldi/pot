import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Search,
  Download,
  Upload,
  ArrowDownAZ,
  Calendar,
  Folder,
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/landing/Hero';
import { PasswordCard } from './components/dashboard/PasswordCard';
import { PasswordForm } from './components/dashboard/PasswordForm';
import { Modal, Button, CustomSelect } from './components/ui/Shared';

export default function App() {
  const {
    passwords,
    importPasswords,
    t,
    cat,
    theme,
    isReady,
    language,
    translations,
    updateCategoryColor,
  } = useApp();

  const [showDashboard, setShowDashboard] = useState(() => {
    return false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'category'>('date');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  useEffect(() => {
    if (isReady && passwords.length > 0) {
      setShowDashboard(true);
    }
  }, [isReady, passwords.length]);

  const { allCategories, categoryColors } = useMemo(() => {
    const predefined = [
      'all',
      'personal',
      'work',
      'social',
      'finance',
      'other',
    ];
    const customOnes = passwords
      .map(p => p.category)
      .filter(c => c && !predefined.includes(c)) as string[];

    const colors: Record<string, string> = {};
    passwords.forEach(p => {
      if (p.category && p.categoryColor && !predefined.includes(p.category)) {
        colors[p.category] = p.categoryColor;
      }
    });

    return {
      allCategories: [...predefined, ...Array.from(new Set(customOnes))],
      categoryColors: colors,
    };
  }, [passwords]);

  const filteredPasswords = useMemo(() => {
    const filtered = passwords.filter(p => {
      const searchLower = searchQuery.toLowerCase();
      const titleMatch = p.title.toLowerCase().includes(searchLower);
      const categoryMatch = p.category?.toLowerCase().includes(searchLower);
      const usernameMatch = p.username?.toLowerCase().includes(searchLower);
      const matchesSearch = titleMatch || categoryMatch || usernameMatch;

      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'category')
        return (a.category || '').localeCompare(b.category || '');
      return b.createdAt - a.createdAt;
    });
  }, [passwords, searchQuery, sortBy, selectedCategory]);

  if (!isReady) {
    return (
      <div className={theme}>
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(passwords));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'pot_export.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        alert(
          language === 'fa'
            ? 'لطفاً یک فایل JSON انتخاب کنید.'
            : 'Please select a JSON file.',
        );
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        try {
          const content = event.target?.result as string;
          if (!content) throw new Error('Empty file');

          const json = JSON.parse(content);
          if (!Array.isArray(json)) {
            throw new Error('Data is not an array');
          }

          const isValid = json.every(
            entry =>
              typeof entry === 'object' &&
              entry !== null &&
              typeof entry.title === 'string',
          );

          if (!isValid) {
            throw new Error('Some entries are malformed');
          }

          importPasswords(json);
          e.target.value = '';
          setShowDashboard(true);
        } catch (err) {
          console.error('Import error:', err);
          const errorMsg =
            language === 'fa'
              ? 'خطا در وارد کردن داده‌ها. فایل نامعتبر است یا ساختار اشتباهی دارد.'
              : 'Error importing data. File is invalid or has wrong structure.';
          alert(errorMsg);
          e.target.value = '';
        }
      };
      reader.onerror = () => {
        alert(language === 'fa' ? 'خطا در خواندن فایل' : 'Error reading file');
        e.target.value = '';
      };
      reader.readAsText(file);
    }
  };

  if (!showDashboard) {
    return (
      <div className={theme}>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
          <Navbar onNavigate={() => setShowDashboard(true)} />
          <Hero
            onStart={() => setShowDashboard(true)}
            onImport={() =>
              document.getElementById('import-input-landing')?.click()
            }
          />
          <input
            id="import-input-landing"
            type="file"
            className="hidden"
            accept=".json"
            onChange={handleImport}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={theme}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300 font-sans">
        <Navbar onNavigate={() => setShowDashboard(true)} />

        <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-10">
          <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {t('vault')}{' '}
                <span className="text-slate-500 text-sm font-normal ml-2 block sm:inline-block">
                  ({filteredPasswords.length} {t('itemsFound')})
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant="secondary"
                onClick={() => document.getElementById('import-input')?.click()}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs py-3 sm:py-2">
                <Upload size={16} />
                <span className="inline sm:hidden md:inline">
                  {t('import')}
                </span>
              </Button>
              <input
                id="import-input"
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleImport}
              />
              <Button
                variant="secondary"
                onClick={handleExport}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs py-3 sm:py-2">
                <Download size={16} />
                <span className="inline sm:hidden md:inline">
                  {t('export')}
                </span>
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs py-3 sm:py-2">
                <Plus size={16} />
                <span>{t('addPassword')}</span>
              </Button>
            </div>
          </header>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 max-w-4xl items-start sm:items-center">
            <div className="relative flex-1 w-full">
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-3.5 sm:py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 placeholder-slate-500 text-slate-900 dark:text-slate-200 outline-none transition-all touch-manipulation"
              />
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
            </div>

            <CustomSelect
              label=""
              title={language === 'fa' ? 'مرتب‌سازی بر اساس' : 'Sort By'}
              value={sortBy}
              onChange={val => setSortBy(val as any)}
              className="w-full sm:w-52 mb-0"
              options={[
                {
                  value: 'date',
                  label: t('sortByNewest'),
                  icon: <Calendar size={14} />,
                },
                {
                  value: 'title',
                  label: t('sortByAlphabet'),
                  icon: <ArrowDownAZ size={14} />,
                },
                {
                  value: 'category',
                  label: t('sortByCategory'),
                  icon: <Folder size={14} />,
                },
              ]}
            />
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none -mx-4 px-4 touch-pan-x mask-fade-right">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest whitespace-nowrap">
                {t('category')}:
              </span>
              <div className="flex gap-2 flex-nowrap">
                {allCategories.map(catKey => {
                  const customColor = categoryColors[catKey];
                  const isActive = selectedCategory === catKey;

                  return (
                    <button
                      key={catKey}
                      onClick={() => setSelectedCategory(catKey)}
                      style={
                        customColor && isActive
                          ? {
                              backgroundColor: customColor,
                              borderColor: customColor,
                            }
                          : customColor
                            ? { borderColor: customColor, color: customColor }
                            : {}
                      }
                      className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all border whitespace-nowrap active:scale-95 touch-manipulation ${
                        isActive && !customColor
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                          : !customColor
                            ? 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 font-medium'
                            : isActive
                              ? 'text-white shadow-md'
                              : 'bg-white dark:bg-slate-900 font-medium'
                      }`}>
                      {translations.en.categories[
                        catKey as keyof typeof translations.en.categories
                      ]
                        ? cat(catKey as any)
                        : catKey}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPasswords.map(entry => (
                <PasswordCard
                  key={entry.id}
                  entry={entry}
                  onEdit={() => {
                    setEditingEntry(entry);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </AnimatePresence>

            {filteredPasswords.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <Folder
                  size={40}
                  className="text-slate-300 dark:text-slate-700 mx-auto mb-4"
                />
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {t('noPasswords')}
                </p>
                {selectedCategory !== 'all' && (
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">
                    {language === 'fa' ? 'مشاهده تمام موارد' : 'Show all items'}
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </main>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntry(null);
          }}
          title={editingEntry ? t('editPassword') : t('addPassword')}>
          <PasswordForm
            initialData={editingEntry}
            onClose={() => {
              setIsModalOpen(false);
              setEditingEntry(null);
            }}
            updateCategoryColor={updateCategoryColor}
          />
        </Modal>
      </div>
    </div>
  );
}