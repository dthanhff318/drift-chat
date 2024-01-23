import { useEffect } from 'react';

type Props = {
  parentRef: React.RefObject<any>;
  callback: () => void;
  triggerElement?: any;
};
const useClickOutSide = ({ parentRef, triggerElement, callback }: Props) => {
  const handleClickElement = (e) => {
    const targetElement = e.target;
    if (!parentRef.current || parentRef.current.contains(targetElement)) {
      return;
    }
    console.log(parentRef.current.contains(targetElement));

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
