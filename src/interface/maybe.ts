export class Maybe<T> {

    public static Just<T>(value: T) {
        return new Maybe<T>(value)
    }

    public static Nothing<T>() {
        return new Maybe<T>(null)
    }
    private value: T | null
    public constructor(value: T | null) {
        this.value = value
    }

    public unwrap(): T {
        if (this.value === null) {
            throw new Error('trying to unrwap nothing')
        } else {
            return this.value
        }
    }

    public map<U>(f: (x: T) => U): Maybe<U> {
        if (this.value === null) {
            return Maybe.Nothing<U>()
        } else {
            return Maybe.Just<U>(f(this.value))
        }
    }

    public connect<U>(f: (x: T) => Maybe<U>): Maybe<U> {
        if (this.value === null) {
            return Maybe.Nothing<U>()
        } else {
            return f(this.value)
        }
    }
}
