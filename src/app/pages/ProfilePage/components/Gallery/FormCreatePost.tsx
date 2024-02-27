import Button from 'app/components/Button/Button';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import s from './style.module.scss';

const FormCreatePost = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleBackStep = () => setStep((prev) => prev - 1);
  const rootElement = document.getElementById('root');
  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <div className={s.formCreatePost}>
        <div className={s.formOverlay}></div>
        <div className={s.main}>
          {step === 1 && (
            <div className={s.uploadWrap}>
              <img
                className={s.imagePost}
                src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
                alt=""
              />
            </div>
          )}
          {step === 2 && (
            <div className={s.inputCaption}>
              <textarea className={s.input} />
            </div>
          )}
          <div className={s.control}>
            {step === 1 ? (
              <Button text="Upload" />
            ) : (
              <Button text="Back" onClick={handleBackStep} />
            )}
            <Button text="Next" fill onClick={handleNextStep} />
          </div>
        </div>
      </div>,
      rootElement,
    )
  );
};

export default FormCreatePost;
