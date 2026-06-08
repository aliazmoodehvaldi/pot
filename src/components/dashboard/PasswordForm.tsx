import React, { useState, useMemo, useEffect } from 'react';
import { Wand2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PasswordEntry } from '../../types';
import { Button, Input, Checkbox, TextArea, CustomSelect } from '../ui/Shared';

interface PasswordFormProps {
  initialData?: PasswordEntry;
  onClose: () => void;
  updateCategoryColor: (categoryName: string, newColor: string) => Promise<void>;
}

export function PasswordForm({ initialData, onClose, updateCategoryColor }: PasswordFormProps) {
  const { addPassword, updatePassword, t, cat, language, passwords } = useApp();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    note: initialData?.note || '',
    category: initialData?.category || 'personal',
    categoryColor: initialData?.categoryColor || '#3b82f6',
  });

  const [isCustomCategory, setIsCustomCategory] = useState(
    initialData?.category
      ? !['personal', 'work', 'social', 'finance', 'other'].includes(
          initialData.category,
        )
      : false,
  );
  const [customCategory, setCustomCategory] = useState(
    initialData?.category &&
      !['personal', 'work', 'social', 'finance', 'other'].includes(
        initialData.category,
      )
      ? initialData.category
      : '',
  );

  const [showGenerator, setShowGenerator] = useState(false);
  const [genOptions, setGenOptions] = useState({
    length: 16,
    numbers: true,
    symbols: true,
    uppercase: true,
    lowercase: true,
  });

  const generatePassword = () => {
    const sets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let charset = '';
    if (genOptions.lowercase) charset += sets.lowercase;
    if (genOptions.uppercase) charset += sets.uppercase;
    if (genOptions.numbers) charset += sets.numbers;
    if (genOptions.symbols) charset += sets.symbols;

    if (!charset) charset = sets.lowercase;

    let password = '';
    for (let i = 0; i < genOptions.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const existingCustomCategories = useMemo(() => {
    const predefined = ['personal', 'work', 'social', 'finance', 'other'];
    const customOnes = passwords
      .map(p => p.category)
      .filter((c): c is string => !!c && !predefined.includes(c));
    return Array.from(new Set(customOnes));
  }, [passwords]);

  const getCategoryColor = (categoryName: string) => {
    const found = passwords.find(p => p.category === categoryName && p.categoryColor);
    return found?.categoryColor || '#3b82f6';
  };

  useEffect(() => {
    if (initialData?.category && isCustomCategory) {
      const color = getCategoryColor(initialData.category);
      if (color && formData.categoryColor !== color) {
        setFormData(prev => ({ ...prev, categoryColor: color }));
      }
    }
  }, [initialData, isCustomCategory, passwords]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = t('required');
    if (!formData.username) newErrors.username = t('required');

    if (isCustomCategory && !customCategory.trim()) {
      newErrors.category =
        language === 'fa'
          ? 'نام دسته‌بندی الزامی است'
          : 'Category name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSaving) return;

    setIsSaving(true);
    
    let finalCategory = formData.category;
    let finalColor = formData.categoryColor;
    
    if (isCustomCategory) {
      finalCategory = customCategory;
      finalColor = formData.categoryColor;
    }
    
    try {
      if (!isCustomCategory && initialData) {
        const oldColor = getCategoryColor(finalCategory);
        
        if (finalColor !== oldColor) {
          await updateCategoryColor(finalCategory, finalColor);
        }
      }
      
      const finalData = {
        ...formData,
        category: finalCategory,
        categoryColor: finalColor,
      };

      if (initialData) {
        await updatePassword(initialData.id, finalData);
      } else {
        await addPassword(finalData);
      }
      
      onClose();
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const categoryOptions = useMemo(() => {
    const predefined = [
      { value: 'personal', label: cat('personal') },
      { value: 'work', label: cat('work') },
      { value: 'social', label: cat('social') },
      { value: 'finance', label: cat('finance') },
      { value: 'other', label: cat('other') },
    ];

    const customOptions = existingCustomCategories.map(catName => ({
      value: catName,
      label: catName,
    }));

    const newCustomOption = { value: 'custom', label: t('custom') };

    return [...predefined, ...customOptions, newCustomOption];
  }, [existingCustomCategories, cat, t]);

  const selectedCategoryValue = useMemo(() => {
    if (isCustomCategory) return 'custom';
    const exists = categoryOptions.some(opt => opt.value === formData.category);
    return exists ? formData.category : 'custom';
  }, [isCustomCategory, formData.category, categoryOptions]);

  const handleCategoryChange = (val: string) => {
    if (val === 'custom') {
      setIsCustomCategory(true);
      setCustomCategory('');
      setFormData({ ...formData, category: '' });
    } else {
      setIsCustomCategory(false);
      const color = getCategoryColor(val);
      setFormData({
        ...formData,
        category: val,
        categoryColor: color,
      });
    }
  };

  const handleColorChange = (newColor: string) => {
    setFormData({ ...formData, categoryColor: newColor });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={t('title')}
        value={formData.title}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        error={errors.title}
        placeholder={t('title')}
      />
      <Input
        label={t('username')}
        value={formData.username}
        onChange={e => setFormData({ ...formData, username: e.target.value })}
        error={errors.username}
        placeholder={t('username')}
      />
      <div>
        <Input
          label={t('password')}
          type="text"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          placeholder={t('password')}
        />
        <button
          type="button"
          onClick={() => setShowGenerator(!showGenerator)}
          className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline mt-[-10px] mb-4 block active:scale-95 transition-transform">
          {language === 'fa' ? 'تولید گذرواژه قوی' : 'Generate Strong Password'}
        </button>
      </div>

      {showGenerator && (
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {language === 'fa' ? 'تنظیمات تولیدکننده' : 'Generator Settings'}
            </span>
            <span className="text-xs font-bold text-blue-500">
              {genOptions.length} {language === 'fa' ? 'کاراکتر' : 'Characters'}
            </span>
          </div>

          <input
            type="range"
            min="6"
            max="64"
            value={genOptions.length}
            onChange={e =>
              setGenOptions({ ...genOptions, length: parseInt(e.target.value) })
            }
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer mb-6 accent-blue-600"
          />

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Checkbox
              label={language === 'fa' ? 'اعداد (0-9)' : 'Numbers (0-9)'}
              checked={genOptions.numbers}
              onChange={checked =>
                setGenOptions({ ...genOptions, numbers: checked })
              }
            />
            <Checkbox
              label={language === 'fa' ? 'نمادها (!@#$)' : 'Symbols (!@#$)'}
              checked={genOptions.symbols}
              onChange={checked =>
                setGenOptions({ ...genOptions, symbols: checked })
              }
            />
            <Checkbox
              label={language === 'fa' ? 'حروف بزرگ (A-Z)' : 'Uppercase (A-Z)'}
              checked={genOptions.uppercase}
              onChange={checked =>
                setGenOptions({ ...genOptions, uppercase: checked })
              }
            />
            <Checkbox
              label={language === 'fa' ? 'حروف کوچک (a-z)' : 'Lowercase (a-z)'}
              checked={genOptions.lowercase}
              onChange={checked =>
                setGenOptions({ ...genOptions, lowercase: checked })
              }
            />
          </div>

          <Button
            type="button"
            variant="secondary"
            className="w-full py-2 flex items-center justify-center gap-2 group text-[10px] font-bold uppercase tracking-widest"
            onClick={generatePassword}>
            <Wand2
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
            {language === 'fa'
              ? 'تولید گذرواژه تصادفی'
              : 'Generate Random Password'}
          </Button>
        </div>
      )}

      <CustomSelect
        label={t('category')}
        title={t('category')}
        value={selectedCategoryValue}
        onChange={handleCategoryChange}
        options={categoryOptions}
        error={errors.category}
      />

      {isCustomCategory && (
        <div className="flex flex-col gap-3 mt-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <Input
            placeholder={
              language === 'fa' ? 'نام دسته‌بندی جدید' : 'New category name'
            }
            value={customCategory}
            onChange={e => setCustomCategory(e.target.value)}
            className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 focus:ring-blue-400"
          />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest whitespace-nowrap">
              {language === 'fa' ? 'رنگ دسته‌بندی:' : 'Category Color:'}
            </span>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={formData.categoryColor}
                onChange={e => handleColorChange(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden bg-transparent"
              />
              <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                {[
                  '#3b82f6',
                  '#ef4444',
                  '#10b981',
                  '#f59e0b',
                  '#8b5cf6',
                  '#ec4899',
                  '#64748b',
                ].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleColorChange(c)}
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
                    style={{
                      backgroundColor: c,
                      border:
                        formData.categoryColor === c
                          ? '2px solid white'
                          : undefined,
                      boxShadow:
                        formData.categoryColor === c
                          ? '0 0 0 2px #3b82f6'
                          : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <TextArea
        label={t('note')}
        value={formData.note}
        onChange={e => setFormData({ ...formData, note: e.target.value })}
        placeholder={t('note')}
      />
      <div className="flex gap-2 justify-end mt-6">
        <Button variant="ghost" type="button" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={isSaving}>
          {isSaving
            ? language === 'fa'
              ? 'در حال ذخیره...'
              : 'Saving...'
            : t('save')}
        </Button>
      </div>
    </form>
  );
}