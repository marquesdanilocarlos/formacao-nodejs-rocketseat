declare module 'http' {
    interface IncomingMessage {
        body?: {
            name: string;
            email: string;
        } | null;
        params: Params,
        query: QueryString
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
}