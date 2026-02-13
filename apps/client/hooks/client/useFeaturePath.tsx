'use client';

import { APP_PATHS, FEATURE_FLAGS } from '@/lib/constants/feature-paths';
import { configService } from '@/util/config';
import { resolvePathName } from '@workspace/ui/lib/helpers';
import { usePathname, useRouter } from 'next/navigation';

export const useFeaturePath = () => {
  const pathname = usePathname();
  const router = useRouter();
  const _pathname = resolvePathName(pathname) as APP_PATHS;

  const featureKey = Object.values(APP_PATHS).includes(_pathname) ? _pathname : null;

  const isUnderConstruction = featureKey ? FEATURE_FLAGS[featureKey] : false;
  const isEnabled = configService.NEXT_PUBLIC_IS_PRODUCTION ? isUnderConstruction : true;

  return { isEnabled, pathname, router, isUnderConstruction };
};
