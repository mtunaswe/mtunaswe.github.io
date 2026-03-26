'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

const MOUSE_INTERPOLATION = { x: 0.1, y: 0.2 };
const TOUCH_IDLE_INTERPOLATION = { x: 0.03, y: 0.03 };

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/mtunaswe', Icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mtuna/', Icon: FaLinkedin },
  { label: 'Gmail', href: 'mailto:mtuna21@ku.edu.tr', Icon: SiGmail },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/merttna_?igsh=MWN3MzdheW4yNms1cQ%3D%3D&utm_source=qr',
    Icon: FaInstagram,
  },
];

function PenguinModel() {
  const anchorRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const interpolationRef = useRef({ ...MOUSE_INTERPOLATION });
  const { size } = useThree();

  const gltf = useGLTF('/assets/models/Penguins.glb');

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      interpolationRef.current = { ...MOUSE_INTERPOLATION };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.x = mouseX;
      mouseRef.current.y = mouseY;
      interpolationRef.current = { ...MOUSE_INTERPOLATION };
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        mouseRef.current = { x: 0, y: 0 };
        interpolationRef.current = { ...TOUCH_IDLE_INTERPOLATION };

        setTimeout(() => {
          interpolationRef.current = { ...MOUSE_INTERPOLATION };
        }, 1000);
      }, 2000);
    };

    document.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    const anchor = anchorRef.current;
    if (!anchor) {
      return;
    }

    const aspect = size.width / Math.max(size.height, 1);
    const isShortViewport = size.height < 760;

    let targetScale = 5.15;
    let targetX = 2.22;
    let targetY = -0.38;

    if (size.width < 480) {
      targetScale = 2.9;
      targetX = 0.46;
      targetY = -0.68;
    } else if (size.width < 640) {
      targetScale = 3.3;
      targetX = 0.55;
      targetY = -0.66;
    } else if (size.width < 768) {
      targetScale = 3.5;
      targetX = 0.64;
      targetY = -0.64;
    } else if (size.width < 900) {
      targetScale = 4.05;
      targetX = 1.05;
      targetY = -0.54;
    } else if (size.width < 1100) {
      targetScale = 4.45;
      targetX = 1.28;
      targetY = -0.5;
    } else if (size.width < 1366) {
      targetScale = 4.85;
      targetX = 1.95;
      targetY = -0.41;
    } else if (size.width < 1700) {
      targetScale = 5.0;
      targetX = 2.14;
      targetY = -0.38;
    }

    if (aspect < 1.55) {
      targetScale -= 0.3;
      targetX += 0.2;
    } else if (aspect > 2.15) {
      targetScale += 0.1;
      targetX -= 0.05;
    }

    if (isShortViewport) {
      targetScale *= 0.93;
      targetY -= 0.04;
    }

    const horizontalNudge = size.width < 768 ? 0.08 : 0.16;
    targetX += horizontalNudge;
    targetScale *= 1.04;

    anchor.scale.setScalar(targetScale);
    anchor.position.set(targetX, targetY, 0);

    const { x: mouseX, y: mouseY } = mouseRef.current;
    const { x: interpolationX, y: interpolationY } = interpolationRef.current;

    if (window.scrollY < 200) {
      const maxDownTilt = 0.48;
      const maxSideTurn = Math.PI / 7;
      const targetTiltX = -mouseY * maxDownTilt;
      const targetTurnY = mouseX * maxSideTurn;

      anchor.rotation.x = THREE.MathUtils.lerp(anchor.rotation.x, targetTiltX, interpolationX);
      anchor.rotation.y = THREE.MathUtils.lerp(anchor.rotation.y, targetTurnY, interpolationY);
    } else if (window.innerWidth > 1024) {
      anchor.rotation.x = THREE.MathUtils.lerp(anchor.rotation.x, 0, 0.03);
      anchor.rotation.y = THREE.MathUtils.lerp(anchor.rotation.y, 0, 0.03);
    }
  });

  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={anchorRef}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <primitive object={gltf.scene} />
        </group>
      </group>
    </Float>
  );
}

useGLTF.preload('/assets/models/Penguins.glb');

export default function HeroSection() {
  return (
    <section id="home-top" className="relative min-h-screen overflow-hidden bg-background">
      <div className="hero-canvas-enter pointer-events-none absolute inset-0 z-0">
        <Canvas
          camera={{ fov: 40, position: [0, 0.35, 11.6] }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#0F172A']} />
          <ambientLight intensity={0.95} />
          <directionalLight intensity={1.18} position={[2.4, 3.2, 3.2]} />
          <Suspense fallback={null}>
            <PenguinModel />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-14">
        <div className="max-w-2xl space-y-5 md:max-w-[56%] hero-enter">
          <p className="hero-enter-item text-xs uppercase tracking-[0.2em] text-slate-300">Student Developer · Engineer · Builder </p>
          <h1 className="hero-enter-item font-heading text-5xl font-extrabold leading-[0.98] text-slate-50 sm:text-6xl md:text-7xl lg:text-8xl">
            Mert <span className="text-brand-primary">Tuna</span>
          </h1>
          <p className="hero-enter-item max-w-xl font-body text-lg leading-relaxed text-slate-200 sm:text-xl">
            Passionate about building things.
          </p>

          <div id="socials" className="hero-enter-item pt-2">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/35 bg-brand-primary/10 text-slate-100 transition hover:bg-brand-primary/20"
                  data-cursor="disable"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="h-4 w-4 text-brand-primary transition group-hover:text-slate-100" />
                </a>
              ))}
              <a
                href="/assets/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex h-10 items-center rounded-full border border-brand-primary/45 bg-brand-primary/10 px-4 font-body text-xs font-semibold tracking-[0.08em] text-slate-100 transition hover:bg-brand-primary/20"
                data-cursor="disable"
                aria-label="Resume"
                title="Resume"
              >
                RESUME
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
