import { error} from '@sveltejs/kit'
import { fetchPage } from '$lib/pageApi';

export async function load({ fetch, url }) {
    try {
        const content = await fetchPage(url, fetch);

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
        if (import.meta.env.DEV) {
            console.error(err);
        }
        throw error(404, 'Pagina niet gevonden')
    }
}