import { configService } from '@/util/config';
import { AssetType } from '@workspace/gql/generated/graphql';
import {
  authCookieKey,
  authRefreshCookieKey,
  creatorCookieKey,
  creatorRefreshCookieKey,
  FetchMethods,
  FileType,
  MediaType,
  UploadMediaOutput
} from '@workspace/ui/lib';
import { deleteCookie, getCookie } from 'cookies-next';

export const fetchRequest = async (input: { init: RequestInit; fetchMethod: FetchMethods; pathName: string }) => {
  const { init, fetchMethod, pathName } = input;
  const url = new URL(configService.NEXT_PUBLIC_API_URL);
  url.pathname = pathName;
  const res = await fetch(url, {
    ...init,
    method: fetchMethod
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
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

  const logout = () => {
    deleteCookie(creatorCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(creatorRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    deleteCookie(authRefreshCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
  };

  const upload = async (params: { mediaType: MediaType; formData: FormData; fileType: FileType; assetType: AssetType }) => {
    const accessToken = getCookie(creatorCookieKey);
    params.formData.append('mediaType', params.mediaType);
    params.formData.append('assetType', params.assetType.toLowerCase());
    params.formData.append('fileType', params.fileType);

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
    return data as UploadMediaOutput;
  };

  return {
    upload,
    verifyJwt,
    logout
  };
};

export default useAPI;
