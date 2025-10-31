import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const tag = target.tagName?.toLowerCase();
      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(Boolean(clickable) || tag === 'a' || tag === 'button');
    };

    const onDown = () => {
      if (ringRef.current) ringRef.current.classList.add('click');
    };
    const onUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('click');
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    if (ringRef.current) {
      ringRef.current.classList.toggle('hover', hovering);
    }
  }, [hovering]);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CustomCursor;

