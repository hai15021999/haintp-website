/** Development environment. Production values: environment.prod.ts (swapped by angular.json fileReplacements). */
export const environment = {
    production: false,
    siteUrl: 'http://localhost:4200',
    /** EmailJS public identifiers. Public by design (browser SDK); see docs/20-operations/security.md. */
    emailjs: {
        serviceId: 'service_casber',
        templateId: 'template_contact',
        publicKey: 'xtxyuheaEH3B9HIKg',
    },
};
