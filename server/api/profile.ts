interface ProfileResponse {
  displayName: string;
  displayAge: number;
  themeColor: string;
  rank: "Newcomer" | "Veteran" | "Legend";
}

export default defineEventHandler((event): ProfileResponse => {
  const query = getQuery(event);

  // We use "as string" to help TS understand the query types
  const name = (query.name as string) || "Anonymous";
  const age = Number(query.age) || 0;
  const color = (query.color as string) || "#cccccc";

  let rank: ProfileResponse["rank"] = "Newcomer";
  if (age > 18) rank = "Veteran";
  if (age > 50) rank = "Legend";

  return {
    displayName: name.toUpperCase(),
    displayAge: age,
    themeColor: color,
    rank: rank,
  };
});
