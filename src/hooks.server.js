const STALE_FETCH_CACHE_ENABLED = import.meta.env.VITE_STALE_FETCH_CACHE_ENABLED === 'true'
// const VITE_PAYLOAD_INTERNAL_URL = import.meta.env.VITE_PAYLOAD_INTERNAL_URL
// const VITE_PAYLOAD_EXTERNAL_URL = import.meta.env.VITE_PAYLOAD_EXTERNAL_URL

const staleFetchCacheConfig = {
    TTL: 3000, // 3 seconds
    enabeld: STALE_FETCH_CACHE_ENABLED,
    includeRegex: [
        /\/.*/,
    ],
    excludeRegex: [],
    cache: [],
}

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ event, request, fetch }) {

    // Convert internal to external api url
    // request = handleInternalToExternalConversion(request);

    // Check if request is with stale fetch cache
    const needsCache = handleCacheConditions(request.url);
    if (!needsCache) return fetch(request);

    return handleStaleFetchCache(event, request, fetch);
    // return fetch(request);
}

// function handleInternalToExternalConversion(request) {
//     const intern = VITE_PAYLOAD_EXTERNAL_URL
//     const extern = VITE_PAYLOAD_INTERNAL_URL

//     if (intern === extern) return request;

//     const urlIsRelative = request.url.startsWith('/');
//     const urlIncludesExternal = request.url.includes(extern);

//     if (urlIsRelative) {
//         return new Request(
//             request.url.replace('/', intern),
//             request
//         )
//     }
//     if (urlIncludesExternal) {
//         return new Request(
//             request.url.replace(extern, intern),
//             request
//         )
//     }

//     return request;
// }

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
        return generateResponse(
            cache[request.url].content,
            cache[request.url].headers
        );
    }

    // if ttl expired, fetch and add to cache, or if not in cache fetch
    if (!cache[request.url] || cachedPage.invalidate < Date.now()) {
        cache[request.url] = {
            url: request.url,
            invalidate: Date.now() + staleFetchCacheConfig.TTL,
            inQue: true,
            content: cachedPage?.content,
            headers: cachedPage?.headers,
            fetchPromise: new Promise(async (resolve, reject) => {
                let res = await fetch(request);
                let content = await res.text();
                cache[request.url].content = content
                cache[request.url].headers = res.headers
                resolve([content, res.headers])
            })
        }
    }

    // If page exist in cache return it stale
    if (cache[request.url]?.content) {
        return generateResponse(
            cache[request.url].content,
            cache[request.url].headers
        );
    }

    // Waiting for fetch to finish, there is no content yet
    const [content, headers] = await cache[request.url].fetchPromise;
    return generateResponse(content, headers);
}

function generateResponse(content, headers) {
    return new Response(content, {
        headers: headers
    });
}

