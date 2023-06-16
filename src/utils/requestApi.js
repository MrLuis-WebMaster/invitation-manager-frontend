/**
 * Performs an API request using the specified HTTP method, URL and data.
 * @param {string} method - The HTTP method to use for the request (e.g. "GET", "POST", "PUT", "DELETE", etc.).
 * @param {string} url - The URL of the API endpoint to call.
 * @param {object} data - The data to include in the request body (if any).
 * @returns {Promise} - A Promise that resolves with the response data from the API, or rejects with an error.
 */
const api = async (method, url, data) => {
    try {
        const headers = { 'Content-Type': 'application/json' };
        const options = { method, headers };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
            options
        );
        const responseData = await response.json();

        return responseData;
    } catch (error) {
        return error;
    }
};

export default api;
