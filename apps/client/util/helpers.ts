import { ZoneTypes } from '@workspace/gql/generated/graphql';
import { configService } from './config';

// Client-specific functions that depend on configService or GraphQL types
export const redirectToAuthApp = (input: { pathname?: string }) => {
  const hostName = configService.NEXT_PUBLIC_AUTH_URL;
  const redirectUrl = new URL(hostName);
  redirectUrl.pathname = input.pathname || '/login';
  return redirectUrl.toString();
};

export const handleBenefits = (zoneType: ZoneTypes) => {
  switch (zoneType) {
    case ZoneTypes.Onetime:
      return {
        label: 'One-Time (1 Month)',
        tagline: 'Perfect for trying out the premium experience.',
        bestFor: 'Short-term users & testers',
        benefits: ['Ad-free for 30 days', 'Works on all devices', 'No auto-renewal — one-time purchase']
      };

    case ZoneTypes.Monthly:
      return {
        label: 'Monthly',
        tagline: 'Flexible monthly access with zero commitment.',
        bestFor: 'Users who want a flexible plan',
        benefits: ['Remove ads on all screens', 'Improved loading speed', 'Early access to new features', 'Cancel anytime']
      };

    case ZoneTypes.Quarterly:
      return {
        label: 'Quarter (3 Months)',
        tagline: '3-month ad-free experience at a better price.',
        bestFor: 'Active users looking for more value',
        benefits: ['Ad-free for 90 days', 'Faster browsing', 'Better savings than monthly']
      };

    case ZoneTypes.Yearly:
      return {
        label: 'Annual',
        tagline: 'Best deal — full year completely ad-free.',
        bestFor: 'Daily users & long-term supporters',
        benefits: ['365 days ad-free', '2 months free extra', 'Highest browsing speed optimization', 'Annual premium badge on your profile']
      };
  }
};
