import { useEffect } from 'react';

type Props = {
  parentRef: React.RefObject<any>;
  callback: () => void;
  triggerElement?: any;
};
const useClickOutSide = ({ parentRef, triggerElement, callback }: Props) => {
  const handleClickElement = (e) => {
    console.log(parentRef);

    const targetElement = e.target;
    if (!parentRef.current || parentRef.current.contains(targetElement)) {
      return;
    }
    callback();
  };
  useEffect(() => {
    document.addEventListener('click', handleClickElement);
    return () => {
      console.log(12);

      document.removeEventListener('click', handleClickElement);
    };
  }, [parentRef]);
};

export default useClickOutSide;
