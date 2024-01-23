import { useEffect } from 'react';

type Props = {
  parentRef: React.RefObject<any>;
  callback: () => void;
  triggerRef?: any;
};
const useClickOutSide = ({ parentRef, triggerRef, callback }: Props) => {
  const handleClickElement = (e) => {
    const targetElement = e.target;
    if (!parentRef.current || parentRef.current.contains(targetElement)) {
      return;
    }
    callback();
  };
  useEffect(() => {
    document.addEventListener('click', handleClickElement);
    return () => {
      document.removeEventListener('click', handleClickElement);
    };
  }, [parentRef]);
};

export default useClickOutSide;
