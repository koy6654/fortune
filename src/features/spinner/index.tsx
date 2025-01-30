interface SpinnerProps {
  width: string;
  height: string;
}

const Spinner = ({ width, height }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center mt-2 mb-4">
      <div className={`animate-spin rounded-full border-b-[1px] border-gray-900`} style={{ width, height }} />
    </div>
  );
};

export default Spinner;
