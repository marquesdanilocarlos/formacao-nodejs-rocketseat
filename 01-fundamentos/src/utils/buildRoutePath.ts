export default function buildRoutePath(path: string): RegExp {
    const routeParameterRegex = /:([a-zA-Z]+)/g;
    const params = path.replaceAll(routeParameterRegex, '(?<$1>[a-z0-9-_]+)');
    return new RegExp(`^${params}`);
}