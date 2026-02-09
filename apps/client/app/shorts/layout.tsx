import { ShortsProvider } from "@/hooks/context/ShortsWrapper";

interface ShortsLayoutProps {
  children: React.ReactNode;
}

export default function ShortsLayout({ children }: ShortsLayoutProps) {
  return <ShortsProvider>{children}</ShortsProvider>;
}
