const logRequestTrigger = (uri: string, method?: string, body?: unknown) => console.log('🔫', method, uri, body)

export {logRequestTrigger}