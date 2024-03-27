export const playMessComingAudio = () => {
  const audioEle = document.querySelector('#mess-coming-audio') as HTMLAudioElement;
  audioEle && audioEle.play();
};
