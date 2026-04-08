import { JSX } from 'react';
import { ExoAdProvider, ExoAdZoneTypes } from './ExoAdProvider';

interface SlideVideoProps {
  zoneIndex: number;
}

const SlideVideo = ({ zoneIndex }: SlideVideoProps) => {
  return <ExoAdProvider key={`ad-${zoneIndex}`} zoneId="5771480" zoneType={ExoAdZoneTypes.SlideVideo} />;
};

interface ApplyAdProps extends SlideVideoProps {
  canApplyAd: boolean;
  element: JSX.Element;
}

export const ApplyAd: React.FC<ApplyAdProps> = ({ canApplyAd, zoneIndex, element }) => {
  const elements = [] as JSX.Element[];

  if (canApplyAd) elements.push(<SlideVideo zoneIndex={zoneIndex} key={`_`} />);
  elements.push(element);

  return elements;
};
