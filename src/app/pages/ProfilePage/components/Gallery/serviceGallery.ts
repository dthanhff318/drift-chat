import authStore from 'app/storeZustand/authStore';
import profileStore from 'app/storeZustand/profileStore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type TLoadingHeaderProfile = '' | 'avatar' | 'thumb';

export const useServiceGallery = () => {
  const { userId } = useParams<{ userId: string }>();

  const [loading, setLoading] = useState<TLoadingHeaderProfile>('');

  const { currenTUser } = authStore();
  const { profileUser, saveProfileUser } = profileStore();

  return {};
};
