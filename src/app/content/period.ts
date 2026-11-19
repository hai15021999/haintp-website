import { Period, YearMonth } from './content.types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(ym: YearMonth): { year: number; month: number } {
    const [year, month] = ym.split('-').map(Number);
    return { year, month };
}

/** 'Jun 2020'. */
export function formatYearMonth(ym: YearMonth): string {
    const { year, month } = parse(ym);
    return `${MONTHS[month - 1]} ${year}`;
}

/** 'Jun 2020 – Present' or 'Jun 2020 – Dec 2025'. */
export function formatPeriod(period: Period): string {
    return `${formatYearMonth(period.start)} – ${period.end ? formatYearMonth(period.end) : 'Present'}`;
}

/** Education date: 'Graduated Apr 2024', else the study period, else ''. */
export function formatEducationDate(item: { graduated?: YearMonth; period?: Period }): string {
    if (item.graduated) return `Graduated ${formatYearMonth(item.graduated)}`;
    return item.period ? formatPeriod(item.period) : '';
}

/** Whole years between a start month and today (floored). */
export function yearsSince(start: YearMonth, today = new Date()): number {
    const { year, month } = parse(start);
    const months = (today.getFullYear() - year) * 12 + (today.getMonth() + 1 - month);
    return Math.max(0, Math.floor(months / 12));
}
