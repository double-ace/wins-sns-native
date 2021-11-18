import { getData, setData } from './asyncStore';
import { requestHttpPost, ResponseData } from './requestBase';

type LoginParams = {
  email: string;
  password: string;
};

export const authLogin = async (params: LoginParams) => {
  let ret = false;
  try {
    const res = await requestHttpPost(
      '/api/v1/auth/jwt/create/',
      params,
      false
    );
    if (res.result) {
      await setData('access', res.data.access);
      await setData('refresh', res.data.refresh);
      ret = true;
    }
  } catch (e) {
    alert(e);
  }

  return ret;
};

export const useRefreshToken = async () => {
  const refresh = await getData('refresh');
  if (refresh) {
    await requestHttpPost('/api/v1/auth/jwt/refresh/', { refresh }, false);
  }
};
