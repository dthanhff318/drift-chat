import { useEffect } from 'react';

type Props = {
  parentRef: React.RefObject<any>;
  callback: () => void;
  triggerRef?: React.RefObject<any>;
};
const useClickOutSide = ({ parentRef, triggerRef, callback }: Props) => {
  const handleClickElement = (e) => {
    const targetElement = e.target;
    if (
      !parentRef?.current ||
      !triggerRef?.current ||
      parentRef?.current.contains(targetElement) ||
      triggerRef?.current.contains(targetElement) ||
      targetElement.closest('.ant-modal-root') ||
      targetElement.closest('.ant-popover')
    ) {
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
