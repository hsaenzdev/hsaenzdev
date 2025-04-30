import { useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

export const InputFocusHandler = () => {
  const { setInputFocused } = useGameContext();

  useEffect(() => {
    // Function to check if active element is an input field
    const isInputElement = (element: Element | null) => {
      if (!element) return false;
      
      const tagName = element.tagName.toLowerCase();
      return (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        (element as HTMLElement).isContentEditable ||
        element.getAttribute('role') === 'textbox'
      );
    };

    // Handle focus events to detect when user is typing
    const handleFocusChange = () => {
      const activeElement = document.activeElement;
      setInputFocused(isInputElement(activeElement));
    };

    // Initial check
    handleFocusChange();

    // Add event listeners for focus detection
    document.addEventListener('focusin', handleFocusChange);
    document.addEventListener('focusout', handleFocusChange);

    return () => {
      document.removeEventListener('focusin', handleFocusChange);
      document.removeEventListener('focusout', handleFocusChange);
    };
  }, [setInputFocused]);

  // This component doesn't render anything
  return null;
}; 