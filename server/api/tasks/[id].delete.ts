export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const taskExists = true;

  if (!taskExists) {
    throw createError({
      statusCode: 404,
      statusMessage: `Task with ID ${id} not found`,
    });
  }

  return {
    success: true,
    message: `Task ${id} has been permanently deleted`,
  };
});
