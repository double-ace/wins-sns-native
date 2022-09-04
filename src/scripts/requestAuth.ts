import axios, { AxiosResponse } from 'axios'
import { delData, getData, setData } from './asyncStore'

const baseUrl = 'http://192.168.11.3:8000'

type AuthParams = {
  email: string
  password: string
}

type AuthResponse = {
  access: string
  refresh: string
}

type Response = {
  result: boolean
  status: number | undefined
}

export const authLogin = async (params: AuthParams): Promise<Response> => {
  // let ret = false;
  const ret: Response = {
    result: false,
    status: 0,
  }
  try {
    const res: AxiosResponse<AuthResponse> = await axios.post(
      baseUrl + '/api/v1/auth/jwt/create/',
      params
    )
    if (res.status === 200) {
      await setData('access', res.data.access)
      await setData('refresh', res.data.refresh)
      ret.result = true
      ret.status = res.status
      console.log('ret: ', ret)
    }
  } catch (e) {
    console.log('authLoginError=========')
  }

  return ret
}

export const createAccount = async (params: AuthParams): Promise<boolean> => {
  let ret = false
  try {
    const createRes: AxiosResponse<AuthResponse> = await axios.post(
      baseUrl + '/api/v1/user/create/',
      params
    )
    if (createRes.status === 201) {
      authLogin(params)
      ret = true
    }
  } catch (e) {}

  return ret
}

export const postRefresh = async (baseUrl: string) => {
  const refresh = await getData('refresh')
  const { data }: AxiosResponse<{ access: string; refresh: string }> =
    await axios.post(baseUrl + '/api/v1/auth/jwt/refresh/', { refresh })
  await setData('access', data.access)
  await setData('refresh', data.refresh)
}

export const delToken = async (): Promise<void> => {
  await delData('access')
  await delData('refresh')
}
