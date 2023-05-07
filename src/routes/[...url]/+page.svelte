<script>
    export let data;
</script>

<span>API REQUEST ID: {data?.content?.customData?.id}</span>

{#key data?.url}
    <svelte:component this={data?.templateModule} content={data?.content} />
{/key}