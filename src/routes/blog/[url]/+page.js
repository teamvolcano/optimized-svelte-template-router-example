import { faker } from '@faker-js/faker';
/** @type {import('./$types').PageLoad} */

export async function load({url}) {
    const seed = url.pathname.split('').reduce((acc, curr) => {
        return acc + curr.charCodeAt(0);
    }, 0);
    faker.seed(seed);
    const content = faker.lorem.paragraphs(5);
    return {
        content
    };
};