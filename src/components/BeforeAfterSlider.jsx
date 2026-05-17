import React, { useState } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, treatmentName, category, duration }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX, rect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-border-light group">
      {/* Interactive Slider Area */}
      <div
        className="relative h-[280px] w-full overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* After Image (Base Layer) */}
        <img
          src={afterImage}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute right-4 top-4 bg-primary/90 text-white font-semibold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
          After
        </div>

        {/* Before Image (Top Layer, clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Before treatment"
            className="absolute inset-0 w-full h-[280px] object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
            draggable="false"
          />
        </div>
        <div
          className="absolute left-4 top-4 bg-charcoal/90 text-white font-semibold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider z-20"
          style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
        >
          Before
        </div>

        {/* Slider Line Divider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle Button */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-primary border border-primary shadow-xl flex items-center justify-center font-bold text-[13px] select-none hover:scale-110 active:scale-95 transition-transform">
            &larr;&rarr;
          </div>
        </div>
      </div>

      {/* Info Bottom Card */}
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-charcoal font-bold text-[16px] leading-tight">{treatmentName}</h4>
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
            {category}
          </span>
        </div>
        <div className="flex items-center justify-between text-[13px] text-body-gray pt-1">
          <span>Client Skin Journey</span>
          {duration && (
            <span className="text-primary font-semibold">Duration: {duration}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
