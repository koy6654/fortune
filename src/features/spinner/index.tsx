interface SpinnerProps {
  width: string;
  height: string;
  thick?: number;
  color?: string;
}

const Spinner = ({ width, height, thick, color }: SpinnerProps) => {
  const borderThick = thick ? thick : 1;
  const borderColor = color ? color : 'gray-900';
  return (
    <div className="flex justify-center items-center mt-2 mb-4">
      <div
        className={`animate-spin rounded-full border-b-[${borderThick}px] border-${borderColor}`}
        style={{ width, height }}
      />
    </div>
  );
};

export default Spinner;
