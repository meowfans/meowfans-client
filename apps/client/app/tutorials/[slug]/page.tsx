'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import { TutorialPageView } from '../components/TutorialPageView';
import { TUTORIALS } from '../constants';

export default function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tutorial = TUTORIALS.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <TutorialPageView
      title={tutorial.title}
      category={tutorial.category}
      duration={tutorial.duration}
      level={tutorial.level}
      image={tutorial.image}
    >
      {getContentForSlug(slug)}
    </TutorialPageView>
  );
}

function getContentForSlug(slug: string) {
  switch (slug) {
    case 'getting-started':
      return (
        <>
          <h2>Welcome to MeowFans Academy</h2>
          <p>
            Welcome to the community! MeowFans is a premium subscription platform where creators and fans connect. This guide will walk you
            through the essential steps to get your account ready for the best experience.
          </p>

          <h3>1. Complete Your Profile</h3>
          <p>
            First things first: let creators know who you are. Head over to your profile settings to upload an avatar and add a bio. A
            complete profile helps you stand out in the community and makes your interactions more meaningful.
          </p>

          <h3>2. Explore Categories</h3>
          <p>
            Use our detailed categorization system to find creators that match your interests. From fitness and cosplay to art and
            lifestyle, there&apos;s something for everyone.
          </p>

          <h3>3. Follow Your Favorites</h3>
          <p>
            When you find someone you like, hit that follow button. Following creators adds them to your feed so you never miss an update,
            even if you haven&apos;t subscribed yet.
          </p>

          <blockquote>Pro Tip: Use the search bar with specific keywords to find niche creators that are just right for you.</blockquote>
        </>
      );
    case 'subscriptions-and-unlocks':
      return (
        <>
          <h2>Understanding Your Purchases</h2>
          <p>
            Supporting creators on MeowFans is simple. We offer two primary ways to access premium content: Monthly Subscriptions and
            individual Vault Unlocks.
          </p>

          <h3>Monthly Subscriptions</h3>
          <p>
            A subscription gives you full access to a creator&apos;s public feed, including photos, videos, and status updates. Subscriptions
            typically renew automatically every 30 days.
          </p>

          <h3>The Vault</h3>
          <p>
            The Vault contains exclusive, one-off content that isn&apos;t included in the regular subscription. This could be high-resolution
            sets, long-form videos, or special collections. Once you unlock a vault item, it&apos;s yours to view forever in your &quot;Purchased&quot;
            tab.
          </p>

          <h3>Payment Security</h3>
          <p>
            All transactions are processed through highly secure payment gateways. Your personal payment information is never stored
            directly on our servers, ensuring your peace of mind.
          </p>
        </>
      );
    case 'search-and-filters':
      return (
        <>
          <h2>Master the Art of Discovery</h2>
          <p>
            With thousands of talented creators, finding the perfect one can be a journey. Our advanced search tools are designed to make it
            effortless.
          </p>

          <h3>Using Keywords effectively</h3>
          <p>
            Don&apos;t just search for names. Try searching for specific styles, locations, or content types. Our algorithm indexes bio text and
            tags to give you the most relevant results.
          </p>

          <h3>Filter by Activity</h3>
          <p>
            Want to see who&apos;s active right now? Use the &quot;Active&quot; filter to find creators who have posted recently or are currently online.
          </p>

          <h3>Sorting Options</h3>
          <p>
            You can sort your results by popularity, newest members, or trending status. Trending creators are those seeing a sudden spike
            in engagement—usually a sign of something new and exciting!
          </p>
        </>
      );
    case 'interacting-with-creators':
      return (
        <>
          <h2>Build Meaningful Connections</h2>
          <p>MeowFans isn&apos;t just about viewing content—it&apos;s about the community. Here&apos;s how you can engage with your favorite creators.</p>

          <h3>Direct Messaging</h3>
          <p>
            Most creators allow direct messages from their subscribers. This is the best place for one-on-one conversations, custom
            requests, and personal greetings.
          </p>

          <h3>Comments and Reactions</h3>
          <p>
            Show your appreciation for a post by leaving a heart or a thoughtful comment. Creators love reading feedback and often respond
            to comments on their latest work.
          </p>

          <h3>Tips</h3>
          <p>
            Want to really show support? You can send a tip along with a message or on a specific post. Tipping is a great way to show extra
            love and often gets you noticed by the creator.
          </p>
        </>
      );
    case 'managing-privacy':
      return (
        <>
          <h2>Your Privacy, Your Control</h2>
          <p>
            We take your privacy seriously. Here&apos;s a breakdown of the tools available to help you manage your digital footprint on the
            platform.
          </p>

          <h3>Profile Visibility</h3>
          <p>
            You can choose to keep your profile public or restricted to only those you follow. You can also hide your following list if you
            prefer to keep your interests private.
          </p>

          <h3>Data Management</h3>
          <p>
            In your settings, you can download a copy of all the data we have on your account. Transparency is key to our relationship with
            you.
          </p>

          <h3>Blocking and Reporting</h3>
          <p>
            If you ever feel uncomfortable, we have robust blocking and reporting tools. Reporting a user alerts our moderation team, who
            review all reports within 24 hours.
          </p>
        </>
      );
    case 'creator-payout-strategy':
      return (
        <>
          <h2>Maximizing Your Earnings</h2>
          <p>
            For our creators, MeowFans is a powerful business tool. Here are some strategies used by our top earners to grow their revenue.
          </p>

          <h3>Consistency is Key</h3>
          <p>Creators who post at least 3-4 times a week see 60% higher retention rates. Fans love knowing when to expect new content.</p>

          <h3>Utilize the Vault</h3>
          <p>
            Don&apos;t put everything in your main feed. Use the Vault for your highest-value content. This creates an additional revenue stream
            alongside your monthly subscriptions.
          </p>

          <h3>Engagement Equals Growth</h3>
          <p>
            Responding to messages and comments doesn&apos;t just feel good—it&apos;s good for business. Engaged fans are much more likely to remain
            subscribers long-term.
          </p>

          <h3>Promote on Social Media</h3>
          <p>
            Use your Instagram, Twitter, or TikTok to drive traffic to your MeowFans profile. Our built-in tracking tools help you see
            exactly where your new subscribers are coming from.
          </p>
        </>
      );
    default:
      return <p>Content coming soon!</p>;
  }
}
