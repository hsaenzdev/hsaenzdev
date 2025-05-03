import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Game state types
export type GameState = 'INACTIVE' | 'ACTIVE' | 'GAME_OVER';

interface GameContextType {
  isGameEnabled: boolean;
  enableGame: () => void;
  disableGame: () => void;
  toggleGame: () => void;
  score: number;
  setScore: (score: number) => void;
  isInputFocused: boolean;
  setInputFocused: (focused: boolean) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

const defaultGameContext: GameContextType = {
  isGameEnabled: false,
  enableGame: () => {},
  disableGame: () => {},
  toggleGame: () => {},
  score: 0,
  setScore: () => {},
  isInputFocused: false,
  setInputFocused: () => {},
  gameState: 'INACTIVE',
  setGameState: () => {}
};

const GameContext = createContext<GameContextType>(defaultGameContext);

export const useGameContext = () => useContext(GameContext);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [isGameEnabled, setIsGameEnabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isInputFocused, setInputFocused] = useState(false);
  const [gameState, setGameState] = useState<GameState>('INACTIVE');

  const enableGame = useCallback(() => {
    setIsGameEnabled(true);
  }, []);

  const disableGame = useCallback(() => {
    setIsGameEnabled(false);
  }, []);

  const toggleGame = useCallback(() => {
    setIsGameEnabled(prev => !prev);
  }, []);

  const value = {
    isGameEnabled,
    enableGame,
    disableGame,
    toggleGame,
    score,
    setScore,
    isInputFocused,
    setInputFocused,
    gameState,
    setGameState
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 