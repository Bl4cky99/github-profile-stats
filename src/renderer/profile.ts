import { describeArc, escapeXml, truncateText, C } from 'renderer'
import type { ProfileStatsResult, TopLanguage } from 'types/github'

const W = 800
const H = 300
const PAD = 30
const GAP = 30

const COL_STATS_W = 240
const COL_RING_W = 220
const COL_LEGEND_W = W - 2 * PAD - 2 * GAP - COL_STATS_W - COL_RING_W

const COL1_X = PAD
const COL2_X = COL1_X + COL_STATS_W + GAP
const COL3_X = COL2_X + COL_RING_W + GAP

const RING_R = 90
const RING_INNER_R = 60
const MAX_LEGEND_ITEMS = 10

interface StatItem {
    label: string
    value: string
}

const renderStatItem = (
    label: string,
    value: string,
    x: number,
    y: number,
    maxW: number
): string => `
<text x="${x}" y="${y}" font-family="sans-serif" font-size="11" font-weight="500" fill="${C.label}" text-transform="uppercase" letter-spacing="0.5">${escapeXml(label)}</text>
<text x="${x}" y="${y + 20}" font-family="sans-serif" font-size="14" font-weight="600" fill="${C.value}">${escapeXml(truncateText(value, maxW, 14))}</text>`

const renderStatColumn = (
    items: StatItem[],
    x: number,
    y: number,
    maxW: number
): string =>
    items
        .map((item, i) =>
            renderStatItem(item.label, item.value, x, y + i * 48, maxW)
        )
        .join('\n')

const renderDonutRing = (
    languages: TopLanguage[],
    cx: number,
    cy: number
): string => {
    const total = languages.reduce((sum, l) => sum + l.size, 0)
    if (total === 0) return ''
    let angle = 0
    return languages
        .map((lang) => {
            const slice = (lang.size / total) * 360
            const gap = 2
            const start = angle + gap / 2
            const end = angle + slice - gap / 2
            angle += slice
            return slice <= gap
                ? ''
                : `<path d="${describeArc(cx, cy, RING_R, RING_INNER_R, start, end)}" fill="${lang.color}"/>`
        })
        .join('')
}

const renderLegend = (
    languages: TopLanguage[],
    x: number,
    y: number,
    maxW: number
): string => {
    const total = languages.reduce((sum, l) => sum + l.size, 0)
    const activeLangs = languages.slice(0, MAX_LEGEND_ITEMS)

    const NAME_FONT_SIZE = 14
    const PCT_FONT_SIZE = 13

    const BOX_SIZE = 10
    const PCT_WIDTH = 40
    const GAP = 8
    const rightEdge = x + maxW

    return activeLangs
        .map((lang, i) => {
            const pctStr = `${((lang.size / total) * 100).toFixed(1)}%`
            const ly = y + i * 22
            const pctX = rightEdge
            const boxX = rightEdge - PCT_WIDTH - GAP - BOX_SIZE
            const nameX = boxX - GAP

            return `
<text x="${pctX}" y="${ly}" font-family="sans-serif" font-size="${PCT_FONT_SIZE}" fill="${C.label}" text-anchor="end">${pctStr}</text>
<rect x="${boxX}" y="${ly - 8}" width="${BOX_SIZE}" height="${BOX_SIZE}" rx="2" fill="${lang.color}"/>
<text x="${nameX}" y="${ly}" font-family="sans-serif" font-size="${NAME_FONT_SIZE}" fill="${C.value}" text-anchor="end">${escapeXml(truncateText(lang.name, nameX - x, NAME_FONT_SIZE))}</text>`
        })
        .join('\n')
}

export const renderProfileCard = (data: ProfileStatsResult): string => {
    const stats: StatItem[] = [
        {
            label: 'Repositories',
            value: `${data.totalRepos} (${data.privateRepos} private)`
        },
        { label: 'Stars', value: data.stars.toLocaleString() },
        { label: 'Commits', value: data.totalCommits.toLocaleString() },
        {
            label: 'Pull Requests',
            value: `${data.pullRequests} open · ${data.closedPullRequests} closed`
        },
        {
            label: 'Issues',
            value: `${data.openIssues} open · ${data.closedIssues} closed`
        }
    ]

    const statsHeight = (stats.length - 1) * 48 + 20
    const statsY = (H - statsHeight) / 2 + 10

    const ringCx = COL2_X + COL_RING_W / 2
    const ringCy = H / 2

    const legendItemCount = Math.min(data.topLanguages.length, MAX_LEGEND_ITEMS)
    const legendHeight = (legendItemCount - 1) * 22
    const legendY = H / 2 - legendHeight / 2 + 4

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${C.bg}"/><stop offset="100%" stop-color="${C.bgDark}"/>
        </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" rx="16" fill="url(#bg)"/>
    
    <line x1="${COL2_X - GAP / 2}" y1="${PAD}" x2="${COL2_X - GAP / 2}" y2="${H - PAD}" stroke="${C.divider}" stroke-opacity="0.2"/>
    <line x1="${COL3_X - GAP / 2}" y1="${PAD}" x2="${COL3_X - GAP / 2}" y2="${H - PAD}" stroke="${C.divider}" stroke-opacity="0.2"/>

    ${renderStatColumn(stats, COL1_X, statsY, COL_STATS_W)}
    ${renderDonutRing(data.topLanguages, ringCx, ringCy)}
    ${renderLegend(data.topLanguages, COL3_X, legendY, COL_LEGEND_W)}

    <text x="${W - PAD}" y="${H - 12}" font-family="sans-serif" font-size="12" fill="${C.label}" fill-opacity="0.3" text-anchor="end">github.com/Bl4cky99</text>
</svg>`
}
