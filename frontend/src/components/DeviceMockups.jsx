import React from "react";
import { motion } from "framer-motion";

export const MacBookMockup = ({ children, url = "jouwsite.nl", className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={className}>
    <div className="bg-gray-200 dark:bg-neutral-700 rounded-t-xl pt-1.5 px-1.5">
      <div className="flex items-center gap-1.5 px-3 py-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
        <div className="w-2 h-2 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-3 bg-white/50 dark:bg-neutral-600 rounded-md px-3 py-0.5 text-center">
          <span className="text-[8px] text-gray-400">{url}</span>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-t-md overflow-hidden">
        {children}
      </div>
    </div>
    <div className="bg-gray-300 dark:bg-neutral-600 h-2.5 rounded-b-md mx-5" />
    <div className="bg-gray-200 dark:bg-neutral-700 h-1 rounded-b-lg mx-12" />
  </motion.div>
);

export const IPhoneMockup = ({ children, className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={className}>
    <div className="bg-gray-900 dark:bg-neutral-700 rounded-[22px] p-1.5 shadow-2xl border border-gray-700 dark:border-neutral-600">
      <div className="bg-white dark:bg-neutral-900 rounded-[18px] overflow-hidden">
        <div className="h-5 flex items-center justify-center">
          <div className="w-14 h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full" />
        </div>
        {children}
        <div className="h-1" />
      </div>
    </div>
  </motion.div>
);

// Pre-built mini website content for a generic business
export const MiniWebsite = ({ variant = "default" }) => {
  if (variant === "dashboard") return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="w-12 h-2 bg-gray-800 dark:bg-white rounded-sm" />
        <div className="w-5 h-5 bg-gray-100 dark:bg-neutral-800 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["bg-emerald-50 dark:bg-emerald-900/20","bg-sky-50 dark:bg-sky-900/20","bg-amber-50 dark:bg-amber-900/20"].map((c,i) => (
          <div key={i} className={`${c} rounded-lg p-2`}>
            <div className="h-3 w-6 bg-gray-700 dark:bg-white rounded-sm mb-1 text-[7px] font-bold" />
            <div className="h-0.5 bg-gray-300 dark:bg-neutral-600 rounded w-full" />
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-2 h-12" />
    </div>
  );

  if (variant === "status") return (
    <div className="p-3 space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <div className="w-16 h-1.5 bg-gray-800 dark:bg-white rounded-sm" />
      </div>
      {["Hosting","SSL","Snelheid","Backup"].map((s,i) => (
        <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-neutral-800 last:border-0">
          <span className="text-[8px] text-gray-500">{s}</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[7px] text-green-600 dark:text-green-400 font-bold">OK</span>
          </div>
        </div>
      ))}
    </div>
  );

  if (variant === "mobile-app") return (
    <div className="px-3 pb-3 space-y-2">
      <div className="h-2 bg-gray-900 dark:bg-white rounded w-2/3" />
      <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
      <div className="h-1 bg-gray-200 dark:bg-neutral-700 rounded w-4/5" />
      <div className="flex gap-1.5 mt-1">
        <div className="flex-1 py-1.5 bg-gray-800 dark:bg-white rounded-full">
          <div className="h-0.5 bg-white dark:bg-gray-900 rounded mx-auto w-8" />
        </div>
        <div className="flex-1 py-1.5 border border-gray-300 dark:border-neutral-600 rounded-full">
          <div className="h-0.5 bg-gray-400 rounded mx-auto w-8" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 mt-1">
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg h-10" />
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg h-10" />
      </div>
    </div>
  );

  // default - full website
  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="w-14 h-2 bg-gray-800 dark:bg-white rounded-sm" />
        <div className="flex gap-2">
          <div className="w-8 h-1 bg-gray-200 dark:bg-neutral-700 rounded-full" />
          <div className="w-8 h-1 bg-gray-200 dark:bg-neutral-700 rounded-full" />
          <div className="w-8 h-1 bg-gray-200 dark:bg-neutral-700 rounded-full" />
        </div>
      </div>
      <div className="space-y-1.5 mb-3">
        <div className="h-2.5 bg-gray-900 dark:bg-white rounded w-3/4" />
        <div className="h-1.5 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
        <div className="h-1.5 bg-gray-200 dark:bg-neutral-700 rounded w-2/3" />
      </div>
      <div className="flex gap-2 mb-3">
        <div className="px-3 py-1.5 bg-gray-800 dark:bg-white rounded-full"><div className="w-8 h-0.5 bg-white dark:bg-gray-900 rounded" /></div>
        <div className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 rounded-full"><div className="w-8 h-0.5 bg-gray-400 rounded" /></div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg h-10" />
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg h-10" />
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg h-10" />
      </div>
    </div>
  );
};
