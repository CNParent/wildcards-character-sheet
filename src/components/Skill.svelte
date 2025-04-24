<script>
    const maxMark = 3;

    import { afterUpdate } from 'svelte';
    import skill from "../models/skill.js";

    export let model = skill();
    export let remove;

    let editing = false;
    let control;

    $:arr = [...new Array(maxMark)];

    function handleClick(i) {
        model.level = model.level == i + 1 ? i : i + 1;
    }

    afterUpdate(() => {
        if (control) control.focus();
    });
</script>

<div class="d-flex mt-1">
    {#if editing}
    <input bind:this={control} class="form-control" bind:value={model.name} />
    <button on:click={() => editing = false} class="btn btn-light">&check;</button>
    <button on:click={() => remove(model)} class="btn btn-danger">&cross;</button>
    {:else}
    <button on:click={() => editing = true} class="text-left flex-grow-1 btn btn-light" style="min-height: 2.2em">{model.name}</button>
    {/if}
    <div class="align-self-center ml-1 flex-shrink-0">
        {#each arr as x,i}
        <button on:click={() => handleClick(i)} class="bubble btn border border-dark" class:btn-dark={model.level > i} class:btn-light={model.level <= i}>
        </button>
        {/each}
    </div>
</div>
