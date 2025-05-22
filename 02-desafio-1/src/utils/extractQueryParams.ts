export default function extractQueryParams(query: string): QueryString {
    return Object.fromEntries(
        query.substring(1).split("&").map((param) => {
            const [key, value] = param.split("=");
            return [key, value];
        })
    );
}