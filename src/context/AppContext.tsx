import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { PasswordEntry, Language, Theme, translations } from '../types';
import { db, VaultEntry } from '../db';

interface AppContextType {
  passwords: PasswordEntry[];
  addPassword: (
    entry: Omit<PasswordEntry, 'id' | 'createdAt'>,
  ) => Promise<void>;
  updatePassword: (id: string, entry: Partial<PasswordEntry>) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  importPasswords: (data: PasswordEntry[]) => Promise<void>;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: keyof typeof translations.en) => string;
  cat: (key: keyof typeof translations.en.categories) => string;
  isReady: boolean;
  translations: typeof translations;
  // Security (No-ops or simplified for compatibility)
  isLocked: boolean;
  hasMasterPassword: boolean;
  setFirstMasterPassword: (password: string) => Promise<void>;
  unlockVault: (password: string) => Promise<boolean>;
  updateCategoryColor: () => void;
  lockVault: () => void;
  resetVault: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [isReady, setIsReady] = useState(false);

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('pot_lang') as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('pot_theme') as Theme) || 'dark';
  });

  // Initialize DB and load passwords
  useEffect(() => {
    const init = async () => {
      try {
        await db.init();
        await loadPasswords();
      } catch (err) {
        console.error('DB initialization failed:', err);
      } finally {
        setIsReady(true);
      }
    };
    init();
  }, []);

  const generateId = () => {
    try {
      if (
        typeof crypto !== 'undefined' &&
        typeof crypto.randomUUID === 'function'
      ) {
        return crypto.randomUUID();
      }
    } catch (e) {
      // Fallback
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const loadPasswords = async () => {
    try {
      const entries = await db.getAll();
      const passwordEntries: PasswordEntry[] = [];

      for (const entry of entries) {
        try {
          passwordEntries.push(JSON.parse(entry.data));
        } catch (e) {
          console.error('Failed to parse entry:', entry.id);
        }
      }

      setPasswords(passwordEntries);
    } catch (err) {
      console.error('Load passwords failed:', err);
    }
  };

  useEffect(() => {
    localStorage.setItem('pot_lang', language);
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('pot_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  const addPassword = async (
    entry: Omit<PasswordEntry, 'id' | 'createdAt'>,
  ) => {
    const newEntry: PasswordEntry = {
      ...entry,
      id: generateId(),
      createdAt: Date.now(),
    };

    try {
      await db.save({ id: newEntry.id, data: JSON.stringify(newEntry) });
      setPasswords(prev => [newEntry, ...prev]);
    } catch (err) {
      console.error('Add password failed:', err);
      alert(language === 'fa' ? 'خطا در ذخیره داده‌ها' : 'Error saving data');
    }
  };

  const updatePassword = async (id: string, entry: Partial<PasswordEntry>) => {
    const existing = passwords.find(p => p.id === id);
    if (existing) {
      const updated = { ...existing, ...entry };
      try {
        await db.save({ id: updated.id, data: JSON.stringify(updated) });
        setPasswords(prev => prev.map(p => (p.id === id ? updated : p)));
      } catch (err) {
        console.error('Update password failed:', err);
        alert(
          language === 'fa'
            ? 'خطا در بروزرسانی داده‌ها'
            : 'Error updating data',
        );
      }
    }
  };

  const deletePassword = async (id: string) => {
    try {
      await db.delete(id);
      setPasswords(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Delete password failed:', err);
    }
  };

  const importPasswords = async (data: PasswordEntry[]) => {
    try {
      const entries: VaultEntry[] = data.map(entry => {
        const id = entry.id || generateId();
        const createdAt = entry.createdAt || Date.now();
        return {
          id,
          data: JSON.stringify({ ...entry, id, createdAt }),
        };
      });
      await db.saveAll(entries);
      await loadPasswords(); // Reload to be sure
    } catch (err) {
      console.error('Import failed:', err);
    }
  };

  const setFirstMasterPassword = async () => {};
  const unlockVault = async () => true;
  const lockVault = () => {};

  const resetVault = async () => {
    await db.clear();
    setPasswords([]);
  };

  const t = (key: keyof typeof translations.en): string => {
    return (
      (translations[language][key] as string) ||
      (translations.en[key] as string)
    );
  };

  const cat = (key: keyof typeof translations.en.categories): string => {
    return (
      translations[language].categories[key] || translations.en.categories[key]
    );
  };
  const updateCategoryColor = useCallback(
    async (categoryName: string, newColor: string) => {
      setPasswords(prevPasswords =>
        prevPasswords.map(password =>
          password.category === categoryName
            ? { ...password, categoryColor: newColor }
            : password,
        ),
      );

      const itemsToUpdate = passwords.filter(p => p.category === categoryName);
      for (const item of itemsToUpdate) {
        await updatePassword(item.id, { ...item, categoryColor: newColor });
      }
    },
    [passwords, updatePassword],
  );

  return (
    <AppContext.Provider
      value={{
        passwords,
        addPassword,
        updatePassword,
        updateCategoryColor,
        deletePassword,
        importPasswords,
        language,
        setLanguage,
        theme,
        setTheme,
        t,
        cat,
        isReady,
        translations,
        // Security
        isLocked: false,
        hasMasterPassword: false,
        setFirstMasterPassword,
        unlockVault,
        lockVault,
        resetVault,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
