export default defineEventHandler((event) => {
  const query = getQuery(event);
  const name = query.name;
  let userName;
  if (name) {
    userName = name;
  } else {
    userName = "World";
  }
  return {
    message: `Hello ${userName}!`,
  };
});
