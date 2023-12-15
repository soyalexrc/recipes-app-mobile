export interface GenericResult<T> {
    data: T,
    error: boolean | null,
    message?: string,
}

