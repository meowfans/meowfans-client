import { configService } from '@/util/config';
import { AssetType } from '@workspace/gql/generated/graphql';
import { adminCookieKey, adminRefreshCookieKey, authCookieKey, authRefreshCookieKey, FetchMethods, MediaType } from '@workspace/ui/lib';
import { deleteCookie, getCookie } from 'cookies-next';

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
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  deleteCookie(adminCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
  deleteCookie(adminRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
  deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
  deleteCookie(authRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
};

const useAPI = () => {
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
    const accessToken = getCookie(adminCookieKey);
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
    upload,
    verifyJwt,
    logout
  };
};

export default useAPI;
