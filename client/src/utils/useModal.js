import { useState, useCallback } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [type, setType] = useState(null);

  const toggle = useCallback(() => {
    setIsShowing(!isShowing);
    setType(null);
  }, [isShowing]);

  return {
    isShowing,
    type,
    setIsShowing,
    setType,
    toggle
  };
};

export default useModal;
