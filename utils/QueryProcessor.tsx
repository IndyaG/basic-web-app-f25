export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lowerQuery.includes("name")) {
    return "Indya";
  }

  if (lowerQuery.includes("id")) {
    return "igriffin";
  }

  // Addition question: "What is 26 plus 13?"
  const additionMatch = query.match(/what is (\d+) plus (\d+)\?/i);
  if (additionMatch) {
    const num1 = parseInt(additionMatch[1], 10);
    const num2 = parseInt(additionMatch[2], 10);
    return (num1 + num2).toString();
  }

  // Largest number question
  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s]+)\?/i);
  if (largestMatch) {
    const numbers = largestMatch[1]
      .split(",")
      .map(num => parseInt(num.trim(), 10));
    const largestNumber = Math.max(...numbers);
    return largestNumber.toString();
  }

  // Square and cube question (perfect sixth power)
  const squareCubeMatch = query.match(/which of the following numbers is both a square and a cube:\s*([\d,\s]+)\?/i);
  if (squareCubeMatch) {
    const numbers = squareCubeMatch[1]
      .split(",")
      .map(num => parseInt(num.trim(), 10));
    const result = numbers.filter(num => {
      const sixthRoot = Math.round(Math.pow(num, 1/6));
      return sixthRoot ** 6 === num;
    });
    return result.join(", ") || "None";
  }

  return "";
}
