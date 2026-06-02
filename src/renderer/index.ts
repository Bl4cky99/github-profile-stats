import satori from 'satori'
import { join } from 'node:path'
import { file } from 'bun'
import type { JSXNode } from 'satori/jsx'

export const C = {
    bg: '#0d1117',
    bgDark: '#010409',
    divider: '#30363d',
    label: '#8b949e',
    value: '#c9d1d9'
} as const

const FONT_DIR = join(process.cwd(), 'fonts')

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type FontStyle = 'normal' | 'italic'
type FontEntry = {
    name: string
    data: ArrayBuffer
    weight: FontWeight
    style: FontStyle
}

let fontCache: FontEntry[] | null = null

const loadFonts = async () => {
    if (fontCache) return fontCache

    const [regular, bold] = await Promise.all([
        file(join(FONT_DIR, 'Kanit-Regular.ttf')).arrayBuffer(),
        file(join(FONT_DIR, 'Kanit-Bold.ttf')).arrayBuffer()
    ])

    fontCache = [
        { name: 'Kanit', data: regular, weight: 400, style: 'normal' },
        { name: 'Kanit', data: bold, weight: 800, style: 'normal' }
    ]

    return fontCache
}

export const renderToSvg = async (
    node: JSXNode,
    width: number,
    height: number
) => {
    return satori(node, {
        width,
        height,
        fonts: await loadFonts()
    })
}
