export function getSquarePerimeter(width, length) {
    return 2 * width + 2 * length
}

export function getCirclePerimeter(radius) {
    return Math.round(Math.PI * radius * 2 * 100) / 100
}