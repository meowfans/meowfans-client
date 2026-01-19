interface Props {
  children: React.ReactNode;
}

export default function RootTemplate({ children }: Props) {
  return <div>{children}</div>;
}
