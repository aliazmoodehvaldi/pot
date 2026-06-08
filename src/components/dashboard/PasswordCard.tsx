import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Copy, Edit, Trash2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PasswordEntry, translations } from '../../types';

import { ConfirmationModal } from '../ui/Shared';

interface PasswordCardProps {
  entry: PasswordEntry;
  onEdit: () => void;
}

export const PasswordCard: React.FC<PasswordCardProps> = ({
  entry,
  onEdit,
}) => {
  const { deletePassword, t, language } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCopy = async (text: string, field: string) => {
    if (!text) return;

    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch (err) {
      console.warn('Clipboard API failed, trying fallback:', err);
    }

    if (!success) {
      // Fallback method for older browsers or non-secure contexts
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Prevent scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        if (successful) success = true;
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
    }

    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const deleteMsg =
    language === 'fa'
      ? `آیا از حذف "${entry.title}" مطمئن هستید؟ این عمل قابل بازگشت نیست.`
      : `Are you sure you want to delete "${entry.title}"? This action cannot be undone.`;

  const getCategoryStyles = (cat: string, customColor?: string) => {
    if (customColor) {
      return {
        style: { backgroundColor: `${customColor}1a`, color: customColor },
        className:
          'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 inline-block',
      };
    }
    const colors: Record<string, string> = {
      work: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      personal: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      social: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      finance: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      other:
        'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    };
    return {
      className: `px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 inline-block ${colors[cat] || colors.other}`,
    };
  };

  const categoryInfo = getCategoryStyles(
    entry.category || 'other',
    entry.categoryColor,
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-md hover:shadow-xl dark:shadow-blue-500/10">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600 dark:text-blue-500">
            {entry.title.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white capitalize leading-tight">
              {entry.title}
            </h3>
            <span {...categoryInfo}>
              {entry.category &&
                (translations.en.categories[
                  entry.category as keyof typeof translations.en.categories
                ]
                  ? t(`categories` as any)[entry.category]
                  : entry.category)}
            </span>
          </div>
        </div>
        <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-3 sm:p-1.5 text-slate-500 sm:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors active:scale-95"
            title={language === 'fa' ? 'ویرایش' : 'Edit'}>
            <Edit size={20} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-3 sm:p-1.5 text-slate-500 sm:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors active:scale-95"
            title={language === 'fa' ? 'حذف کردن' : 'Delete'}>
            <Trash2 size={20} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="block text-[10px] capitalize font-bold text-slate-400 dark:text-slate-500 tracking-widest">
            {t('username')}
          </label>
          <div
            onClick={() => handleCopy(entry.username, 'username')}
            className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-2.5 rounded-lg group/field transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700/80">
            <span className="truncate flex-1 py-1">{entry.username}</span>
            <button
              onClick={e => {
                e.stopPropagation();
                handleCopy(entry.username, 'username');
              }}
              className="ml-2 sm:ml-2 p-3.5 sm:p-2 rounded-md hover:bg-blue-500/10 text-slate-500 sm:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all opacity-100 sm:opacity-0 group-hover/field:opacity-100 active:scale-95 touch-manipulation"
              title={language === 'fa' ? 'کپی نام کاربری' : 'Copy Username'}>
              {copiedField === 'username' ? (
                <Check size={18} className="text-emerald-500 sm:w-4 sm:h-4" />
              ) : (
                <Copy size={18} className="sm:w-3.5 sm:h-3.5" />
              )}
            </button>
          </div>
        </div>

        {entry.password && (
          <div className="space-y-1">
            <label className="block text-[10px] capitalize font-bold text-slate-400 dark:text-slate-500 tracking-widest">
              {t('password')}
            </label>
            <div
              onClick={() => handleCopy(entry.password || '', 'password')}
              className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-mono text-sm bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-2.5 rounded-lg group/field transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700/80">
              <span className="tracking-tighter flex-1 py-1">
                {showPassword ? entry.password : '••••••••••••'}
              </span>
              <div className="flex gap-1 sm:gap-1 ml-2 sm:ml-2 opacity-100 sm:opacity-0 group-hover/field:opacity-100 transition-all">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setShowPassword(!showPassword);
                  }}
                  className="p-3.5 sm:p-2 rounded-md hover:bg-blue-500/10 text-slate-500 sm:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-95 touch-manipulation"
                  title={
                    showPassword
                      ? language === 'fa'
                        ? 'مخفی کردن'
                        : 'Hide'
                      : language === 'fa'
                        ? 'مشاهده'
                        : 'Show'
                  }>
                  {showPassword ? (
                    <EyeOff size={18} className="sm:w-3.5 sm:h-3.5" />
                  ) : (
                    <Eye size={18} className="sm:w-3.5 sm:h-3.5" />
                  )}
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleCopy(entry.password || '', 'password');
                  }}
                  className="p-3.5 sm:p-2 rounded-md hover:bg-blue-500/10 text-slate-500 sm:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-95 touch-manipulation"
                  title={language === 'fa' ? 'کپی رمز عبور' : 'Copy Password'}>
                  {copiedField === 'password' ? (
                    <Check
                      size={18}
                      className="text-emerald-500 sm:w-4 sm:h-4"
                    />
                  ) : (
                    <Copy size={18} className="sm:w-3.5 sm:h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {entry.note && (
          <div className="space-y-1">
            <label className="block text-[10px] capitalize font-bold text-slate-400 dark:text-slate-500 tracking-widest">
              {t('note')}
            </label>
            <div
              onClick={() => handleCopy(entry.note || '', 'note')}
              className="flex items-start justify-between text-slate-600 dark:text-slate-400 text-sm bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-3.5 rounded-lg group/field transition-colors cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-700/80">
              <span className="flex-1 whitespace-pre-wrap leading-relaxed py-1">
                {entry.note}
              </span>
              <div className="flex gap-1 ml-2 sm:ml-2 opacity-100 sm:opacity-0 group-hover/field:opacity-100 transition-all shrink-0">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleCopy(entry.note || '', 'note');
                  }}
                  className="p-3.5 sm:p-2 rounded-md hover:bg-blue-500/10 text-slate-500 sm:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-95 touch-manipulation"
                  title={language === 'fa' ? 'کپی یادداشت' : 'Copy Note'}>
                  {copiedField === 'note' ? (
                    <Check
                      size={18}
                      className="text-emerald-500 sm:w-4 sm:h-4"
                    />
                  ) : (
                    <Copy size={18} className="sm:w-3.5 sm:h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deletePassword(entry.id);
          setIsDeleteModalOpen(false);
        }}
        title={t('confirmDelete')}
        message={deleteMsg}
        confirmText={(t('deletePassword') as any) || 'Delete'}
        cancelText={t('cancel')}
      />
    </motion.div>
  );
};
