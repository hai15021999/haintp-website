/**
 * Content model. Every page reads from these types; no page hard-codes profile, project or resume text.
 * Spec: docs/00-ssot/api-contracts.md § Content contracts.
 */

/** Year-month in ISO form, e.g. '2026-01'. */
export type YearMonth = `${number}-${number}`;

export interface Period {
    start: YearMonth;
    /** Omit for an ongoing item ("Present"). */
    end?: YearMonth;
}

export interface SocialLink {
    id: 'github' | 'facebook' | 'instagram' | 'linkedin';
    label: string;
    url: string;
}

export interface Profile {
    fullName: string;
    displayName: string;
    role: string;
    location: string;
    /** First month of professional front-end work. Drives "years of experience". */
    careerStart: YearMonth;
    headline: string;
    summary: string;
    /** Public contact details, published at the owner's request (2026-11-18). */
    email: string;
    phone: { display: string; tel: string };
    avatar: string;
    portrait: string;
    socials: SocialLink[];
}

export interface Technology {
    id: string;
    name: string;
    note: string;
    /** Path under src/assets/logos, or undefined for text-only. */
    logo?: string;
}

export interface SkillGroup {
    id: string;
    title: string;
    summary: string;
    icon: IconName;
    items: Technology[];
}

export type ProjectType = 'professional' | 'personal';

export interface ProjectLink {
    label: string;
    url: string;
    kind: 'source' | 'live' | 'docs';
}

/** A headline fact shown in the detail hero, e.g. { value: '2', label: 'Angular apps' }. Facts only, never estimates. */
export interface ProjectMetric {
    value: string;
    label: string;
}

/** Ordered steps of the business flow, rendered as a themeable step diagram ("How it works"). */
export interface ProjectFlow {
    /** One or two sentences that explain the flow. */
    summary: string;
    steps: string[];
}

/** Technologies of one layer (e.g. 'Front-end', 'Realtime') and what each is used for. */
export interface ProjectTechGroup {
    layer: string;
    /** `purpose` omitted when the owner has not stated it — never guess. */
    items: { name: string; purpose?: string }[];
}

/** One engineering decision: the situation, what was chosen, and why. */
export interface ProjectDecision {
    title: string;
    context: string;
    decision: string;
    rationale: string;
}

/** Short, real code excerpt (10–25 lines). Never client code unless the owner cleared it. */
export interface ProjectCodeSample {
    title: string;
    /** Display label, e.g. 'CSS', 'TypeScript'. */
    language: string;
    code: string;
    /** Why this excerpt is worth reading. */
    note: string;
}

/** Screenshot or diagram under assets/images/projects/<slug>/. Client data must be masked. */
export interface ProjectMedia {
    src: string;
    alt: string;
    caption: string;
}

export interface Project {
    /** URL slug: /portfolio/:slug. Lowercase kebab-case, never reused. */
    slug: string;
    title: string;
    type: ProjectType;
    /** One sentence, shown on cards. */
    summary: string;
    /** Client or employer context, shown on the detail page. */
    context?: string;
    /** Omit when unknown or confidential. */
    role?: string;
    period?: Period;
    stack: string[];
    highlights: string[];
    /** Cover image path (assets/images/projects/*). 16:9. */
    cover: string;
    /** Optional long-form Markdown under src/assets/case-studies/<slug>.md */
    caseStudy?: boolean;
    links?: ProjectLink[];
    featured?: boolean;

    // ── Optional case-study sections. Each renders only when present. ──
    /** 2–4 headline facts under the hero summary. */
    metrics?: ProjectMetric[];
    /** The business problem, in 1–3 sentences. */
    problem?: string;
    flow?: ProjectFlow;
    /** "Tech stack" section: what each technology does. When set, the sidebar tag list is hidden. */
    techStack?: ProjectTechGroup[];
    decisions?: ProjectDecision[];
    codeSamples?: ProjectCodeSample[];
    gallery?: ProjectMedia[];
    /** Results the owner can state (no invented numbers). */
    outcomes?: string[];
    /** Lessons and next steps ("Looking back"). */
    retrospective?: string[];
    /**
     * Company policy forbids details. Only title, summary and cover are shown; the detail page shows a
     * confidentiality notice instead of role, period, stack, highlights or case study. Keep those fields empty.
     */
    confidential?: boolean;
}

export interface ExperienceItem {
    id: string;
    company: string;
    title: string;
    period: Period;
    location?: string;
    summary: string;
    achievements: string[];
    stack: string[];
    /** Project slugs to cross-link to the portfolio. */
    projects?: string[];
}

export interface EducationItem {
    id: string;
    school: string;
    degree: string;
    /** Graduation month. Preferred: the owner shows only when they graduated, not the study span. */
    graduated?: YearMonth;
    /** Study span. Only when the owner wants it shown; `graduated` wins when both are set. */
    period?: Period;
    logo?: string;
}

export interface Resume {
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    /** Short labels grouped for the resume sidebar. */
    skills: { group: string; items: string[] }[];
    languages: { name: string; level: string }[];
}

/** Names accepted by <app-icon>. Keep in sync with shared/icon/icon.paths.ts. */
export type IconName =
    | 'user'
    | 'briefcase'
    | 'file-text'
    | 'mail'
    | 'github'
    | 'facebook'
    | 'instagram'
    | 'linkedin'
    | 'external'
    | 'arrow-right'
    | 'arrow-left'
    | 'menu'
    | 'panel'
    | 'sun'
    | 'moon'
    | 'monitor'
    | 'code'
    | 'palette'
    | 'layers'
    | 'server'
    | 'git-branch'
    | 'graduation'
    | 'map-pin'
    | 'calendar'
    | 'printer'
    | 'search'
    | 'send'
    | 'check'
    | 'alert'
    | 'x'
    | 'download'
    | 'lock'
    | 'sparkles'
    | 'network'
    | 'phone';
