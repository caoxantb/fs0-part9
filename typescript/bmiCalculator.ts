interface BMIInput {
  height: number;
  weight: number;
}

interface BMICategory {
  max: number;
  category: string;
}

const parseArgumentsBMI = (args: string[]): BMIInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBMI = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (height === 0) throw new Error("Can't divide by 0!");

  console.log(bmi);

  const bmiCategories: BMICategory[] = [
    { max: 15.9, category: "Underweight (Severe thinness)	" },
    { max: 16.9, category: "Underweight (Moderate thinness)" },
    { max: 18.4, category: "Underweight (Mild thinness)	" },
    { max: 24.9, category: "Normal range" },
    { max: 29.9, category: "Overweight (Pre-obese)" },
    { max: 34.9, category: "Obese (Class I)" },
    { max: 39.9, category: "Obese (Class II)" },
  ];
  const bmiCat = bmiCategories.find((bmiRate) => bmi < bmiRate.max);

  return bmiCat !== undefined ? bmiCat.category : "Obese (Class III)";
};

try {
  const { height, weight } = parseArgumentsBMI(process.argv);
  console.log(calculateBMI(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
