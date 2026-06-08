import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Globe, Zap, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Shared';
import Footer from '@/src/Footer';

export function Hero({
  onStart,
  onImport,
}: {
  onStart: () => void;
  onImport?: () => void;
}) {
  const { t, translations, language } = useApp();
  const faqData = translations[language].faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-colors">
              {t('heroTitle')}
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                className="text-lg px-8 py-4 !rounded-2xl"
                onClick={onStart}>
                {t('getStarted')}
              </Button>
              {onImport && (
                <Button
                  variant="secondary"
                  className="text-lg px-8 py-4 !rounded-2xl border-2 border-slate-200 dark:border-slate-800"
                  onClick={onImport}>
                  {t('import')}
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers />,
                title: t('featSecured'),
                desc: t('featSecuredDesc'),
              },
              {
                icon: <Globe />,
                title: t('featGlobal'),
                desc: t('featGlobalDesc'),
              },
              { icon: <Zap />, title: t('featZero'), desc: t('featZeroDesc') },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass p-8 rounded-2xl text-center hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border-slate-200 dark:border-slate-700/50">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-4xl mx-auto py-24 px-4 border-t border-slate-200 dark:border-slate-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="w-12 h-12 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 font-bold uppercase text-[10px]">
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {t('faqTitle' as any)}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {t('faqSubtitle' as any)}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 group">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white text-left leading-tight">
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-400">
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
