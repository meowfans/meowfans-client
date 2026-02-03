interface AuthV1LayoutProps {
  children: React.ReactNode;
}

export default function AuthV1Layout({ children }: AuthV1LayoutProps) {
  return <main className="w-full">{children}</main>;
}
