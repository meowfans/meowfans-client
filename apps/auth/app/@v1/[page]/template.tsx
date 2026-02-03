'use client';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex flex-col min-h-screen items-center justify-center p-6 md:p-1`}>
      <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
    </div>
  );
}
