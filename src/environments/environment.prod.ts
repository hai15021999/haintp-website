/** Production environment. Replaces environment.ts at build time (angular.json → fileReplacements). Keep keys identical. */
export const environment = {
    production: true,
    version: '2.0.0',
    // TODO(owner): set the public site URL once the domain is confirmed (docs/20-operations/environments.md).
    siteUrl: '',
    /** EmailJS public identifiers. Public by design (browser SDK); see docs/20-operations/security.md. */
    emailjs: {
        serviceId: 'service_casber',
        templateId: 'template_contact',
        publicKey: 'xtxyuheaEH3B9HIKg',
    },
};
