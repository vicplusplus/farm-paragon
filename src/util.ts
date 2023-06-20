export function clone_with_override<T>(obj: T, overrides: Partial<T>): T {
    const newObject: T = clone<T>(obj);

    for (const key in obj) {
        newObject[key] = overrides[key] ?? obj[key];
    }

    return newObject;
}

export const EPSILON = 0.0000001;

export function clone<T>(source: T): T {
    if (typeof source !== "object" || source === null || source === undefined) {
        return source;
    }

    if (Array.isArray(source)) {
        return source.map(clone) as T;
    }

    const deepObj = {} as T;

    for (const key of Object.keys(source)) {
        deepObj[key as keyof T] = clone(source[key as keyof T]);
    }

    return deepObj;
}