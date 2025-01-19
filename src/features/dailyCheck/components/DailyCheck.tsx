import { useFortuneDailyChecksStore } from 'features/home';
import { DailyCheckInBox } from './DailyCheckInBox';

export const DailyCheck = () => {
  const { fortuneDailyChecks } = useFortuneDailyChecksStore();
  console.log(fortuneDailyChecks);

  return (
    <div className="flex-1 flex flex-col justify-center items-center relative">
      <div className="flex flex-row justify-center items-center mb-2">
        <span className="text-lg font-medium font-pridi leading-[21px]">Progress Tracker </span>
        <span className="text-sm font-normal font-pridi leading-[21px]">(Days 1-7)</span>
      </div>
      <DailyCheckInBox status="missed" dayCount={1} content="Check-In :)" />
      <DailyCheckInBox status="claim" dayCount={2} content="Check-In :)" />
      <DailyCheckInBox status="claimed" dayCount={3} content="Check-In :)" />
      <DailyCheckInBox status="claim" dayCount={4} content="Check-In :)" />
      <DailyCheckInBox status="claim" dayCount={5} content="Check-In :)" />
      <DailyCheckInBox status="disabled" dayCount={6} content="Check-In :)" />
      <DailyCheckInBox status="claim" dayCount={7} content="Special Reward!" />
      <div className="w-full h-7 text-center text-[#956134] text-xs font-normal font-pretendard mt-2 mb-4">
        The Daily Check-In resets every 7 days.
        <br />
        Daily Check in Resets at 00:00 UTC
      </div>
    </div>
  );
};
