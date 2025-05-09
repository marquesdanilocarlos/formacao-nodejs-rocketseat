export default function extractQueryParams(query: string): any {
    return query.substring(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
        return queryParams;
    }, {})
}