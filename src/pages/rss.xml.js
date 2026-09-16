import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
    const thoughts = await getCollection('thoughts');

    return rss({
        // `<title>` field in output xml
        title: "Pat's thoughts",
        // `<description>` field in output xml
        description: 'Pat is disassociating again :)',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: thoughts.map((thought) => ({
            title: thought.data.title,
            pubDate: thought.data.date,
            content: sanitizeHtml(parser.render(thought.body), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }),
            categories: thought.data.tags,
            link: `./thoughts/${thought.data.id}`,
        })
        ),
        // (optional) inject custom xml
        
        customData: `<language>en-gb</language>`,
    });
}