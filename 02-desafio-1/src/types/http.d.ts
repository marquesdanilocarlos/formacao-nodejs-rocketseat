declare module 'http' {
    interface IncomingMessage {
        body: object|null
    }
}