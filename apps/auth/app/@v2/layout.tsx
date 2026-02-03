interface AuthV2LayoutProps {
  children: React.ReactNode;
}

export default function AuthV2Layout({ children }: AuthV2LayoutProps) {
  return <main className="w-full">{children}</main>;
}
