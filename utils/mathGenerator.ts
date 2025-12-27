
import { Problem, MathOperator, ObjectType } from '../types';

const COLORS = [
  'bg-blue-400',
  'bg-pink-400',
  'bg-lime-500',
  'bg-yellow-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-teal-400'
];

const OBJECTS: ObjectType[] = ['fingers', 'cake', 'toy', 'apple', 'star'];

/**
 * Generates a math problem that gets progressively harder.
 * num2 is the visualized number and is capped at 7.
 */
export const generateProblem = (score: number = 0): Problem => {
  const operator: MathOperator = Math.random() > 0.5 ? '+' : '-';
  const objectType = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const bgColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  let num1: number;
  let num2: number;
  let answer: number;

  // Visuals are strictly limited to 7 max as per request
  const MAX_VISUAL = 7;
  num2 = Math.floor(Math.random() * MAX_VISUAL) + 1; // 1 to 7

  const isEasyMode = score < 50;

  if (operator === '+') {
    if (isEasyMode) {
      // Sums up to 10
      num1 = Math.floor(Math.random() * (10 - num2)) + 1;
    } else {
      // Sums up to 20
      num1 = Math.floor(Math.random() * (20 - num2)) + 1;
    }
    answer = num1 + num2;
  } else {
    // Subtraction
    if (isEasyMode) {
      // Start from numbers up to 10
      num1 = Math.floor(Math.random() * 6) + 5; // 5 to 10
      // Ensure num2 is not bigger than num1
      if (num2 > num1) num2 = Math.floor(Math.random() * num1) + 1;
    } else {
      // Start from numbers up to 20
      num1 = Math.floor(Math.random() * 11) + 10; // 10 to 20
      // num2 is already max 7, so num1 - num2 will always be >= 0 since num1 >= 10
    }
    answer = num1 - num2;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    num1,
    operator,
    num2,
    answer,
    objectType,
    bgColor
  };
};
