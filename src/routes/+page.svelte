<script lang="ts">
import Carousel from '$lib/components/Carousel.svelte';
</script>


<div class="presentation">
    La plateforme où projets et devs se rencontrent enfin.   
<Carousel/>
</div>
<style>
:root{
    --font-family: 'BDO Grotesk' 
}
@font-face {
    font-display: swap;
    font-family: 'BDO Grotesk';
    font-style: normal;
    font-weight: 300;
    src: url(/src/lib/fonts/BDOGrotesk-Medium.woff2) format('woff2');
}
    
    
    :global(body) { 
        background-color: #f3f0eb;
        padding: 30px;
    }
    .presentation {
        display: flex;
        justify-content: space-between;
        border-radius: 15px;
        align-items: center;
        padding: 50px 50px;
        background-color: oklch(80.9% 0.105 251.813);
        font-family: 'BDO Grotesk';
        font-size: 30px;
        color: #231f20;
        text-align: center;
        height: 750px;
        padding-bottom: 70px;
    }
    .highlight1 {
        background-color: oklch(84.5% 0.143 164.978);
        border-radius: 5px;
        padding: 0px 4px 0px 4px ;
    }
</style>