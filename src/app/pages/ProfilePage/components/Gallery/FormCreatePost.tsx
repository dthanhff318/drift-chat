import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { notification } from 'antd';
import Button from 'app/components/Button/Button';
import { listAllowImageType } from 'app/helpers/common';
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  ImagePlus,
  MinusCircle,
  Smile,
  XCircle,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';
import s from './style.module.scss';
import { IndexedObject } from 'types/common';
import postApi, { TDataCreatePost } from 'app/axios/api/postApi';
import postStore from 'app/storeZustand/postStore';
import axios from 'axios';
import { useMutation } from 'react-query';

type Props = {
  handleCloseModal: () => void;
};
const FormCreatePost = ({ handleCloseModal }: Props) => {
  const [step, setStep] = useState(1);
  const [filesList, setFilesList] = useState<File[]>([]);
  const [preview, setPreview] = useState<number>(0);
  const [caption, setCaption] = useState<string>('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { getPosts } = postStore();

  const rootElement = document.getElementById('root');
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleBackStep = () => setStep((prev) => prev - 1);
  const handleTriggerUpload = () => inputRef.current?.click();
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    if (!listAllowImageType.includes(files[0].type)) {
      notification.error({
        message: `File type invalid`,
        description: 'Only accept send image',
        duration: 4,
      });
      return;
    }
    setFilesList((prev) => {
      const newList = [...prev, files[0]];
      setPreview(newList.length - 1);
      return newList;
    });
  };

  const handleNextPreview = () => setPreview((e) => e + 1);
  const handlePrevPreview = () => setPreview((e) => e - 1);
  const removeImageUpload = () => {
    setFilesList((list) => {
      return list.filter((_, index) => index !== preview);
    });
    setPreview((e) => (e > 0 ? e - 1 : 0));
  };
  const handleEmojiSelect = (emojiObject: IndexedObject) =>
    setCaption(caption + emojiObject.native);
  const hasUpload = filesList.length > 0;
  const urlPreview = hasUpload && URL.createObjectURL(filesList[preview]);

  const createPostMutation = useMutation({
    mutationFn: (data: TDataCreatePost) => {
      console.log('df');

      return postApi.createPost(data);
    },
  });

  const handleUpPost = async () => {
    try {
      if (!filesList.length) return;
      const mappingFile = filesList.map((e) => ({
        fileName: e.name,
        fileType: e.type,
      }));
      const mappingFileName = filesList.map((e) => e.name);
      setLoading(true);
      const res = await postApi.signedImagePost(mappingFile);
      const signedUrl = res.data as unknown as string[];
      for (let i = 0; i < signedUrl.length; i++) {
        await axios.put(signedUrl[i], filesList[i]);
      }
      // await postApi.createPost({
      //   caption,
      //   fileNameList: mappingFileName,
      // });
      createPostMutation.mutate(
        {
          caption,
          fileNameList: mappingFileName,
        },
        {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (e) => {
            console.log(e);
          },
        },
      );
      setLoading(false);
      handleCloseModal();
    } catch (err) {
      setLoading(false);
    }
  };

  if (!rootElement) return null;
  return (
    document.getElementById('root') &&
    createPortal(
      <div className={s.formCreatePost}>
        <div className={s.formOverlay}>
          <XCircle size={39} className={s.closeIcon} color="#fff" onClick={handleCloseModal} />
        </div>
        <div className={s.main}>
          {step === 1 && (
            <div className={s.uploadWrap}>
              {hasUpload && preview !== 0 && (
                <ArrowLeftCircle
                  size={34}
                  fill="#fff"
                  className={`${s.navBtn} ${s.left}`}
                  onClick={handlePrevPreview}
                />
              )}
              {hasUpload && preview !== filesList.length - 1 && (
                <ArrowRightCircle
                  size={34}
                  fill="#fff"
                  className={`${s.navBtn} ${s.right}`}
                  onClick={handleNextPreview}
                />
              )}
              {hasUpload && filesList.length > 1 && (
                <div className={s.previewIndex}>{`${preview + 1}/${filesList.length}`}</div>
              )}
              {hasUpload && (
                <MinusCircle
                  fill="#fff"
                  size={34}
                  className={s.btnRemoveImage}
                  onClick={removeImageUpload}
                />
              )}
              {urlPreview ? (
                <img className={s.imagePost} src={urlPreview} alt="" />
              ) : (
                <div className={s.thumbUpload}>
                  <ImagePlus size={38} />
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className={s.inputCaption}>
              <TextareaAutosize
                className={s.input}
                placeholder="What do you think ?"
                maxRows={14}
                onChange={(e) => setCaption(e.target.value)}
                minRows={5}
                value={caption}
              />
              <div className={s.options}>
                <Smile size={28} className={s.btnEmoji} onClick={() => setShowEmoji(!showEmoji)} />
                {showEmoji && (
                  <div className={s.emojiWrap}>
                    <Picker
                      theme="dark"
                      data={data}
                      open={false}
                      onEmojiSelect={handleEmojiSelect}
                      emojiButtonSize={30}
                      emojiSize={24}
                      perLine={14}
                      previewPosition="none"
                      searchPosition="none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className={s.control}>
            {step === 1 ? (
              <Button text="Upload" onClick={handleTriggerUpload} />
            ) : (
              <Button text="Back" onClick={handleBackStep} />
            )}
            {step === 1 && (
              <Button text="Next" fill onClick={handleNextStep} disabled={!filesList.length} />
            )}
            {step === 2 && <Button text="Post" fill onClick={handleUpPost} loading={loading} />}
          </div>
        </div>
        <input
          type="file"
          className={s.inputUploadFile}
          ref={inputRef}
          onInput={handleUploadImage}
        />
      </div>,
      rootElement,
    )
  );
};

export default FormCreatePost;
