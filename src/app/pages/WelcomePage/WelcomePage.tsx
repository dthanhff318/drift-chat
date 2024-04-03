import { getPublicImageUrl } from 'app/helpers/funcs';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import { pathObj } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';

const WelcomePage = () => {
  const history = useHistory();
  const { currentUser } = authStore();
  const token = getTokenFromLocalStorage();
  const checkAuth = currentUser.id || token;

  const leafRef = useRef<HTMLImageElement>(null);

  const handleClickExploreBtn = () => {
    if (checkAuth) {
      history.push(pathObj.homePage);
    } else {
      history.push(pathObj.loginPage);
    }
  };
  return (
    <div className={s.wrapperWelcome}>
      <img className={`${s.imgParalax}`} src={getPublicImageUrl('./paralax/hill1.png')} alt="" />
      <img className={s.imgParalax} src={getPublicImageUrl('./paralax/hill2.png')} alt="" />
      <img className={s.imgParalax} src={getPublicImageUrl('./paralax/hill3.png')} alt="" />
      <img className={s.imgParalax} src={getPublicImageUrl('./paralax/hill4.png')} alt="" />
      <img className={s.imgParalax} src={getPublicImageUrl('./paralax/hill5.png')} alt="" />
      <div className={s.textParalax}>
        <h3 className={s.title}>DRIFT</h3>
      </div>

      <img className={`${s.imgParalax} `} src={getPublicImageUrl('./paralax/tree.png')} alt="" />
      <img className={`${s.imgParalax}`} src={getPublicImageUrl('./paralax/plant.png')} alt="" />
      <img
        ref={leafRef}
        className={`${s.imgParalax}`}
        src={getPublicImageUrl('./paralax/leaf.png')}
        alt=""
      />
      <div className={s.buttonExplore} onClick={handleClickExploreBtn}>
        EXPLORE
      </div>
    </div>
  );
};

export default WelcomePage;
