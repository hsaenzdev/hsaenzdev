import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  targetColor: string;
  speed: number;
  baseSize: number; // Original size for pulsing effect
  transitionSpeed: number;
  originalX: number; // Remember original position
  originalY: number;
}

export const ParticleBackground = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef<{ x: number | null, y: number | null }>({ x: null, y: null });
  const animationFrameRef = useRef<number | null>(null);
  const frameCount = useRef(0);
  const colorsRef = useRef<string[]>([]);
  const isInitializedRef = useRef(false);
  
  // Memoize color-related functions
  const hexToRgb = useCallback((hex: string): string => {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }, []);
  
  // Helper function to interpolate between two colors
  const lerpColor = useCallback((color1: string, color2: string, factor: number): string => {
    // Extract RGB components
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Interpolate
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }, []);
  
  // Update theme colors
  useEffect(() => {
    colorsRef.current = [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.secondary.main,
      theme.palette.secondary.light,
      theme.palette.accent1?.main,
      theme.palette.accent2?.main,
      theme.palette.accent3?.main,
    ].filter(Boolean) as string[];
    
    // Only generate particles if they haven't been initialized yet
    if (!isInitializedRef.current) {
      generateParticles();
      isInitializedRef.current = true;
    }
  }, [theme]);
  
  // Generate particles
  const generateParticles = useCallback(() => {
    const colors = colorsRef.current;
    const newParticles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
      const size = 1 + Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      newParticles.push({
        x: x,
        y: y,
        originalX: x,
        originalY: y,
        size: size,
        baseSize: size,
        color: color,
        targetColor: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.2 + Math.random() * 0.3,
        transitionSpeed: 0.01 + Math.random() * 0.02
      });
    }
    
    particlesRef.current = newParticles;
  }, []);
  
  // Track mouse position - but with heavy throttling to prevent rapid changes
  useEffect(() => {
    let lastUpdate = 0;
    const throttleMs = 16; // ~60fps for smoother tracking
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate > throttleMs) {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
        lastUpdate = now;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Draw particles on canvas
  useEffect(() => {
    if (!canvasRef.current || particlesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Redistribute particles after resize
        particlesRef.current.forEach(p => {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          p.x = x;
          p.y = y;
          p.originalX = x;
          p.originalY = y;
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return;
      
      frameCount.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get the current particles
      const particles = particlesRef.current;
      const colors = colorsRef.current;
      const mousePosition = mousePositionRef.current;
      
      // First pass: update positions and draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const time = Date.now() * 0.001;
        
        // Calculate base movement
        const driftX = Math.sin(time * p.speed) * 0.3;
        const driftY = Math.cos(time * p.speed) * 0.3;
        
        // Force that gently pulls back to original position
        const homeForce = 0.003; // Very subtle
        const homeX = (p.originalX - p.x) * homeForce;
        const homeY = (p.originalY - p.y) * homeForce;
        
        // Cursor avoidance (but very gentle)
        let avoidX = 0;
        let avoidY = 0;
        
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = p.x - mousePosition.x;
          const dy = p.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only avoid cursor within a small radius
          if (distance < 100) { // Increased radius for better visibility
            const angle = Math.atan2(dy, dx);
            // Apply smoother force that decreases with distance
            const force = Math.min(0.3, (100 - distance) / 100 * 0.3);
            
            avoidX = Math.cos(angle) * force;
            avoidY = Math.sin(angle) * force;
          }
        }
        
        // Apply all forces with gradual movement
        p.x += driftX + homeX + avoidX;
        p.y += driftY + homeY + avoidY;
        
        // Add subtle pulsing effect
        p.size = p.baseSize * (1 + Math.sin(time * 0.002 * p.speed) * 0.2);
        
        // Occasionally change target color
        if (Math.random() < 0.001) {
          p.targetColor = colors[Math.floor(Math.random() * colors.length)];
        }
        
        // Transition current color towards target color
        p.color = lerpColor(p.color, p.targetColor, p.transitionSpeed);
        
        // Wrap around screen edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Performance optimization: only draw connections every other frame
        if (frameCount.current % 2 === 0) {
          // Limit the number of connections per particle
          const maxConnections = 5;
          let connections = 0;
          
          // Draw connections between nearby particles
          for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              // Draw a line between them with opacity based on distance
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              
              // Parse the color to get its RGB values for transparency
              const opacity = 0.15 * (1 - distance / 100);
              ctx.strokeStyle = `rgba(${hexToRgb(p.color)}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
              
              connections++;
            }
          }
        }
      }
      
      // Second pass: draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [hexToRgb, lerpColor]); // Removed mousePosition from dependencies
  
  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}; 