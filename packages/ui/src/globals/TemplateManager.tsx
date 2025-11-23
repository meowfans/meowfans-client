import React from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TemplateManager: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className="w-full md:pb-0" {...props}>
      {children}
    </div>
  );
};
