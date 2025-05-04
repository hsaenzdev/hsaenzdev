import { useEffect, useRef } from "react";
import { useTheme, alpha } from "@mui/material";

interface ProjectAnimation {
  containerId: string;
}

export const ProjectAnimation = ({ containerId }: ProjectAnimation) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create canvas if needed
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "0";
      canvasRef.current = canvas;
      container.appendChild(canvas);
    }

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas || !container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create particles
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get color values from theme
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const accentColor = theme.palette.accent1.main;

    // Sprite class for pixel particles
    class Pixel {
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 6 + 3;

        // Randomly select a color
        const colors = [primaryColor, secondaryColor, accentColor];
        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.speed = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        // Move in a slight wave pattern
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Rotate the pixel
        this.rotation += this.rotationSpeed;

        // Wrap around the screen
        if (this.x < -this.size) this.x = canvas!.width + this.size;
        if (this.x > canvas!.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas!.height + this.size;
        if (this.y > canvas!.height + this.size) this.y = -this.size;
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw a pixelated square
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        ctx.restore();
      }
    }

    // Create pixels
    const numPixels = Math.min(Math.max(container.offsetWidth / 20, 15), 50);
    const pixels: Pixel[] = [];

    for (let i = 0; i < numPixels; i++) {
      pixels.push(new Pixel());
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with a subtle background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Optional: Draw some pixel grid lines
      ctx.strokeStyle = alpha(theme.palette.primary.main, 0.1);
      ctx.lineWidth = 1;

      const gridSize = 30;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw pixels
      pixels.forEach((pixel) => {
        pixel.update();
        pixel.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const animationRef = { current: 0 };
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", setCanvasSize);
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, [containerId, theme]);

  return null; // This component doesn't render any visible JSX
};
