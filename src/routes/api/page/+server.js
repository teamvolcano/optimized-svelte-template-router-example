
/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {

    // Wait for 2 seconds to simulate a slow API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const slug = url.searchParams.get('slug');

    let id;
    let template;
    let customData = {};

    if (slug === '/') {
        id = 1;
        template = 'home'
        customData = {
            sections: [
                {
                    type: 'section1',
                    title: 'Section 1',
                    content: 'This is section 1',
                },
                {
                    type: 'section4',
                    title: 'Section 4',
                    content: 'This is section 4',
                },
                {
                    type: 'section3',
                    title: 'Section 3',
                    content: 'This is section 3',
                },
            ]
        }
    }
    else if (slug === '/about') {
        id = 2;
        template = 'about'
    }
    else if (slug === '/default') {
        id = Math.round(Math.random() * 100);
    }
    else if (slug === '/contact') {
        id = 3;
        template = 'contact'
    }
    else if (slug === '/blog') {
        id = 4;
        template = 'blog-overview'
        customData = {
            posts: [
                {
                    title: 'Post 1',
                    url: '/blog/post-1',
                },
                {
                    title: 'Post 2',
                    url: '/blog/post-2',
                },
                {
                    title: 'Post 3',
                    url: '/blog/post-3',
                }
            ]
        }
    }

    if (id == null) return new Response(null, { status: 404 });

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    customData.id = Math.round(Math.random() * 100);

    return new Response(
        JSON.stringify({
            template,
            data: await res.json(),
            customData,
        }),
    );
};