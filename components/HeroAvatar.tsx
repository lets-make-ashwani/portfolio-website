'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Zap, Coffee } from 'lucide-react';
import { AVATAR_URL } from '@/data/projects';

export default function HeroAvatar() {
  const { scrollY } = useScroll();

  // Rotating angles for the 3 float badges as user scrolls
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [120, 480]);
  const rotate3 = useTransform(scrollY, [0, 1000], [240, 600]);

  // Counter-rotate the inner badges so text stays right-side up while orbiting
  const counterRotate1 = useTransform(scrollY, [0, 1000], [0, -360]);
  const counterRotate2 = useTransform(scrollY, [0, 1000], [-120, -480]);
  const counterRotate3 = useTransform(scrollY, [0, 1000], [-240, -600]);

  return (
    <div className="home-hero__avatar-wrap" style={{ position: 'relative' }}>
      <div className="home-hero__avatar-ring">
        <Image
          src={AVATAR_URL}
          alt="Ashwani Vishwakarma - Software Developer"
          width={260}
          height={260}
          priority
          className="home-hero__avatar"
        />
      </div>

      {/* Orbiting float 1: Python */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          rotate: rotate1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%) translateX(var(--orbit-radius-1, 175px))',
          }}
        >
          <motion.div style={{ rotate: counterRotate1 }}>
            <div className="home-hero__float" style={{ position: 'relative', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' }}>
              <Code2 size={18} className="blue" aria-hidden="true" /> Python
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Orbiting float 2: Automation */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          rotate: rotate2,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%) translateX(var(--orbit-radius-2, 195px))',
          }}
        >
          <motion.div style={{ rotate: counterRotate2 }}>
            <div className="home-hero__float" style={{ position: 'relative', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' }}>
              <Zap size={18} style={{ color: '#a855f7' }} aria-hidden="true" /> Automation
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Orbiting float 3: Late nights */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          rotate: rotate3,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%) translateX(var(--orbit-radius-3, 170px))',
          }}
        >
          <motion.div style={{ rotate: counterRotate3 }}>
            <div className="home-hero__float" style={{ position: 'relative', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto' }}>
              <Coffee size={18} style={{ color: '#f59e0b' }} aria-hidden="true" /> Late nights
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
