import axios, { AxiosResponse } from 'axios';
import { getData } from './asyncStore';

const baseUrl = 'http://192.168.11.2:8080';

type ResponseData = {
  result: boolean;
  data: any;
};

export const requestHttpGet = async (
  endpoint: string,
  param?: { [key: string]: string }
) => {
  let ret: ResponseData = {
    result: false,
    data: [],
  };
  let queryPath = '';
  const queryList = [];

  if (param) {
    queryPath = '?';
    for (const [key, value] of Object.entries(param)) {
      queryList.push(key + '=' + value);
    }
    queryPath = queryList.join('&');
  }

  const headers = await createHeader();

  try {
    const res = await axios.get(baseUrl + endpoint, headers);
    if (res.data) {
      ret = { ...ret, result: true, data: res.data };
    }
  } catch (e) {
    console.log(e);
    // alert('faild!');
  }

  return ret;
};

export const requestHttpPost = async (
  endpoint: string,
  param: { [key: string]: string }
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: '',
  };

  await axios
    .post(baseUrl + endpoint, param)
    .then((res) => {
      if (res.data) {
        ret = { ...ret, result: true, data: res.data };
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return ret;
};

const createHeader = async () => {
  let token = '';
  try {
    const res = await getData('access');

    if (res) {
      token = res;
    } else {
      console.log('アクセストークンが存在しません');
    }
  } catch (e) {
    console.log(e);
  }

  // alert(token);
  return { headers: {
    'Authorization': `JWT ${token}`,
  }};
};


