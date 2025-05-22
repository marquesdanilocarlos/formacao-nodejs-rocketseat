declare module 'http' {
    interface IncomingMessage {
        body: object|null,
        query?: QueryString
        params: Params
    }
}

interface Params {
    id?: string;
    groups?: {
        query?: string
    }
}

interface QueryString {
    search?: string
}