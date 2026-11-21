'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const EXPRESSIONS = {
  happy: {
    mouthWidth: 9,
    mouthHeight: 4,
    mouthRadius: '0 0 10px 10px',
    mouthBackground: 'transparent',
    eyeScale: 1,
  },
  excited: {
    mouthWidth: 7,
    mouthHeight: 7,
    mouthRadius: '50%',
    mouthBackground: '#18181B',
    eyeScale: 1.15,
  },
};

export default function NovaMotionMascot({ size = 40, interactive = true }) {
  const [emotion, setEmotion] = useState('happy');
  const [blinking, setBlinking] = useState(false);
  const mascotRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(mouseX, { stiffness: 180, damping: 20 });
  const eyeY = useSpring(mouseY, { stiffness: 180, damping: 20 });
  const scale = size / 40;
  const expression = EXPRESSIONS[emotion];

  useEffect(() => {
    if (!interactive) return undefined;

    const handleMouseMove = (event) => {
      if (!mascotRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);

      mouseX.set(Math.max(-3, Math.min(3, dx / 25)));
      mouseY.set(Math.max(-3, Math.min(3, dy / 25)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  useEffect(() => {
    let blinkTimeout;
    let resetTimeout;

    const blink = () => {
      setBlinking(true);
      resetTimeout = window.setTimeout(() => setBlinking(false), 130);
      blinkTimeout = window.setTimeout(blink, 2200 + Math.random() * 2800);
    };

    blinkTimeout = window.setTimeout(blink, 1500);
    return () => {
      window.clearTimeout(blinkTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, []);

  return (
    <motion.div
      ref={mascotRef}
      aria-hidden="true"
      onMouseEnter={() => interactive && setEmotion('excited')}
      onMouseLeave={() => interactive && setEmotion('happy')}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size }}
      className="relative shrink-0 cursor-pointer overflow-hidden rounded-full border-[1.8px] border-[#18181B] bg-[#FFFDF7] shadow-sm"
    >
      <div className="absolute left-0 top-0 h-[53%] w-full">
        <span
          className="absolute rounded-full bg-[#18181B]"
          style={{
            top: size * 0.125,
            left: size * 0.2,
            width: size * 0.0625,
            height: size * 0.0625,
          }}
        />
        <span
          className="absolute rounded-full bg-[#18181B]"
          style={{
            top: size * 0.175,
            right: size * 0.2,
            width: size * 0.0625,
            height: size * 0.0625,
          }}
        />
      </div>

      <div
        className="absolute left-0 z-20 flex w-full items-center justify-center"
        style={{ top: size * 0.3, gap: size * 0.175 }}
      >
        {[0, 1].map((eye) => (
          <motion.div
            key={eye}
            style={{
              x: eyeX,
              y: eyeY,
              width: size * 0.15,
              height: size * 0.175,
            }}
            animate={{ scaleY: blinking ? 0.08 : expression.eyeScale }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="relative origin-center rounded-full bg-[#18181B]"
          >
            <span
              className="absolute rounded-full bg-white"
              style={{
                top: size * 0.025,
                right: size * 0.025,
                width: size * 0.05,
                height: size * 0.05,
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute left-1/2 z-20 -translate-x-1/2"
        animate={{
          width: expression.mouthWidth * scale,
          height: expression.mouthHeight * scale,
          borderRadius: expression.mouthRadius,
          backgroundColor: expression.mouthBackground,
          borderBottom:
            expression.mouthBackground === 'transparent'
              ? `${1.5 * scale}px solid #18181B`
              : 'none',
          bottom: size * (emotion === 'excited' ? 0.175 : 0.2),
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      <svg
        viewBox="0 0 40 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 block h-[48%] w-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z"
          fill="#18181B"
          animate={{
            d: [
              'M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z',
              'M0 3C8 7 13 2 21 4C29 7 33 1 40 5V22H0V3Z',
              'M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
