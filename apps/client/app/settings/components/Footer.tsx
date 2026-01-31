export const Footer = () => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p className="text-xs">
        Having problems with payment related issues or something else?{' '}
        <a href="mailto:support@meowfans.app" className="font-medium text-blue-600 underline hover:text-blue-700">
          Email us
        </a>
      </p>
    </div>
  );
};
