import axios, { AxiosResponse } from 'axios';
import { delData, getData, setData } from './asyncStore';
import { requestHttpPost } from './requestBase';

type AuthParams = {
  email: string;
  password: string;
};

export const authLogin = async (params: AuthParams): Promise<any> => {
  // let ret = false;
  const ret: { result: boolean; status: number | undefined } = {
    result: false,
    status: 0,
  };
  try {
    const res = await requestHttpPost(
      '/api/v1/auth/jwt/create/',
      params,
      false
    );
    if (res.result) {
      await setData('access', res.data.access);
      await setData('refresh', res.data.refresh);
      ret.result = true;
      ret.status = res.status;
      console.log('ret: ', ret);
    }
  } catch (e) {
    console.log('authLoginError=========');
    alert(e);
  }

  return ret;
};

export const createAccount = async (params: AuthParams): Promise<boolean> => {
  let ret = false;
  try {
    const createRes = await requestHttpPost(
      '/api/v1/user/create/',
      params,
      false
    );
    // if (createRes.status === 201) {
    if (true) {
      const tokenRes = await requestHttpPost(
        '/api/v1/auth/jwt/create/',
        params,
        false
      );
      await setData('access', tokenRes.data.access);
      await setData('refresh', tokenRes.data.refresh);
      ret = true;
    }
  } catch (e) {
    alert(e);
  }

  return ret;
};

export const postRefresh = async (baseUrl: string) => {
  const refresh = await getData('refresh');
  const { data }: AxiosResponse<{ access: string; refresh: string }> =
    await axios.post(baseUrl + '/api/v1/auth/jwt/refresh/', { refresh });
  await setData('access', data.access);
  await setData('refresh', data.refresh);
};

export const delToken = async (): Promise<void> => {
  await delData('access');
  await delData('refresh');
};
