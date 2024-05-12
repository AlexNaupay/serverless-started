const index = async (event, context) => {
    let response = {
        message: 'Hello from index',
        // input: event,
        // context: context
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
    }
};


module.exports = {
    index
}