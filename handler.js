const index = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello from index',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports = {
    index
}