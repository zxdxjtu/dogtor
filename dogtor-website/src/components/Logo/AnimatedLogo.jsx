import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dogtorLogo from '../../assets/images/dogtor.png';

const AnimatedLogo = ({ size = 'medium', autoPlay = true, className = '' }) => {
  const logoRef = useRef(null);
  const containerRef = useRef(null);

  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  useEffect(() => {
    const logo = logoRef.current;
    const container = containerRef.current;
    
    if (!logo || !container) return;

    // 创建动画时间线
    const tl = gsap.timeline({ 
      repeat: autoPlay ? -1 : 0, 
      yoyo: true,
      ease: "power2.inOut"
    });

    // 初始状态
    gsap.set(logo, {
      scale: 1,
      rotation: 0,
      transformOrigin: "center center"
    });

    // 动画序列
    tl.to(logo, {
      duration: 0.8,
      scale: 1.1,
      rotation: 5,
      ease: "power2.out"
    })
    .to(logo, {
      duration: 0.6,
      scale: 1.05,
      rotation: -3,
      ease: "power2.inOut"
    })
    .to(logo, {
      duration: 0.8,
      scale: 1,
      rotation: 0,
      ease: "power2.in"
    });

    // 鼠标悬停效果
    const handleMouseEnter = () => {
      if (!autoPlay) {
        gsap.to(logo, {
          duration: 0.3,
          scale: 1.1,
          rotation: 10,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      if (!autoPlay) {
        gsap.to(logo, {
          duration: 0.3,
          scale: 1,
          rotation: 0,
          ease: "power2.out"
        });
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tl.kill();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoPlay]);

  return (
    <div 
      ref={containerRef}
      className={`${sizeClasses[size]} ${className} cursor-pointer flex items-center justify-center`}
    >
      <img
        ref={logoRef}
        src={dogtorLogo}
        alt="Dogtor Logo"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
};

export default AnimatedLogo;