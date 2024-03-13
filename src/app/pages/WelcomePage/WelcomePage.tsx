import { getPublicImageUrl } from 'app/helpers/funcs';
import { pathLoginPage } from 'app/routes/routesConfig';
import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './style.module.scss';

const WelcomePage = () => {
  const history = useHistory();
  return (
    <div className={s.wrapperWelcome}>
      <div
        className={s.bgPage}
        style={{ backgroundImage: `url(${getPublicImageUrl('./bgWelcomePage.jpg')})` }}
      ></div>
      <div className={s.center}>
        <h3 className={s.title}>DRIFT</h3>
        <div className={s.buttonExplore} onClick={() => history.push(pathLoginPage)}>
          EXPLORE
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
