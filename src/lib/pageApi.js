import { browser } from "$app/environment";

var clientPageStore = []

export async function fetchPage(url, svelteFetch) {

    // check if page is already in store and return
    if (browser) {
        const existingPage = clientPageStore.find((page) => page.url === url);
        if (existingPage) existingPage.content
    }

    const res = await svelteFetch(`/api/page?slug=${url.pathname}`);
    const content = await res.json();

    // add page to store with parm url and content
    if (browser) clientPageStore.push({ url, content, });

    return content;
}

