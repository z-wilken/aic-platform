'use client';

import { motion } from 'framer-motion';

const ProblemStatement = () => {
  const stats = [
    {
      value: "85.1%",
      label: "Favoritism",
      desc: "Bias rates found in automated resume screening systems.",
      source: "UW Study, 2024"
    },
    {
      value: "$365K",
      label: "Liability",
      desc: "First EEOC penalty for automated age-discrimination.",
      source: "iTutorGroup, 2024"
    },
    {
      value: "Sec. 71",
      label: "Regulatory",
      desc: "The POPIA clause mandating human intervention.",
      source: "SA Constitution"
    }
  ];

  return (
    <div className="bg-white py-32 border-y border-aic-black/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-aic-black/5">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pt-16 md:pt-0 md:px-12 first:pl-0 last:pr-0"
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                className="text-6xl font-serif font-medium text-aic-black mb-6 tracking-tight"
              >
                {stat.value}
              </motion.div>
              <h3 className="font-mono text-[10px] font-bold text-aic-gold uppercase tracking-widest mb-4">
                {stat.label}
              </h3>
              <p className="text-gray-500 font-serif leading-relaxed text-sm">
                {stat.desc}
              </p>
              <p className="mt-4 text-[9px] font-mono text-gray-300 uppercase">
                Source: {stat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemStatement;
