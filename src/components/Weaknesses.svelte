<script>
    const maxMires = 4;

    import Weakness from "./Weakness.svelte";
    import weakness from "../models/weakness.js";

    export let model = [weakness()];

    function add() {
        model.push(weakness(''));
        model = model;
    }

    function remove(item) {
        let i = model.indexOf(item);
        model.splice(i, 1);
        model = model;
    }
</script>

{#if model.length < maxMires}
<button on:click={add} class="btn btn-light badge">Add</button>
{/if}
{#each model as item}
<Weakness model={item} remove={remove} />
{/each}
