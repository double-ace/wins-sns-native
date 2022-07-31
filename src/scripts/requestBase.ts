import axios from 'axios';
import { getData, delData } from './asyncStore';
import { postRefresh } from './requestAuth';

const baseUrl = 'http://192.168.11.2:8000';

export type ResponseData = {
  result: boolean;
  status?: number;
  data: any;
  notLogin?: boolean;
};

export const requestHttpGet = async (
  endpoint: string,
  param?: { [key: string]: string }
): Promise<ResponseData> => {
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
    ret.result = true;
    ret.data = res.data;
  } catch (e: any) {
    console.log('requestHttpGetError========================');
    console.log('>>');
    console.log(e);
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e?.response?.status === 401) {
      try {
        await postRefresh(baseUrl);
        try {
          const retakeHeaders = await createHeader();
          const res = await axios.get(baseUrl + endpoint, retakeHeaders);
          ret.result = true;
          ret.data = res.data;
        } catch {
          // 正しいトークンでのリクエストエラー
        }
      } catch {
        // リフレッシュトークンが期限切れ->ログイン画面
        await delData('access');
        await delData('refresh');
        ret.notLogin = true;
      }
    }
  }

  return ret;
};

export const requestHttpPost = async (
  endpoint: string,
  param: { [key: string]: string | boolean | null },
  requiredHeader: boolean = true
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: '',
  };
  console.log(requiredHeader);

  const headers = requiredHeader ? await createHeader() : null;

  try {
    const res = headers
      ? await axios.post(baseUrl + endpoint, param, headers)
      : await axios.post(baseUrl + endpoint, param);
    ret = { ...ret, result: true, data: res.data };
  } catch (e: any) {
    console.log('requestHttpPostError========================');
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e?.response?.status === 401) {
      try {
        await postRefresh(baseUrl);
        try {
          const retakeHeaders = requiredHeader ? await createHeader() : null;
          const res = retakeHeaders
            ? await axios.post(baseUrl + endpoint, param, retakeHeaders)
            : await axios.post(baseUrl + endpoint, param);
          ret.result = true;
          ret.data = res.data;
        } catch {
          // 正しいトークンでのリクエストエラー
        }
      } catch {
        // リフレッシュトークンが期限切れ->ログイン画面
        await delData('access');
        await delData('refresh');
        ret.notLogin = true;
      }
    }
  }

  return ret;
};

export const requestHttpPatch = async (
  endpoint: string,
  param: { [key: string]: any }
): Promise<ResponseData> => {
  let ret: ResponseData = {
    result: false,
    data: '',
  };

  const headers = await createHeader();

  try {
    const res = await axios.patch(baseUrl + endpoint, param, headers);
    ret = { ...ret, result: true, data: res.data };
  } catch (e: any) {
    console.log('requestHttpPatchError========================');
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e?.response?.status === 401) {
      try {
        await postRefresh(baseUrl);
        try {
          const retakeHeaders = await createHeader();
          const res = await axios.patch(
            baseUrl + endpoint,
            param,
            retakeHeaders
          );
          ret.result = true;
          ret.data = res.data;
        } catch {
          // 正しいトークンでのリクエストエラー
        }
      } catch {
        // リフレッシュトークンが期限切れ->ログイン画面
        await delData('access');
        await delData('refresh');
        ret.notLogin = true;
      }
    }
  }

  return ret;
};

export const requestHttpPatchMultiPartFormData = async (
  endpoint: string,
  // param: BodyInit | null | undefined
  param: any,
  blobType: any
) => {
  let ret: ResponseData = {
    result: false,
    data: '',
  };

  const { headers } = await createHeader();
  const headersAppend = {
    headers: {
      ...headers,
      'Content-Type': blobType,
      // 'content-type': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  try {
    // Fetch
    // const res = await fetch(baseUrl + endpoint, {
    //   method: 'PATCH',
    //   body: param,
    //   headers: headersAppend.headers,
    // });
    //   .then(response => response.json())
    //   .then((v) => {
    //     console.log('vvvv: ');
    //     console.log(v.status);
    //     console.log(v.statusText);
    //   })
    //   .catch((e) => console.error(e));

    // Axios
    const res = await axios.patch(baseUrl + endpoint, param, headersAppend);

    // XMLHttpRequest
    // const xhr = new XMLHttpRequest();
    // xhr.open('PATCH', baseUrl + endpoint, true);
    // // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    // xhr.setRequestHeader('Accept', 'application/json');
    // xhr.setRequestHeader('Authorization', headers.Authorization);
    // xhr.send(param);
    // xhr.send({ profile_image: param });

    // console.log('res: ');
    console.log('res: ', res.data);
    // console.log(res.data);
    // if (res.data) {
    //   ret = { ...ret, result: true, data: res.data };
    // }
  } catch (e: any) {
    console.log('requestHttpPostError========================');
    const errMsg = e.response.request || e.message;
    console.log(errMsg);
    console.log('Request========================');
    console.log(e.request);
    console.log('Data========================');
    console.log(e.response.data);
  }

  return ret;
};

export const requestHttpDelete = async (
  endpoint: string,
  param?: { [key: string]: string }
): Promise<ResponseData> => {
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
    endpoint += queryPath;
  }

  const headers = await createHeader();
  try {
    const res = await axios.delete(baseUrl + endpoint, headers);
    if (res.status === 204) {
      ret = { ...ret, result: true, status: res.status, data: res.data };
    }
  } catch (e: any) {
    console.log('requestHttpDeleteError========================');
    // 認証エラーの場合はトークンを取り直し再リクエスト
    if (e?.response?.status === 401) {
      try {
        await postRefresh(baseUrl);
        try {
          const retakeHeaders = await createHeader();
          const res = await axios.delete(baseUrl + endpoint, retakeHeaders);
          ret.result = true;
          ret.data = res.data;
        } catch {
          // 正しいトークンでのリクエストエラー
        }
      } catch {
        // リフレッシュトークンが期限切れ->ログイン画面
        await delData('access');
        await delData('refresh');
        ret.notLogin = true;
      }
    }
  }

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

  return {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
};
