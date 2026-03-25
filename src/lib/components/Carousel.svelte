<script lang="ts">
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Autoplay from "embla-carousel-autoplay";
  import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
  import { onMount } from "svelte";

  let devs: any[] = $state([]);
  let emblaApi: EmblaCarouselType | undefined = $state();
  let options: EmblaOptionsType = { loop: true };
  let plugins = [Autoplay({ delay: 4000 })];

  onMount(async () => {
    const res = await fetch("/api/devs");
    devs = await res.json();
  });

  function onemblaInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    use:emblaCarouselSvelte={{ options, plugins }}
    onemblaInit={onemblaInit}
  >
    <div class="embla__container">
      {#each devs as dev}
        <div class="embla__slide">
            {#if dev.imageUrl}
            <img src={dev.imageUrl} alt="{dev.firstName} {dev.lastName}" />
            {/if}
            

                <h2>{dev.firstName} {dev.lastName}</h2>
                <p>{dev.title}</p>
                <a href={dev.github} target="_blank">GitHub</a>
                {#if dev.cvUrl}
                <a href={dev.cvUrl} target="_blank">CV</a>
                {/if}
        </div>
      {/each}
    </div>
    <button onclick={() => emblaApi?.scrollPrev()}>←</button>
    <button onclick={() => emblaApi?.scrollNext()}>→</button>
  </div>
</div>

<style>
  .embla__viewport { overflow: hidden; }
  .embla__container { 
    display: flex; 
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .embla__slide img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }

  h1,h2,h3,p,a {
    margin: 0px;
    padding-left: 16px;
  }
 h2 {
    font-size: 25px;
    gap: 6px;
    padding-top: 16px;
 }
 a {
    padding-bottom:16px;
      all: none;
      font-size: 14px;

 }
 p {
    font-size: 13px;
    color: #666;
}

</style>