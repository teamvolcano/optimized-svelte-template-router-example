import { STALE_FETCH_CACHE_ENABLED } from '$env/static/private';

const staleFetchCacheConfig = {
    TTL: 3000, // 3 seconds
    enabeld: STALE_FETCH_CACHE_ENABLED ?? false,
    includeRegex: [
        /\/.*/,
    ],
    excludeRegex: [],
    cache: [],
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {
    // Check if request is with stale fetch cache
    const needsCache = handleCacheConditions(request.url);
    if (!needsCache) return fetch(request);

    return handleStaleFetchCache(event, request, fetch);
}

function handleCacheConditions(url) {
    if (!staleFetchCacheConfig.enabeld) return false;

    // run checks on exclude regex
    for (const regex of staleFetchCacheConfig.excludeRegex) {
        if (regex.test(url)) return false;
    }

    // run checks on include regex
    for (const regex of staleFetchCacheConfig.includeRegex) {
        if (regex.test(url)) return true;
    }

    return true;
}

// Function to run in the server hooks
async function handleStaleFetchCache(event, request, fetch) {
    let cache = staleFetchCacheConfig.cache;

    // If page is in cache and not stale and not inQue, return it
    let cachedPage = cache[request.url];
    if (cachedPage && cachedPage.invalidate > Date.now() && cache[request.url].content) {
        return generateResponse(cache[request.url].content);
    }

    // if ttl expired, fetch and add to cache, or if not in cache fetch
    if (!cache[request.url] || cachedPage.invalidate < Date.now()) {
        cache[request.url] = { 
            url: request.url, 
            invalidate: Date.now() + staleFetchCacheConfig.TTL,
            inQue: true,
            content: cachedPage?.content,
            fetchPromise: new Promise(async (resolve, reject) => {
                let res = await fetch(request)
                let content = await res.json();
                cache[request.url].content = content
                resolve(content)
            })
        }
    }

    // If page exist in cache return it stale
    if (cache[request.url]?.content) {
        return generateResponse(cache[request.url].content);
    }

    // Waiting for fetch to finish, there is no content yet
    return generateResponse(await cache[request.url].fetchPromise);
}

function generateResponse(content) {
    return new Response(JSON.stringify(content), {
        headers: {
            'content-type': 'application/json'
        }
    });
}

