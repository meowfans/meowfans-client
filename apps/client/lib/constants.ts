import {
  Album,
  ArrowDownAZ,
  BadgeCheck,
  CircleUserRound,
  DollarSignIcon,
  Flame,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Group,
  Heart,
  HeartHandshake,
  Home,
  ImageDown,
  Lightbulb,
  Image as LucideImage,
  Mails,
  Mars,
  MarsStroke,
  Settings,
  SquarePlay,
  Trophy,
  Type,
  Venus,
  Verified,
  VerifiedIcon,
  Video
} from 'lucide-react';

// Client-specific constants
export const appBottomNavButtonOptions = [
  { icon: Video, title: 'Shorts', path: '/shorts' },
  { icon: LucideImage, title: 'Pictures', path: '/pictures' },
  { icon: GalleryVerticalEnd, title: 'Vaults', path: '/vaults' },
  // { icon: Mails, title: 'Channels', path: '/channels' },
  { icon: GalleryHorizontal, title: 'Posts', path: '/posts' },
  { icon: CircleUserRound, title: 'Creators', path: '/creators' },
  { icon: Home, title: 'Dashboard', path: '/dashboard' }

  // { icon: CirclePlay, title: 'Shorts', path: '/shorts' },
];

export const navActions = [
  [
    { label: 'Liked vaults', url: '/liked/vaults', icon: Heart },
    { label: 'Liked posts', url: '/liked/posts', icon: GalleryHorizontal },
    { label: 'Liked pictures', url: '/liked/pictures', icon: HeartHandshake }
  ],
  [
    { label: 'Categories', url: '/categories', icon: Type },
    { label: 'Following', url: '/following', icon: Verified },
    { label: 'Trending Creators', url: '/trending/creators', icon: VerifiedIcon },
    { label: 'Trending Posts', url: '/trending/posts', icon: ImageDown },
    { label: 'Trending Vaults', url: '/trending/vaults', icon: Album }
  ],
  [
    { label: 'Explore', url: '/explore', icon: BadgeCheck },
    { label: 'Settings', url: '/settings', icon: Settings },
    { label: 'Purchased', url: '/purchased', icon: DollarSignIcon }
  ]
];

