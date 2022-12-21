interface ExercisesInput {
  value1: number[];
  value2: number;
}

interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExercises = (args: string[]): ExercisesInput => {
  const value1: number[] = [];
  let value2 = 0;

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i === args.length - 1) {
        value2 = parseInt(args[i]);
        break;
      }
      value1.push(parseInt(args[i]));
    } else {
      console.log(i);
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    value1,
    value2,
  };
};

const calculateExercise = (
  dailyHours: number[],
  targetHours: number
): ExerciseSummary => {
  const ratingsMetric: string[] = ["Bad", "Average", "Good"];
  const averageHours: number =
    dailyHours.reduce((acc, cur) => acc + cur, 0) / dailyHours.length;
  const rating =
    averageHours >= targetHours
      ? 3
      : averageHours >= (targetHours * 3) / 4
      ? 2
      : 1;

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((day) => day !== 0).length,
    target: targetHours,
    average: averageHours,
    rating,
    ratingDescription: ratingsMetric[rating - 1],
    success: rating === 3 ? true : false,
  };
};

try {
  const { value1, value2 } = parseArgumentsExercises(process.argv);
  console.log(calculateExercise(value1, value2));
} catch (e: unknown) {
  if (e instanceof Error) console.log(e.message);
}
