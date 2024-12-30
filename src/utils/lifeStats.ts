import { differenceInDays } from 'date-fns';
import { AVERAGE_LIFE_EXPECTANCY, DAYS_IN_YEAR } from './dateCalculations';

export interface LifeActivity {
  name: string;
  dailyFrequency: number;
  description: string;
  funFacts: string[];
  impactLevel: number; // 1-10 scale for visual representation
  yearlyImpact: string;
}

export const lifeActivities: LifeActivity[] = [
  {
    name: "Tying Shoes",
    dailyFrequency: 2,
    description: "Average times tying shoes per day",
    funFacts: [
      "The average person spends 2 minutes per day tying shoes",
      "That's 12 hours per year just on shoelaces!"
    ],
    impactLevel: 3,
    yearlyImpact: "730 shoe-tying moments"
  },
  {
    name: "Brushing Teeth",
    dailyFrequency: 2,
    description: "Recommended dental hygiene frequency",
    funFacts: [
      "We spend about 108 days of our life brushing teeth",
      "The average person uses 300 toothbrushes in their lifetime"
    ],
    impactLevel: 8,
    yearlyImpact: "730 minutes of dental care"
  },
  {
    name: "Meals Eaten",
    dailyFrequency: 3,
    description: "Average meals consumed per day",
    funFacts: [
      "Humans spend about 32,098 hours eating in their lifetime",
      "We consume about 35 tons of food in a lifetime"
    ],
    impactLevel: 9,
    yearlyImpact: "1,095 meals enjoyed"
  },
  {
    name: "Blinking",
    dailyFrequency: 28800,
    description: "Average blinks per day",
    funFacts: [
      "We blink about 20 times per minute",
      "That's about 28,800 times per day!",
      "We spend about 10% of our waking hours with our eyes closed due to blinking"
    ],
    impactLevel: 2,
    yearlyImpact: "10,512,000 blinks"
  },
  {
    name: "Laughing",
    dailyFrequency: 20,
    description: "Average laughs per day",
    funFacts: [
      "Children laugh about 300-400 times per day",
      "Adults only laugh about 20 times per day",
      "Laughter is contagious and can strengthen social bonds"
    ],
    impactLevel: 7,
    yearlyImpact: "7,300 moments of joy"
  },
  {
    name: "Walking Steps",
    dailyFrequency: 7000,
    description: "Average steps walked per day",
    funFacts: [
      "The average person walks about 7,000 steps per day",
      "In a lifetime, that's like walking around the Earth 4 times!",
      "Each step uses up to 200 muscles"
    ],
    impactLevel: 8,
    yearlyImpact: "2,555,000 steps forward"
  },
  {
    name: "Breathing",
    dailyFrequency: 23040,
    description: "Average breaths taken per day",
    funFacts: [
      "We take about 16 breaths per minute",
      "That's about 23,040 breaths per day",
      "The average person takes about 672,768,000 breaths in their lifetime"
    ],
    impactLevel: 10,
    yearlyImpact: "8,409,600 breaths"
  },
  {
    name: "Heart Beats",
    dailyFrequency: 115200,
    description: "Average heartbeats per day",
    funFacts: [
      "Your heart beats about 80 times per minute",
      "That's about 115,200 times per day",
      "In a lifetime, your heart will beat about 3 billion times"
    ],
    impactLevel: 10,
    yearlyImpact: "42,048,000 heartbeats"
  },
  {
    name: "Words Spoken",
    dailyFrequency: 7000,
    description: "Average words spoken per day",
    funFacts: [
      "The average person speaks about 7,000 words per day",
      "Women tend to speak slightly more words per day than men",
      "The most talkative 5% of people speak over 20,000 words per day"
    ],
    impactLevel: 6,
    yearlyImpact: "2,555,000 words shared"
  },
  {
    name: "Hours Slept",
    dailyFrequency: 8,
    description: "Recommended hours of sleep per day",
    funFacts: [
      "We spend about 1/3 of our lives sleeping",
      "That's about 229,961 hours in a lifetime",
      "During sleep, your brain processes and stores memories"
    ],
    impactLevel: 9,
    yearlyImpact: "2,920 hours of rest"
  }
];

export const calculateLifeStats = (birthDate: Date) => {
  const today = new Date();
  const daysLived = differenceInDays(today, birthDate);
  const ageInYears = daysLived / DAYS_IN_YEAR;
  const yearsLeft = AVERAGE_LIFE_EXPECTANCY - ageInYears;
  const daysLeft = Math.max(0, yearsLeft * DAYS_IN_YEAR);

  return {
    daysLived,
    daysLeft,
    ageInYears,
    yearsLeft,
    activities: lifeActivities.map(activity => ({
      ...activity,
      timesDone: Math.floor(daysLived * activity.dailyFrequency),
      timesLeft: Math.floor(daysLeft * activity.dailyFrequency)
    }))
  };
};