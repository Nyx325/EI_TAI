export function extractErrors(error) {
    return error.errors.map((err) => ({
        field: err.path[0] || "general",
        message: err.message,
    }));
}
