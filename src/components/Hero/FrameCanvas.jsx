import React from 'react';

const FrameCanvas = React.forwardRef((props, ref) => {
  return (
    <canvas 
      ref={ref}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      id="frame-canvas"
    />
  );
});

FrameCanvas.displayName = 'FrameCanvas';

export default FrameCanvas;
