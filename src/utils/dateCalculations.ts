import { differenceInDays } from 'date-fns';

export const AVERAGE_LIFE_EXPECTANCY = 77.5;
export const DAYS_IN_YEAR = 365.25;

export const calculateAgeStats = (birthDate: Date) => {
  const today = new Date();
  const daysLived = differenceInDays(today, birthDate);
  const ageInYears = daysLived / DAYS_IN_YEAR;
  const yearsLeft = AVERAGE_LIFE_EXPECTANCY - ageInYears;
  const daysLeft = Math.max(0, yearsLeft * DAYS_IN_YEAR);

  // Calculate early death age (10 years before current age)
  const earlyDeathAge = Math.max(0, Math.floor(ageInYears - 10));
  
  // Calculate future death age (10 years after current age)
  const futureDeathAge = Math.floor(ageInYears + 10);

  return {
    daysLived,
    daysLeft,
    ageInYears,
    yearsLeft,
    earlyDeathAge,
    futureDeathAge,
  };
};