import { postData } from './fetchData';

export const getUser = async (email) => {
  return postData('user', email);
};
