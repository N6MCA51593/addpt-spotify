import { useState, useCallback } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = useCallback(() => {
    setIsShowing(!isShowing);
  }, [isShowing]);

  return {
    isShowing,
    setIsShowing,
    toggle
  };
};

export default useModal;
