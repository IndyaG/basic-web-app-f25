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

  // Check for addition questions like "What is 26 plus 13?"
  const additionMatch = query.match(/what is (\d+) plus (\d+)\?/i);
  if (additionMatch) {
    const num1 = parseInt(additionMatch[1], 10);
    const num2 = parseInt(additionMatch[2], 10);
    return (num1 + num2).toString();
  }

  // Check for "Which of the following numbers is the largest: 19, 48, 98?"
  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s]+)\?/i);
  if (largestMatch) {
    const numbers = largestMatch[1]
      .split(",")
      .map(num => parseInt(num.trim(), 10));
    const largestNumber = Math.max(...numbers);
    return largestNumber.toString();
  }

  return "";
}
