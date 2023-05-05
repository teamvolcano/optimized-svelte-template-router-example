<script>
    export let content;
</script>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1rem;
    }
    article{
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>

<h1>
    Blog overview
</h1>

<div class="grid">


{#each content.customData.posts as post}
    <article>
        <h2>{post.title}</h2>
        <a href="{post.url}">Read more</a>
    </article>
{/each}

</div>