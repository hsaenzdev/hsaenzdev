import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { createSnakeGame } from './SnakeGame';
import { useGameContext } from '../context/GameContext';

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
  glowIntensity: number; // Controls the intensity of the glow effect
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
  const snakeGameRef = useRef<ReturnType<typeof createSnakeGame> | null>(null);
  const { isGameEnabled, isInputFocused, setScore } = useGameContext();
  
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
    const particleCount = window.innerWidth < 768 ? 45 : 85;
    
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
        transitionSpeed: 0.01 + Math.random() * 0.02,
        glowIntensity: 0.4 + Math.random() * 0.6 // Random glow intensity between 0.4 and 1.0
      });
    }
    
    particlesRef.current = newParticles;
  }, []);
  
  // Function to handle when a particle is eaten by the snake
  const handleParticleEaten = useCallback((index: number) => {
    if (index < 0 || index >= particlesRef.current.length) return;
    
    // Instead of removing the particle, regenerate it at a new position
    const particle = particlesRef.current[index];
    const colors = colorsRef.current;
    
    // Regenerate the particle at a random position
    particle.x = Math.random() * window.innerWidth;
    particle.y = Math.random() * window.innerHeight;
    particle.originalX = particle.x;
    particle.originalY = particle.y;
    particle.color = colors[Math.floor(Math.random() * colors.length)];
    particle.targetColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Update the score in the game context
    if (snakeGameRef.current) {
      setScore(snakeGameRef.current.getScore());
    }
  }, [setScore]);
  
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

  // Handle keyboard events for controlling the snake game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if input is focused to prevent game activation when typing
      if (isInputFocused) return;
      
      if (!snakeGameRef.current) return;
      
      // Enable the game when arrow keys are pressed and game is inactive
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) &&
        snakeGameRef.current.getGameState() === 'INACTIVE' &&
        isGameEnabled
      ) {
        snakeGameRef.current.startGame();
      }
      
      // Change snake direction when arrow keys are pressed
      if (snakeGameRef.current.getGameState() === 'ACTIVE') {
        switch (e.key) {
          case 'ArrowUp':
            snakeGameRef.current.changeDirection('UP');
            break;
          case 'ArrowDown':
            snakeGameRef.current.changeDirection('DOWN');
            break;
          case 'ArrowLeft':
            snakeGameRef.current.changeDirection('LEFT');
            break;
          case 'ArrowRight':
            snakeGameRef.current.changeDirection('RIGHT');
            break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameEnabled, isInputFocused]);
  
  // Draw particles on canvas
  useEffect(() => {
    if (!canvasRef.current || particlesRef.current.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Initialize snake game
    snakeGameRef.current = createSnakeGame({
      particles: particlesRef.current,
      onEatParticle: handleParticleEaten,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      ctx,
      theme
    });
    
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
              // Add a subtle glow to the connection lines
              const lineOpacity = 0.25 * (1 - distance / 100);
              
              // Add subtle glow to the lines for a more visible constellation effect
              ctx.shadowBlur = 1.5;
              ctx.shadowColor = p.color;
              
              // Draw a line between them with opacity based on distance
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              
              // Parse the color to get its RGB values for transparency
              ctx.strokeStyle = `rgba(${hexToRgb(p.color)}, ${lineOpacity})`;
              ctx.lineWidth = 0.7; // Slightly thicker lines for better visibility
              ctx.stroke();
              
              // Reset shadow for performance
              ctx.shadowBlur = 0;
              
              connections++;
            }
          }
        }
      }
      
      // Second pass: draw particles with glow
      particles.forEach(p => {
        const time = Date.now() * 0.001;
        // Enhanced glow pulse with more dynamic range for a more interesting effect
        const glowPulse = 0.4 * Math.sin(time * 0.001 * p.speed) + 0.8; // Value between 0.4 and 1.2
        const currentGlowIntensity = p.glowIntensity * glowPulse;
        
        // Enhanced glow effect with dynamic size and intensity
        ctx.shadowBlur = p.size * (4 + currentGlowIntensity * 6); // Increased base glow and intensity multiplier
        ctx.shadowColor = p.color;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Reset shadow for performance
        ctx.shadowBlur = 0;
      });
      
      // Update snake game if it's enabled
      if (isGameEnabled && snakeGameRef.current) {
        snakeGameRef.current.updateGame();
        
        // Update score in game context based on current game state
        const currentGameState = snakeGameRef.current.getGameState();
        if (currentGameState === 'INACTIVE') {
          // Reset score to 0 when game is inactive
          setScore(0);
        } else {
          // Update score when game is active or game over
          setScore(snakeGameRef.current.getScore());
        }
      }
      
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
  }, [hexToRgb, lerpColor, handleParticleEaten, isGameEnabled, theme, setScore]); // Dependencies updated
  
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