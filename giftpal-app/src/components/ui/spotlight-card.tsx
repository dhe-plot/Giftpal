import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'pink' | 'cyan' | 'yellow' | 'teal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  animation?: 'none' | 'pulse' | 'breathe' | 'float';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  onClick?: () => void;
  hoverable?: boolean;
  disabled?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  pink: { base: 320, spread: 250 },
  cyan: { base: 180, spread: 180 },
  yellow: { base: 60, spread: 150 },
  teal: { base: 160, spread: 180 }
};

const sizeMap = {
  xs: 'w-40 h-48',
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
  xl: 'w-96 h-[28rem]'
};

const intensityMap = {
  low: { saturation: 60, lightness: 50, bgOpacity: 0.05, borderOpacity: 0.6 },
  medium: { saturation: 80, lightness: 60, bgOpacity: 0.1, borderOpacity: 0.8 },
  high: { saturation: 100, lightness: 70, bgOpacity: 0.15, borderOpacity: 1 }
};

const borderRadiusMap = {
  sm: '8',
  md: '12',
  lg: '16',
  xl: '20',
  full: '9999'
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
  intensity = 'medium',
  animation = 'none',
  borderRadius = 'lg',
  onClick,
  hoverable = true,
  disabled = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];
  const { saturation, lightness, bgOpacity, borderOpacity } = intensityMap[intensity];
  const radius = borderRadiusMap[borderRadius];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'breathe':
        return 'animate-breathe';
      case 'float':
        return 'animate-float';
      default:
        return '';
    }
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & Record<string, any> = {
      '--base': base,
      '--spread': spread,
      '--radius': radius,
      '--border': '3',
      '--backdrop': disabled ? 'hsl(0 0% 30% / 0.08)' : 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'var(--backdrop)',
      '--size': '200',
      '--outer': '1',
      '--saturation': saturation,
      '--lightness': lightness,
      '--bg-spot-opacity': bgOpacity,
      '--border-spot-opacity': borderOpacity,
      '--border-light-opacity': disabled ? 0.3 : 1,
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, ${saturation}) * 1%) calc(var(--lightness, ${lightness}) * 1%) / var(--bg-spot-opacity, ${bgOpacity})), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
      cursor: onClick ? (disabled ? 'not-allowed' : 'pointer') : 'default',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.3s ease',
    };

    if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        onClick={handleClick}
        className={`${getSizeClasses()} ${getAnimationClasses()} ${className}`}
        style={{
          ...getInlineStyles(),
          aspectRatio: !customSize ? '3/4' : 'auto',
          borderRadius: borderRadius === 'full' ? '50%' : borderRadius === 'xl' ? '24px' : borderRadius === 'lg' ? '16px' : borderRadius === 'md' ? '12px' : '8px',
          position: 'relative',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          boxShadow: '0 1rem 2rem -1rem black',
          padding: '16px',
          gap: '16px',
          backdropFilter: 'blur(5px)',
          transform: hoverable && !disabled ? 'scale(1)' : 'none',
          transition: 'all 0.3s ease',
          pointerEvents: disabled ? 'none' : 'auto'
        }}
        onMouseEnter={(e) => {
          if (hoverable && !disabled) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 2rem 4rem -1rem black';
          }
        }}
        onMouseLeave={(e) => {
          if (hoverable && !disabled) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 1rem 2rem -1rem black';
          }
        }}
      >
        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };

