import { TQuery } from 'types/common';
import { axiosClient } from '../axiosClient';
import queryString from 'query-string';

const servicesApi = {
  getUsers: (query: TQuery) => {
    const strQuery = queryString.stringify(query);
    return axiosClient.get(`/services/users?${strQuery}`);
  },
};

export default servicesApi;
