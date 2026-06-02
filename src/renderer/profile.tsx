import { C, renderToSvg } from '@/renderer'
import type { ProfileStatsResult, TopLanguage } from '@/types/github'

const W = 800
const H = 300
const MAX_LANGS = 8

const Header = ({ name, login }: { name: string; login: string }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
        }}
    >
        <span style={{ fontSize: 24, fontWeight: 600, color: C.value }}>
            {name} ({login})
        </span>
        <span
            style={{
                fontSize: 12,
                fontWeight: 500,
                color: C.label,
                textTransform: 'uppercase',
                letterSpacing: 2
            }}
        >
            GitHub Statistics
        </span>
    </div>
)

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
    >
        <span style={{ fontSize: 22, fontWeight: 600, color: C.value }}>
            {value}
        </span>
        <span
            style={{
                fontSize: 11,
                fontWeight: 500,
                color: C.label,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 2
            }}
        >
            {label}
        </span>
    </div>
)

const VDivider = () => (
    <div
        style={{
            width: 1,
            height: 36,
            backgroundColor: C.divider,
            opacity: 0.2
        }}
    />
)

const StatsRow = ({ data }: { data: ProfileStatsResult }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32
        }}
    >
        <Stat
            label="Repositories"
            value={`${data.totalRepos} (${data.privateRepos} private)`}
        />
        <VDivider />
        <Stat label="Stars" value={data.stars.toLocaleString()} />
        <VDivider />
        <Stat label="Commits" value={data.totalCommits.toLocaleString()} />
    </div>
)

const LangBar = ({
    languages,
    total
}: {
    languages: TopLanguage[]
    total: number
}) => (
    <div
        style={{
            display: 'flex',
            width: '100%',
            height: 16,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: C.divider
        }}
    >
        {languages.map((l) => (
            <div
                style={{
                    width: `${(l.size / total) * 100}%`,
                    backgroundColor: l.color
                }}
            />
        ))}
    </div>
)

const LangChip = ({ lang }: { lang: TopLanguage }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div
            style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                backgroundColor: lang.color
            }}
        />
        <span style={{ fontSize: 13, color: C.value }}>{lang.name}</span>
    </div>
)

const LangList = ({ languages }: { languages: TopLanguage[] }) => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            gap: 14
        }}
    >
        {languages.map((l) => (
            <LangChip lang={l} />
        ))}
    </div>
)

const ProfileCard = ({ data }: { data: ProfileStatsResult }) => {
    const total = data.topLanguages.reduce((s, l) => s + l.size, 0) || 1
    const langs = data.topLanguages.slice(0, MAX_LANGS)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                width: W,
                height: H,
                padding: 30,
                borderRadius: 16,
                position: 'relative',
                fontFamily: 'Inter',
                backgroundImage: `linear-gradient(135deg, ${C.bg}, ${C.bgDark})`
            }}
        >
            <Header name={data.name} login={data.login} />
            <StatsRow data={data} />
            <LangBar languages={langs} total={total} />
            <LangList languages={langs} />

            <div
                style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 30,
                    fontSize: 12,
                    color: C.label,
                    opacity: 0.3
                }}
            >
                {`github.com/${data.login}`}
            </div>
        </div>
    )
}

export const renderProfileCard = (data: ProfileStatsResult): Promise<string> =>
    renderToSvg(<ProfileCard data={data} />, W, H)
