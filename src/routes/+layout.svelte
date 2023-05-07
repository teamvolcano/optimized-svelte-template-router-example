<script>
    import Navigation from '$components/navigation.svelte';
    import { fly } from 'svelte/transition';
</script>

<style lang="scss" global>
    @import './globals.scss';

    .layout {
        display: grid;
        grid-template-columns: 100px 4fr;
        grid-template-rows: 1fr;
        grid-template-areas: "nav main";
        height: 100vh;
    }
</style>

<div class="layout">
    <Navigation />
    <main>
        <div 
            out:fly="{{ y: -50, duration: 250 }}"
            in:fly="{{ y: 50, duration: 250 }}"
        >   
            <slot></slot>
        </div>
    </main>
</div>