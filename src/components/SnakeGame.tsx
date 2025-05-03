// Define Snake segment structure
import { GameState } from '../context/GameContext';

interface SnakeSegment {
  x: number;
  y: number;
}

// Define direction types
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Props for the SnakeGame component
interface SnakeGameProps {
  particles: any[]; // Will be replaced with actual Particle type
  onEatParticle: (index: number) => void;
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D | null;
  theme: any; // For colors
}

export const createSnakeGame = ({
  particles,
  onEatParticle,
  canvasWidth,
  canvasHeight,
  ctx,
  theme
}: SnakeGameProps) => {
  // State variables using plain objects instead of hooks
  let snake: SnakeSegment[] = [];
  let direction: Direction = 'RIGHT';
  let speed: number = 10; // Increased initial speed from 5 to 10
  let gameState: GameState = 'INACTIVE';
  let lastMoveTime: number = 0;
  let score: number = 0;
  const gridSize: number = 10; // Size of each snake segment
  
  // Add a transition flag to track game over cooldown
  let isInTransition: boolean = false;
  
  // Sidenav width for collision handling - based on SideNav component
  const sideNavWidth = 280; // Width of the sidenav in pixels
  
  // Colors
  const snakeHeadColor = theme.palette.primary.main;
  const snakeBodyColor = theme.palette.secondary.main;
  const snakeGlowColor = theme.palette.primary.light;
  
  // Initialize snake when game becomes active
  const initializeSnake = () => {
    // Start with 3 segments in the middle of the playable area (excluding sidenav)
    const playableWidth = canvasWidth - sideNavWidth;
    const centerX = sideNavWidth + Math.floor(playableWidth / 2 / gridSize) * gridSize;
    const centerY = Math.floor(canvasHeight / 2 / gridSize) * gridSize;
    
    snake = [
      { x: centerX, y: centerY },
      { x: centerX - gridSize, y: centerY },
      { x: centerX - gridSize * 2, y: centerY }
    ];
    
    direction = 'RIGHT';
    speed = 10; // Increased initial speed
    score = 0;
    gameState = 'ACTIVE';
  };
  
  // Move the snake based on current direction
  const moveSnake = () => {
    if (gameState !== 'ACTIVE' || !snake.length) return;
    
    const now = Date.now();
    // Control snake speed - move every X milliseconds
    if (now - lastMoveTime < 1000 / speed) return;
    lastMoveTime = now;
    
    const head = { ...snake[0] };
    
    // Move head based on direction
    switch (direction) {
      case 'UP':
        head.y -= gridSize;
        break;
      case 'DOWN':
        head.y += gridSize;
        break;
      case 'LEFT':
        head.x -= gridSize;
        break;
      case 'RIGHT':
        head.x += gridSize;
        break;
    }
    
    // Check boundaries - game over if snake hits the edges, but account for sidenav
    if (
      (head.x < sideNavWidth && direction === 'LEFT') ||  // Left boundary is the sidenav edge
      head.x >= canvasWidth || 
      head.y < 0 || 
      head.y >= canvasHeight
    ) {
      gameState = 'GAME_OVER';
      return;
    }
    
    // Check self-collision - game over if snake hits itself
    for (let i = 0; i < snake.length; i++) {
      const segment = snake[i];
      if (head.x === segment.x && head.y === segment.y) {
        gameState = 'GAME_OVER';
        return;
      }
    }
    
    // Check particle collision
    let particleEaten = false;
    let eatenParticleIndex = -1;
    
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      // Calculate distance between snake head and particle
      const distance = Math.sqrt(
        Math.pow(head.x + gridSize / 2 - particle.x, 2) +
        Math.pow(head.y + gridSize / 2 - particle.y, 2)
      );
      
      // If close enough, consider it eaten
      if (distance < gridSize + particle.size) {
        particleEaten = true;
        eatenParticleIndex = i;
        break;
      }
    }
    
    // Create new snake array with head at the beginning
    const newSnake = [head, ...snake];
    
    // If no particle was eaten, remove the tail; otherwise keep it to grow
    if (!particleEaten) {
      newSnake.pop();
    } else {
      // Notify parent component that particle was eaten
      onEatParticle(eatenParticleIndex);
      // Increase score and speed
      score += 1;
      if (score % 3 === 0) { // Speed increases more frequently (every 3 points instead of 5)
        speed += 2; // Increase speed more aggressively
      }
    }
    
    snake = newSnake;
  };
  
  // Draw snake on canvas
  const drawSnake = () => {
    if (!ctx || gameState === 'INACTIVE') return;
    
    // Draw snake segments
    snake.forEach((segment, index) => {
      // Head is different color than body
      const isHead = index === 0;
      
      // Add glow effect
      ctx.shadowBlur = isHead ? 15 : 10;
      ctx.shadowColor = snakeGlowColor;
      
      // Draw rounded rectangle for each segment
      ctx.fillStyle = isHead ? snakeHeadColor : snakeBodyColor;
      
      // Draw rounded segments for smoother appearance
      const radius = gridSize / 3;
      ctx.beginPath();
      ctx.moveTo(segment.x + radius, segment.y);
      ctx.arcTo(segment.x + gridSize, segment.y, segment.x + gridSize, segment.y + radius, radius);
      ctx.arcTo(segment.x + gridSize, segment.y + gridSize, segment.x + gridSize - radius, segment.y + gridSize, radius);
      ctx.arcTo(segment.x, segment.y + gridSize, segment.x, segment.y + gridSize - radius, radius);
      ctx.arcTo(segment.x, segment.y, segment.x + radius, segment.y, radius);
      ctx.closePath();
      ctx.fill();
      
      // Draw eyes for the head
      if (isHead) {
        ctx.fillStyle = '#ffffff';
        
        // Position eyes based on direction
        let eye1X, eye1Y, eye2X, eye2Y;
        const eyeSize = gridSize / 4;
        const eyeOffset = gridSize / 3;
        
        switch (direction) {
          case 'RIGHT':
            eye1X = segment.x + gridSize - eyeOffset;
            eye1Y = segment.y + eyeOffset - eyeSize/2;
            eye2X = segment.x + gridSize - eyeOffset;
            eye2Y = segment.y + gridSize - eyeOffset;
            break;
          case 'LEFT':
            eye1X = segment.x + eyeOffset - eyeSize;
            eye1Y = segment.y + eyeOffset - eyeSize/2;
            eye2X = segment.x + eyeOffset - eyeSize;
            eye2Y = segment.y + gridSize - eyeOffset;
            break;
          case 'UP':
            eye1X = segment.x + eyeOffset - eyeSize/2;
            eye1Y = segment.y + eyeOffset - eyeSize;
            eye2X = segment.x + gridSize - eyeOffset;
            eye2Y = segment.y + eyeOffset - eyeSize;
            break;
          case 'DOWN':
            eye1X = segment.x + eyeOffset - eyeSize/2;
            eye1Y = segment.y + gridSize - eyeOffset;
            eye2X = segment.x + gridSize - eyeOffset;
            eye2Y = segment.y + gridSize - eyeOffset;
            break;
        }
        
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
        ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Reset shadow for performance
    ctx.shadowBlur = 0;
  };
  
  // Game over visual effect
  const drawGameOverEffect = () => {
    if (!ctx || gameState !== 'GAME_OVER') return;
    
    // Fade out effect
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = theme.palette.error.main;
    
    // Make the snake "explode"
    snake.forEach((segment) => {
      // Expand segments slightly in game over state
      const explosionFactor = 1.2;
      
      // Draw exploding segment
      ctx.beginPath();
      ctx.arc(
        segment.x + gridSize / 2, 
        segment.y + gridSize / 2, 
        gridSize / 2 * explosionFactor, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
    });
    
    // Reset alpha
    ctx.globalAlpha = 1;
  };
  
  // Handle keyboard input for snake direction
  const changeDirection = (newDirection: Direction) => {
    // Prevent 180-degree turns (can't go directly opposite direction)
    const currentDirection = direction;
    
    if (
      (currentDirection === 'UP' && newDirection === 'DOWN') ||
      (currentDirection === 'DOWN' && newDirection === 'UP') ||
      (currentDirection === 'LEFT' && newDirection === 'RIGHT') ||
      (currentDirection === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    
    direction = newDirection;
  };
  
  // Update game state
  const updateGame = () => {
    if (gameState === 'ACTIVE') {
      moveSnake();
      drawSnake();
    } else if (gameState === 'GAME_OVER') {
      drawGameOverEffect();
      // Reset game after a short delay
      if (!isInTransition) {
        isInTransition = true;
        setTimeout(() => {
          gameState = 'INACTIVE';
          isInTransition = false;
        }, 1000);
      }
    }
  };
  
  // Start the game
  const startGame = () => {
    // Prevent starting game during transition or when not inactive
    if (gameState !== 'INACTIVE' || isInTransition) return;
    initializeSnake();
  };
  
  return {
    updateGame,
    startGame,
    changeDirection,
    getGameState: () => gameState,
    getScore: () => score,
    isInTransition: () => isInTransition
  };
}; 