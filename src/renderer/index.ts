// Colors

export const C = {
    bg: '#0d1117',
    bgDark: '#010409',
    divider: '#30363d',
    label: '#8b949e',
    value: '#c9d1d9'
} as const

// Text

export const escapeXml = (s: string): string =>
    s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

export const estimateTextWidth = (text: string, fontSize: number): number =>
    text.length * fontSize * 0.6

export const truncateText = (
    text: string,
    maxWidth: number,
    fontSize: number
): string => {
    const maxChars = Math.floor(maxWidth / (fontSize * 0.6))
    if (text.length <= maxChars) return text
    return text.slice(0, Math.max(1, maxChars - 1)) + '...'
}

// Geometry

export const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
): { x: number; y: number } => {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad)
    }
}

export const describeArc = (
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number
): string => {
    if (endAngle - startAngle >= 360) endAngle = startAngle + 359.99

    const outerStart = polarToCartesian(cx, cy, outerR, startAngle)
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle)
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle)
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle)
    const large = endAngle - startAngle > 180 ? 1 : 0

    return [
        `M ${outerStart.x} ${outerStart.y}`,
        `A ${outerR} ${outerR} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
        `L ${innerEnd.x} ${innerEnd.y}`,
        `A ${innerR} ${innerR} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
        'Z'
    ].join(' ')
}
