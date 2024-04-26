export function formatMySQLTimestamp(timestamp: string) {
    let date = new Date(timestamp).toISOString().slice(0, 19).replace("T", " ");

    // Remove dashes, colons, and spaces, replacing them with underscores
    return date.replace(/[-:\s]/g, "_");
}
