import { useParams } from 'react-router-dom';

export const DEFAULT_PAST_TIME = '1970-01-01T00:00:00.000Z';

export const useService = () => {
  const { userId } = useParams<{ userId: string }>();

  console.log(userId);

  return {};
};
