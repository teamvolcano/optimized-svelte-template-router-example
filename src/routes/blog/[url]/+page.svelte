<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Blog page</h1>

<p>
    This is a blog page. It is a dynamic page that is generated from a template.
    {data.content}
</p>