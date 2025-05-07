declare module 'http' {
    interface IncomingMessage {
        body?: {
            name: string;
            email: string;
        } | null;
    }
}