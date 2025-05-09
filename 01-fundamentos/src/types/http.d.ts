declare module 'http' {
    interface IncomingMessage {
        body: {
            name: string;
            email: string;
        };
        params: Params,
        query: {}
    }

    interface Params {
        id?: string
        query?: string
    }
}