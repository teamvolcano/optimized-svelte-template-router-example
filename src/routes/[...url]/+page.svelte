<script>
    export let data;
</script>

{#key data.url}
    <svelte:component this={data.templateModule} content={data.content} />
{/key}