export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  // Knowledge responses
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

  // Largest number question
  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s]+)\?/i);
  if (largestMatch) {
    const numbers = largestMatch[1]
      .split(",")
      .map(num => parseInt(num.trim(), 10));
    return Math.max(...numbers).toString();
  }

  // Square and cube (perfect sixth power)
  const squareCubeMatch = query.match(/which of the following numbers is both a square and a cube:\s*([\d,\s]+)\?/i);
  if (squareCubeMatch) {
    const numbers = squareCubeMatch[1]
      .split(",")
      .map(num => parseInt(num.trim(), 10));
    const result = numbers.filter(num => {
      const sixthRoot = Math.round(Math.pow(num, 1 / 6));
      return sixthRoot ** 6 === num;
    });
    return result.join(", ") || "None";
  }

  // Dynamic arithmetic handler
  const arithmeticMatch = query.match(/what is (\d+)\s*(plus|minus|multiplied by|times|divided by|\/|\*)\s*(\d+)\?/i);
  if (arithmeticMatch) {
    const num1 = parseFloat(arithmeticMatch[1]);
    const operator = arithmeticMatch[2];
    const num2 = parseFloat(arithmeticMatch[3]);

    switch (operator) {
      case "plus":
        return (num1 + num2).toString();
      case "minus":
        return (num1 - num2).toString();
      case "multiplied by":
      case "times":
      case "*":
        return (num1 * num2).toString();
      case "divided by":
      case "/":
        if (num2 === 0) return "Cannot divide by zero";
        return (num1 / num2).toString();
      default:
        return "Operator not recognized";
    }
  }

  return "I don't know the answer to that.";
}
