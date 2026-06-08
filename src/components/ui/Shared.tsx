import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-colors overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors my-auto">
              <div className="p-6 max-h-[85vh] overflow-y-auto scrollbar-hide">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {title}
                </h3>
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
}) {
  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20',
    secondary:
      'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors',
  };

  return (
    <button
      className={`px-5 py-3 sm:px-4 sm:py-2 rounded-lg transition-all active:scale-95 font-semibold disabled:opacity-50 disabled:pointer-events-none touch-manipulation ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}

export function Input({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}) {
  const { language } = useApp();
  const isRtl = language === 'fa';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 capitalize tracking-widest mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 sm:py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-sm touch-manipulation',
          isRtl ? 'text-right' : 'text-left',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-[10px] mt-1 font-bold capitalize">
          {error}
        </p>
      )}
    </div>
  );
}

export function Select({
  label,
  options,
  error,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}) {
  const { language } = useApp();
  const isRtl = language === 'fa';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 capitalize tracking-widest mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            'w-full px-4 py-3 sm:py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none text-sm touch-manipulation cursor-pointer',
            isRtl ? 'text-right' : 'text-left',
          )}
          {...props}>
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white dark:bg-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
        <div
          className={`absolute inset-y-0 ${isRtl ? 'left-3' : 'right-3'} flex items-center pointer-events-none text-slate-400`}>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-[10px] mt-1 font-bold capitalize">
          {error}
        </p>
      )}
    </div>
  );
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  onChange: (value: string) => void;
  title: string;
  className?: string;
  error?: string;
}

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  title,
  className,
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedOption = options.find(opt => opt.value === value) || options[0];
  const { language } = useApp();
  const isRtl = language === 'fa';

  return (
    <div className={cn('mb-4', className)}>
      {label && (
        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 capitalize tracking-widest mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'w-full px-4 py-3 sm:py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 active:scale-[0.98] text-sm shadow-sm',
        )}>
        <span className="flex items-center gap-2">
          {selectedOption?.icon}
          {selectedOption?.label}
        </span>
        <svg
          className="w-4 h-4 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {error && (
        <p className="text-red-500 text-[10px] mt-1 font-bold capitalize">
          {error}
        </p>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <div className="grid gap-2">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full p-4 rounded-xl flex items-center gap-4 transition-all text-sm font-medium',
                isRtl ? 'text-right' : 'text-left',
                value === opt.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
              )}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  value === opt.value
                    ? 'bg-white/20'
                    : 'bg-slate-200 dark:bg-slate-700',
                )}>
                {opt.icon || opt.label.charAt(0).toUpperCase()}
              </div>
              <span className="flex-1 truncate">{opt.label}</span>
              {value === opt.value && (
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export function TextArea({
  label,
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
}) {
  const { language } = useApp();
  const isRtl = language === 'fa';

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 capitalize tracking-widest mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-sm min-h-[100px] resize-y',
          isRtl ? 'text-right' : 'text-left',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-[10px] mt-1 font-bold capitalize">
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  ...props
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'>) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group mb-2">
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          {...props}
        />
        <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded-md transition-all group-hover:border-blue-500 peer-checked:bg-blue-600 peer-checked:border-blue-600"></div>
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant?: 'danger' | 'primary';
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        {message}
      </p>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
