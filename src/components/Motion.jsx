"use client";

import { motion } from "framer-motion";
import React from "react";

export const MotionCard = ({ children, i }) => {
  return (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export const MotionSection = ({ children }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 30 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 max-w-3xl mx-auto"
    >
      {children}
    </motion.section>
  );
};
