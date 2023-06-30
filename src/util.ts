export function clone_with_override<T>(obj: T, overrides: Partial<T>): T {
    const newObject: T = clone<T>(obj);

    for (const key in obj) {
        newObject[key] = overrides[key] ?? obj[key];
    }

    return newObject;
}

export function clone<T>(source: T): T {
    return JSON.parse(JSON.stringify(source));
}