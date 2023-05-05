<script>
    export let content = {};
</script>

<style>
    div{
        background-color: black;
        height: 200px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>

<div>
    <h3>
        {content.title}
    </h3>
    <p>
        {content.content}
    </p>
</div>