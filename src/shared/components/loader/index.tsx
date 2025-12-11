import ClipLoader from 'react-spinners/ClipLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import PulseLoader from 'react-spinners/PulseLoader';

const loaderMap = {
  clip: ClipLoader,
  beat: BeatLoader,
  pulse: PulseLoader,
};

type LoaderProps = {
  loaderType?: keyof typeof loaderMap;
  size?: number | string;
  color?: string;
  className?: string;
  data_testid?: string;
};

const Loader = ({
  loaderType = 'clip',
  size,
  color,
  className,
  data_testid,
}: LoaderProps) => {
  const LoaderComponent = loaderMap[loaderType] || ClipLoader;

  return (
    <LoaderComponent
      size={size}
      color={color}
      className={className}
      data-testid={data_testid}
    />
  );
};

export { Loader };
