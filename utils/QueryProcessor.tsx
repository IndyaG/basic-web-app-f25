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

  // Largest number
  const largestMatch = query.match(/which of the following numbers is the largest:\s*([\d,\s]+)\?/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map(num => parseInt(num.trim(), 10));
    return Math.max(...numbers).toString();
  }

  // Numbers that are both square and cube (perfect sixth powers)
  const squareCubeMatch = query.match(/which of the following numbers is both a square and a cube:\s*([\d,\s]+)\?/i);
  if (squareCubeMatch) {
    const numbers = squareCubeMatch[1].split(",").map(num => parseInt(num.trim(), 10));
    const result = numbers.filter(num => {
      const sixthRoot = Math.round(Math.pow(num, 1 / 6));
      return sixthRoot ** 6 === num;
    });
    return result.join(", ") || "None";
  }

  // Prime numbers
  const primeMatch = query.match(/which of the following numbers are primes:\s*([\d,\s]+)\?/i);
  if (primeMatch) {
    const numbers = primeMatch[1].split(",").map(num => parseInt(num.trim(), 10));
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    const primes = numbers.filter(isPrime);
    return primes.join(", ") || "None";
  }

  // Exponentiation: "What is X to the power of Y?"
  const powerMatch = query.match(/what is (\d+)\s*to the power of\s*(\d+)\?/i);
  if (powerMatch) {
    const base = parseFloat(powerMatch[1]);
    const exponent = parseFloat(powerMatch[2]);
    return Math.pow(base, exponent).toString();
  }

  // Dynamic arithmetic with multiple operations
  const arithmeticMatch = query.match(/what is (.+)\?/i);
  if (arithmeticMatch) {
    let expression = arithmeticMatch[1];

    // Replace words with JS operators
    expression = expression
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/multiplied by|times/g, "*")
      .replace(/divided by/g, "/");

    try {
      // Evaluate safely using Function
      const result = Function(`return ${expression}`)();
      return result.toString();
    } catch (e) {
      return "Could not compute the expression.";
    }
  }

  return "I don't know the answer to that.";
}
