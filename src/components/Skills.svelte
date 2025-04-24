<script>
    import Skill from "./Skill.svelte";
    import skill from "../models/skill.js";

    export let model = [skill()];

    function add() {
        model.push(skill(''));
        model = model;
    }

    function remove(item) {
        let i = model.indexOf(item);
        model.splice(i, 1);
        model = model;
    }

    function sort() {
        model.sort((a, b) => a.name.localeCompare(b.name));
        model = model;
    }
</script>

<button on:click={add} class="btn btn-light badge">Add</button>
<button on:click={sort} class="btn btn-light badge">A &rarr; Z</button>
{#each model as item}
<Skill model={item} remove={remove} />
{/each}
