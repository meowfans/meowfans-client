import { AssetType } from '@workspace/gql/generated/graphql';
import { configService } from '@/util/config';
import { getCookie, setCookie } from 'cookies-next';
import { authCookieKey, authRefreshCookieKey, FetchMethods, LoginInput, MediaType, SignupInput } from '@workspace/ui/lib';

export const fetchRequest = async (input: { init: RequestInit; fetchMethod: FetchMethods; pathName: string }) => {
  const { init, fetchMethod, pathName } = input;
  const url = new URL(configService.NEXT_PUBLIC_API_URL);
  url.pathname = pathName;
  try {
    const res = await fetch(url, {
      ...init,
      method: fetchMethod
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch {
    throw new Error('!!!Something wrong happened!!!');
  }
};

const useAPI = () => {
  const login = async (input: LoginInput) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/auth/login',
      init: {
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });

    setCookie(authCookieKey, data.accessToken);
    setCookie(authRefreshCookieKey, data.refreshToken);
    return data;
  };

  const signup = async (input: SignupInput) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/auth/fan-signup',
      init: {
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
    setCookie(authCookieKey, data.accessToken);
    setCookie(authRefreshCookieKey, data.accessToken);
    return data;
  };

  const verifyJwt = async (token: string) => {
    const data = await fetchRequest({
      fetchMethod: FetchMethods.GET,
      pathName: '/auth/verify',
      init: {
        body: JSON.stringify(token),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
    return data;
  };

  const upload = async (params: { mediaType: MediaType; assetType: AssetType; formData: FormData }) => {
    const accessToken = getCookie(authCookieKey);
    params.formData.append('mediaType', params.mediaType);
    params.formData.append('assetType', params.assetType);

    const data = await fetchRequest({
      fetchMethod: FetchMethods.POST,
      pathName: '/assets/upload',
      init: {
        body: params.formData,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    });
    return data;
  };

  return {
    login,
    signup,
    upload,
    verifyJwt
  };
};

export default useAPI;
