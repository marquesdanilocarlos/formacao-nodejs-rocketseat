declare module 'http' {
    interface IncomingMessage {
        body: {
            name: string;
            email: string;
        };
        params: Params
    }

    interface Params {
        groups: {
            id: string
        }
    }
}