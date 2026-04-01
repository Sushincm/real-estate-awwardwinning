import React from 'react';

const TagPill = ({ children }) => {
  return (
    <div className="tag-pill px-6 py-2.5 bg-white/95 backdrop-blur-md rounded-xl text-black text-[10px] font-black tracking-widest uppercase shadow-xl transition-all duration-300 border border-black/5 hover:scale-105 hover:border-black/20 cursor-default">
      {children}
    </div>
  );
};

export default TagPill;
