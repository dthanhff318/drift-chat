import { getPublicImageUrl } from 'app/helpers/funcs';
import { getTokenFromLocalStorage } from 'app/helpers/localStorage';
import { pathObj } from 'app/routes/routesConfig';
import authStore from 'app/storeZustand/authStore';
import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';

const WelcomePage = () => {
  const history = useHistory();
  const { currentUser } = authStore();
  const token = getTokenFromLocalStorage();
  const checkAuth = currentUser.id || token;

  const handleClickExploreBtn = () => {
    if (checkAuth) {
      history.push(pathObj.homePage);
    } else {
      history.push(pathObj.loginPage);
    }
  };
  return (
    <div className={s.wrapperWelcome}>
      <div
        className={s.bgPage}
        style={{ backgroundImage: `url(${getPublicImageUrl('./bgWelcomePage.jpg')})` }}
      ></div>
      <div className={s.center}>
        <h3 className={s.title}>DRIFT</h3>
        <div className={s.buttonExplore} onClick={handleClickExploreBtn}>
          EXPLORE
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
