<script>
    import TextArea from './TextArea.svelte';
    import TextInput from './TextInput.svelte';

    export let model;

</script>

<TextInput bind:content={model.heroName} label='Name' />
<TextInput bind:content={model.name} label='Real Name' />
<TextInput bind:content={model.powerLevel} label='Power Level' />
<TextInput bind:content={model.origin} label='Origin' />
<hr />
<TextArea bind:content={model.info} label='Info' />
