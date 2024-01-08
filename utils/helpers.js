export function createRange(range = 10, start = 0, pad = true) {
    const result = Math.trunc(Math.random() * range + start)
    return pad ? ('' + result).padStart(2, '0') : result
}

export function guid(prefix, joiner = '-') {
    return (prefix ? prefix + joiner : '') + Math.random().toString(32).slice(2)
}