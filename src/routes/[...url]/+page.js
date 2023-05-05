import { error} from '@sveltejs/kit'

export async function load({ fetch, url }) {

    // fetch from /api?slug=[this url]
    try {
        const res = await fetch(`/api?slug=${url.pathname}`);
        const content = await res.json();

        let templateModule;
        if (content.template === 'home') templateModule = await import('$templates/home.svelte');
        else if (content.template === 'about') templateModule = await import('$templates/about.svelte');
        else if (content.template === 'contact') templateModule = await import('$templates/contact.svelte');
        else if (content.template === 'blog-overview') templateModule = await import('$templates/blog-overview.svelte');
        if (templateModule == null) templateModule = await import('$templates/default.svelte');

        return {
            templateModule: templateModule.default,
            content,
            url,
        };
    } catch (err) {
        throw error(404, 'Pagina niet gevonden')
    }
}