export const appSideBarButtonOptions = {
  teams: [
    { name: 'Straight', logo: Mars, plan: 'Enterprise' },
    { name: 'Lesbian.', logo: Venus, plan: 'Startup' },
    { name: 'Gay.', logo: MarsStroke, plan: 'Free' }
  ],
  navMain: [
    {
      title: 'Default',
      items: [
        // { label: 'Subscriptions', url: '/subscriptions', emoji: '', icon: BadgeDollarSign },
        // { label: 'Watch History', url: '/history', emoji: '', icon: History, badge: '10' },
        // { label: 'Messages', url: '/message', emoji: '', icon: MessageCircleCode },
        { label: 'Shorts', url: '/shorts', emoji: '', icon: Video },
        // { label: 'Messages', url: '/channels', emoji: '', icon: Mails },
        { label: 'Following', url: '/following', emoji: '', icon: Group },
        { label: 'Posts', url: '/posts', emoji: '', icon: GalleryHorizontal },
        { label: 'Creators', url: '/creators', emoji: '', icon: BadgeCheck },
        { label: 'Categories', url: '/categories', emoji: '', icon: ArrowDownAZ },
        { label: 'Vaults', url: '/vaults', emoji: '', icon: GalleryVerticalEnd },
        { label: 'Dashboard', url: '/dashboard', emoji: '', icon: Home, isActive: true },
        { label: 'Pictures', url: '/pictures', emoji: '', icon: LucideImage }
      ]
    },
    {
      title: 'Premium',
      items: [
        // { label: 'Subscriptions', url: '/subscriptions', emoji: '', icon: BadgeDollarSign },
        // { label: 'Watch History', url: '/history', emoji: '', icon: History, badge: '10' },
        // { label: 'Messages', url: '/message', emoji: '', icon: MessageCircleCode },
        { label: 'Purchased', url: '/purchased', emoji: '', icon: DollarSignIcon }
      ]
    },
    {
      title: 'Trending',
      items: [
        { label: 'All ', url: '/trending', emoji: '', icon: Flame },
        { label: 'Creators ', url: '/trending/creators', emoji: '', icon: VerifiedIcon },
        { label: 'Posts ', url: '/trending/posts', emoji: '', icon: GalleryHorizontal },
        { label: 'Pictures ', url: '/trending/pictures', emoji: '', icon: ImageDown },
        { label: 'Vaults ', url: '/trending/vaults', emoji: '', icon: Album }

        // { label: 'Best', url: '/best', emoji: '', icon: Spotlight },
        // { label: 'Shorts', url: '/shorts', emoji: '', icon: SquarePlay },
        // { label: 'Top creators', url: '/top-creators', emoji: '', icon: Trophy }
      ]
    },
    {
      title: 'Your favorites',
      items: [
        { label: 'Vaults ', url: '/liked/vaults', emoji: '', icon: Flame },
        { label: 'Pictures', url: '/liked/pictures', emoji: '', icon: Lightbulb },
        { label: 'Posts', url: '/liked/posts', emoji: '', icon: GalleryHorizontal }
      ]
    },
    {
      title: 'Categories',
      items: [
        { label: 'African', url: '/categories/african', icon: Flame, emoji: '📊' },
        { label: 'Amateur', url: '/categories/amateur', icon: Flame, emoji: '🍳' },
        { label: 'American', url: '/categories/american', icon: Flame, emoji: '💪' },
        { label: 'Arab', url: '/categories/arab', icon: Flame, emoji: '📚' },
        { label: 'Anal', url: '/categories/anal', icon: Flame, emoji: '🌱' },
        { label: 'Asian', url: '/categories/asian', icon: Flame, emoji: '🗣️' },
        { label: 'Ass licking', url: '/categories/ass-licking', icon: Flame, emoji: '🏠' },
        { label: 'Babe', url: '/categories/babe', icon: Flame, emoji: '💰' },
        { label: 'Bangladeshi', url: '/categories/bangladeshi', icon: Flame, emoji: '🎬' },
        { label: 'BBC', url: '/categories/bbc', icon: Flame, emoji: '✅' }
      ]
    },
    {
      title: 'Tech format',
      items: [
        { label: 'Webcam', url: '/categories/webcam', icon: Flame, emoji: '💻' },
        { label: 'VR', url: 'categories/vr', icon: Flame, emoji: '🎮' },
        { label: 'Virtual Reality', url: '/categories/virtual-reality', icon: Flame, emoji: '🕶️' },
        { label: 'VR Sex', url: '/categories/vr sex', icon: Flame, emoji: '🕶️' },
        { label: 'POV', url: '/categories/pov', icon: Flame, emoji: '🎥' },
        { label: 'Gonzo', url: '/categories/gonzo', icon: Flame, emoji: '🎬' },
        { label: 'Hardcore', url: '/categories/hardcore', icon: Flame, emoji: '💥' },
        { label: 'Vintage', url: '/categories/vintage', icon: Flame, emoji: '📼' },
        { label: 'Outdoor', url: '/categories/outdoor', icon: Flame, emoji: '🏞️' }
      ]
    },
    {
      title: 'Role play style fantasy',
      items: [
        { label: 'Cosplay', url: '/categories/cosplay', icon: Flame, emoji: '🦸‍♀️' },
        { label: 'Roleplay', url: '/categories/role play', icon: Flame, emoji: '🎭' },
        { label: 'Romantic', url: '/categories/romantic', icon: Flame, emoji: '❤️' },
        { label: 'Romantic BDSM', url: '/categories/bdsm', icon: Flame, emoji: '❤️‍🔥' },
        { label: 'Fantasy', url: '/categories/fantasy', icon: Flame, emoji: '🧚‍♀️' },
        { label: 'Erotic Stories', url: '/categories/erotic', icon: Flame, emoji: '📖' },
        { label: 'Schoolgirl', url: '/categories/school-girl', icon: Flame, emoji: '🎒' },
        { label: 'Uniforms', url: '/categories/uniforms', icon: Flame, emoji: '👔' },
        { label: 'Lingerie', url: '/categories/lingerie', icon: Flame, emoji: '🩱' }
      ]
    },
    {
      title: 'Relationships',
      items: [
        { label: 'Lesbian', url: '/categories/lesbian', icon: Flame, emoji: '👭' },
        { label: 'Threesome', url: '/categories/threesome', icon: Flame, emoji: '3️⃣' },
        { label: 'Threesome M/F', url: '/categories/threesome-mf', icon: Flame, emoji: '👨‍👩‍👧' },
        { label: 'Gangbang F/F', url: '/categories/gangbang-ff', icon: Flame, emoji: '👭' },
        { label: 'Swingers', url: '/categories/swingers', icon: Flame, emoji: '🔄' },
        { label: 'Step Family', url: '/categories/step-family', icon: Flame, emoji: '🏠' },
        { label: 'Interracial', url: '/categories/interracial', icon: Flame, emoji: '🌎' }
      ]
    },
    {
      title: 'Appearance',
      items: [
        { label: 'Babe', url: '/categories/babe', icon: Flame, emoji: '💰' },
        { label: 'BBW', url: '/categories/bbw', icon: Flame, emoji: '🎀' },
        { label: 'Blonde', url: '/categories/blonde', icon: Flame, emoji: '👱‍♀️' },
        { label: 'Brunette', url: '/categories/brunette', icon: Flame, emoji: '👩‍🦰' },
        { label: 'Redhead', url: '/categories/redhead', icon: Flame, emoji: '🦰' },
        { label: 'Hairy', url: '/categories/hairy', icon: Flame, emoji: '🦰' },
        { label: 'Thick', url: '/categories/thick', icon: Flame, emoji: '🍑' },
        { label: 'Big Tits', url: '/categories/big-tits', icon: Flame, emoji: '🍒' },
        { label: 'Shaved', url: '/categories/shaved', icon: Flame, emoji: '✂️' }
      ]
    },
    {
      title: 'Experience',
      items: [
        { label: 'Amateur', url: '/categories/amateur', icon: Flame, emoji: '🍳' },
        { label: 'Mature', url: '/categories/mature', icon: Flame, emoji: '🧓' },
        { label: 'MILF', url: '/categories/milf', icon: Flame, emoji: '👩‍🦳' },
        { label: 'Teen', url: '/categories/teen', icon: Flame, emoji: '👧' },
        { label: 'Young', url: '/categories/young', icon: Flame, emoji: '🧑' }
      ]
    },
    {
      title: 'Fetish',
      items: [
        { label: 'Anal', url: '/categories/anal', icon: Flame, emoji: '🌱' },
        { label: 'Ass Licking', url: '/categories/ass-icking', icon: Flame, emoji: '🏠' },
        { label: 'BBC', url: '/categories/bbc', icon: Flame, emoji: '✅' },
        { label: 'BDSM', url: '/categories/bdsm', icon: Flame, emoji: '🔗' },
        { label: 'Big Cock', url: '/categories/big cock', icon: Flame, emoji: '🍆' },
        { label: 'Blowjob', url: '/categories/blowjob', icon: Flame, emoji: '💋' },
        { label: 'Bondage', url: '/categories/bondage', icon: Flame, emoji: '🪢' },
        { label: 'Creampie', url: '/categories/creampie', icon: Flame, emoji: '🥛' },
        { label: 'Cum', url: '/categories/cum', icon: Flame, emoji: '💦' },
        { label: 'Double Penetration', url: '/categories/double-penetration', icon: Flame, emoji: '🔄' },
        { label: 'Facial', url: '/categories/facial', icon: Flame, emoji: '😮' },
        { label: 'Feet', url: '/categories/feet', icon: Flame, emoji: '🦶' },
        { label: 'Femdom', url: '/categories/Femdom', icon: Flame, emoji: '👑' },
        { label: 'Fisting', url: '/categories/fisting', icon: Flame, emoji: '✋' },
        { label: 'Gangbang', url: '/categories/gangbang', icon: Flame, emoji: '👥' },
        { label: 'Handjob', url: '/categories/handjob', icon: Flame, emoji: '🤲' },
        { label: 'Masturbation', url: '/categories/masturbation', icon: Flame, emoji: '🤏' },
        { label: 'Oral', url: '/categories/oral', icon: Flame, emoji: '👄' },
        { label: 'Spanking', url: '/categories/spanking', icon: Flame, emoji: '🖐️' },
        { label: 'Squirt', url: '/categories/squirt', icon: Flame, emoji: '💦' },
        { label: 'Swallow', url: '/categories/swallow', icon: Flame, emoji: '👅' },
        { label: 'Anal Toys', url: '/categories/anal-toys', icon: Flame, emoji: '🍑' },
        { label: 'Fetish', url: '/categories/fetish', icon: Flame, emoji: '🖤' },
        { label: 'BDSM Fetish', url: '/categories/bdsm-fetish', icon: Flame, emoji: '🖤' },
        { label: 'Feet Fetish', url: '/categories/feet-fetish', icon: Flame, emoji: '🦶' }
      ]
    }
  ],
  navSecondary: [
    { title: 'Newest ', url: '/newest', icon: Flame },
    { title: 'Best', url: '/best', icon: Lightbulb },
    { title: 'Shorts', url: '/shorts', icon: SquarePlay },
    { title: 'Top creators', url: '/top creators', icon: Trophy }
  ],
  category: [
    { name: 'African', url: '/categories/african', emoji: '📊' },
    { name: 'Amateur', url: '/categories/amateur', emoji: '🍳' },
    { name: 'American', url: '/categories/american', emoji: '💪' },
    { name: 'Arab', url: '/categories/arab', emoji: '📚' },
    { name: 'Anal', url: '/categories/anal', emoji: '🌱' },
    { name: 'Asian', url: '/categories/asian', emoji: '🗣️' },
    { name: 'Ass licking', url: '/categories/ass licking', emoji: '🏠' },
    { name: 'Babe', url: '/categories/babe', emoji: '💰' },
    { name: 'Bangladeshi', url: '/categories/bangladeshi', emoji: '🎬' },
    { name: 'BBC', url: '/categories/bbc', emoji: '✅' }
  ],
  types: [
    {
      name: 'Tech format',
      emoji: '🏠',
      pages: [
        { name: 'Webcam', url: '/categories/webcam', emoji: '💻' },
        { name: 'VR', url: 'categories/vr', emoji: '🎮' },
        { name: 'Virtual Reality', url: '/categories/virtual reality', emoji: '🕶️' },
        { name: 'VR Sex', url: '/categories/vr sex', emoji: '🕶️' },
        { name: 'POV', url: '/categories/pov', emoji: '🎥' },
        { name: 'Gonzo', url: '/categories/gonzo', emoji: '🎬' },
        { name: 'Hardcore', url: '/categories/hardcore', emoji: '💥' },
        { name: 'Vintage', url: '/categories/vintage', emoji: '📼' },
        { name: 'Outdoor', url: '/categories/outdoor', emoji: '🏞️' }
      ]
    },
    {
      name: 'Role play style fantasy',
      emoji: '💼',
      pages: [
        { name: 'Cosplay', url: '/categories/cosplay', emoji: '🦸‍♀️' },
        { name: 'Roleplay', url: '/categories/role play', emoji: '🎭' },
        { name: 'Romantic', url: '/categories/romantic', emoji: '❤️' },
        { name: 'Romantic BDSM', url: '/categories/bdsm', emoji: '❤️‍🔥' },
        { name: 'Fantasy', url: '/categories/fantasy', emoji: '🧚‍♀️' },
        { name: 'Erotic Stories', url: '/categories/erotic', emoji: '📖' },
        { name: 'Schoolgirl', url: '/categories/school girl', emoji: '🎒' },
        { name: 'Uniforms', url: '/categories/uniforms', emoji: '👔' },
        { name: 'Lingerie', url: '/categories/lingerie', emoji: '🩱' }
      ]
    },
    {
      name: 'Relationships',
      emoji: '🎨',
      pages: [
        { name: 'Lesbian', url: '/categories/lesbian', emoji: '👭' },
        { name: 'Threesome', url: '/categories/threesome', emoji: '3️⃣' },
        { name: 'Threesome M/F', url: '/categories/threesome mf', emoji: '👨‍👩‍👧' },
        { name: 'Gangbang F/F', url: '/categories/gangbang ff', emoji: '👭' },
        { name: 'Swingers', url: '/categories/swingers', emoji: '🔄' },
        { name: 'Step Family', url: '/categories/step family', emoji: '🏠' },
        { name: 'Interracial', url: '/categories/interracial', emoji: '🌎' }
      ]
    },
    {
      name: 'Appearance',
      emoji: '🏡',
      pages: [
        { name: 'Babe', url: '/categories/babe', emoji: '💰' },
        { name: 'BBW', url: '/categories/bbw', emoji: '🎀' },
        { name: 'Blonde', url: '/categories/blonde', emoji: '👱‍♀️' },
        { name: 'Brunette', url: '/categories/brunette', emoji: '👩‍🦰' },
        { name: 'Redhead', url: '/categories/redhead', emoji: '🦰' },
        { name: 'Hairy', url: '/categories/hairy', emoji: '🦰' },
        { name: 'Thick', url: '/categories/thick', emoji: '🍑' },
        { name: 'Big Tits', url: '/categories/big tits', emoji: '🍒' },
        { name: 'Shaved', url: '/categories/shaved', emoji: '✂️' }
      ]
    },
    {
      name: 'Experience',
      emoji: '🧳',
      pages: [
        { name: 'Amateur', url: '/categories/amateur', emoji: '🍳' },
        { name: 'Mature', url: '/categories/mature', emoji: '🧓' },
        { name: 'MILF', url: '/categories/milf', emoji: '👩‍🦳' },
        { name: 'Teen', url: '/categories/teen', emoji: '👧' },
        { name: 'Young', url: '/categories/young', emoji: '🧑' }
      ]
    },
    {
      name: 'Fetish',
      emoji: '🥳',
      pages: [
        { name: 'Anal', url: '/categories/anal', emoji: '🌱' },
        { name: 'Ass Licking', url: '/categories/ass licking', emoji: '🏠' },
        { name: 'BBC', url: '/categories/bbc', emoji: '✅' },
        { name: 'BDSM', url: '/categories/bdsm', emoji: '🔗' },
        { name: 'Big Cock', url: '/categories/big cock', emoji: '🍆' },
        { name: 'Blowjob', url: '/categories/blowjob', emoji: '💋' },
        { name: 'Bondage', url: '/categories/bondage', emoji: '🪢' },
        { name: 'Creampie', url: '/categories/creampie', emoji: '🥛' },
        { name: 'Cum', url: '/categories/cum', emoji: '💦' },
        { name: 'Double Penetration', url: '/categories/double penetration', emoji: '🔄' },
        { name: 'Facial', url: '/categories/facial', emoji: '😮' },
        { name: 'Feet', url: '/categories/feet', emoji: '🦶' },
        { name: 'Femdom', url: '/categories/Femdom', emoji: '👑' },
        { name: 'Fisting', url: '/categories/fisting', emoji: '✋' },
        { name: 'Gangbang', url: '/categories/gangbang', emoji: '👥' },
        { name: 'Handjob', url: '/categories/handjob', emoji: '🤲' },
        { name: 'Masturbation', url: '/categories/masturbation', emoji: '🤏' },
        { name: 'Oral', url: '/categories/oral', emoji: '👄' },
        { name: 'Spanking', url: '/categories/spanking', emoji: '🖐️' },
        { name: 'Squirt', url: '/categories/squirt', emoji: '💦' },
        { name: 'Swallow', url: '/categories/swallow', emoji: '👅' },
        { name: 'Anal Toys', url: '/categories/anal toys', emoji: '🍑' },
        { name: 'Fetish', url: '/categories/fetish', emoji: '🖤' },
        { name: 'BDSM Fetish', url: '/categories/bdsm fetish', emoji: '🖤' },
        { name: 'Feet Fetish', url: '/categories/feet fetish', emoji: '🦶' }
      ]
    }
  ]
};

export const legalAndAppPaths = ['/2257', '/creator-terms', '/fan-terms', '/faq', '/general-terms', '/privacy', '/terms', '/explore'];
