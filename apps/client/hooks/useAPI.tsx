import { FetchMethods, MediaType } from '@workspace/ui/lib';
import { AssetType } from '@workspace/gql/generated/graphql';
import { configService } from '@/util/config';
import { BearerAccessToken } from '@workspace/ui/lib';

export const fetchRequest = async (input: { init: RequestInit; fetchMethod: FetchMethods; pathName: string }) => {
  const { init, fetchMethod, pathName } = input;
  const url = new URL(configService.NEXT_PUBLIC_API_URL);
  url.pathname = pathName;
  return await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: BearerAccessToken()
    },
    method: fetchMethod
  });
};

export const useAPI = () => {
  const getStatus = async () => {
    try {
      const response = await fetchRequest({
        fetchMethod: FetchMethods.GET,
        pathName: '/auth/verify',
        init: {
          headers: {
            'Content-Type': 'application/json',
            Authorization: BearerAccessToken()
          }
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const upload = async (params: { mediaType: MediaType; assetType: AssetType; formdata: FormData }) => {
    params.formdata.append('assetType', params.assetType);
    params.formdata.append('mediaType', params.mediaType);

    try {
      const response = await fetchRequest({
        fetchMethod: FetchMethods.POST,
        pathName: '/assets/upload',
        init: {
          body: params.formdata,
          headers: {
            Authorization: BearerAccessToken()
          }
        }
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    getStatus,
    upload
  };
};
