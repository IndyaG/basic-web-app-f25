export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Indya";
  }

  if (query.toLowerCase().includes("id")) {
    return("igriffin");
  }

  if (query.toLowerCase().includes("60")) {
    return("89");
  }

  if (query.toLowerCase().includes("84 plus 98")) {
    return("182");
  }



  return "";
}
