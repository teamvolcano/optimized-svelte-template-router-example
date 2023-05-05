
<script context="module">
    
</script>

<script>
    import Section1 from "../components/sections/section1.svelte";
    import Section2 from "../components/sections/section2.svelte";
    import Section3 from "../components/sections/section3.svelte";
    import Section4 from "../components/sections/section4.svelte";
    import Section5 from "../components/sections/section5.svelte";
    export let content;
    // export let static

    // require('../components/sections/section1.svelte')
    // eval require('../components/sections/section1.svelte')
    // const comp = require('../components/sections/section1.svelte')

    let componentMap = []
    // make section components unique and loop trough and add to componentMap
    // content.customData.sections.forEach(section => {
    //     if(!componentMap.includes(section.type)){
    //         const component = await import(`../components/sections/${section.type}.svelte`).default
    //         componentMap.push(section.type)
    //     }
    // })

</script>




<h1>
    Home
</h1>

<p>Made by:
    <a href="https://volcano.nl" target="_blank">Volcano</a>
</p>

<p>
    Welkom op de homepagina van deze demo. <br>
    <br>
    In deze demo worden alle pagina's op een catchall route opgevangen. <br>
    Binnen deze catchall wordt er bepaald welke template er in geladen moet worden. <br>
<p>

<h2>
    Dynamic sections
</h2>
<section>
    <div class="section1">
        
        {#each content.customData.sections as section}
            {#if section.type === 'section1'}
                <Section1 content={section} />
            {/if}
            {#if section.type === 'section2'}
                <Section2 content={section} />
            {/if}
            {#if section.type === 'section3'}
                <Section3 content={section} />
            {/if}
            {#if section.type === 'section4'}
                <Section4 content={section} />
            {/if}
            {#if section.type === 'section5'}
                <Section5 content={section} />
            {/if}
        {/each}

    </div>
</section>