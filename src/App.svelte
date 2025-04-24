<script>

	import character from "./models/character.js"
	import { theme } from './lib/styles.js'
	import collectionTypes from "./lib/collectionTypes.js";

	import Bio from "./components/Bio.svelte";
	import Collection from "./components/Collection.svelte";
	import Details from "./components/Details.svelte";
	import Navbar from "./components/Navbar.svelte";
    import Notes from "./components/Notes.svelte";
	import Skills from "./components/Skills.svelte";
    import Weaknesses from "./components/Weaknesses.svelte";

	let model = character();

</script>

<svelte:head>
	{#if theme == 'dark'}
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vinorodrigues/bootstrap-dark@0.6.1/dist/bootstrap-dark.min.css">
	{:else}
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
	{/if}
</svelte:head>

<main id="app">
	<Navbar bind:model={model}></Navbar>
	<div class="row m-2">
		<Details open={true} title="Character" size="col-lg-3 col-12">
			<Bio model={model} />
		</Details>
		<Details title="Attributes" size="col-lg-3 col-12">
			<Collection
				model={model.attributes}
				capacity={3}
				itemType={collectionTypes.simple} />
		</Details>
		<Details title="Drives" size="col-lg-3 col-12">
			<Collection
				model={model.drives}
				capacity={4}
				itemType={collectionTypes.simple} />
		</Details>
		<Details title="Weaknesses" size="col-lg-3 col-12">
			<Weaknesses model={model.weaknesses} />
		</Details>
		<Details title="Major Milestones" size="col-lg-3 col-12">
			<Collection model={model.milestones.major} itemType={collectionTypes.simple} afterRemove={item => {
				model.milestones.usedMajor.push(item);
				model.milestones.usedMajor = model.milestones.usedMajor;
			}} />
			<hr />
			<Details title="Used" size="col-12">
				<Collection model={model.milestones.usedMajor} itemType={collectionTypes.simple} allowAdd={false} />
			</Details>
		</Details>
		<Details title="Minor Milestones" size="col-lg-3 col-12">
			<Collection model={model.milestones.minor} itemType={collectionTypes.simple} afterRemove={item => {
				model.milestones.usedMinor.push(item);
				model.milestones.usedMinor = model.milestones.usedMinor;
			}} />
			<hr />
			<Details title="Used" size="col-12">
				<Collection model={model.milestones.usedMinor} itemType={collectionTypes.simple} allowAdd={false} />
			</Details>
		</Details>
		<Details title="Skills" size="col-lg-3 col-12">
			<Skills model={model.skills} />
		</Details>
		<Details title="Quips" size="col-lg-3 col-12">
			<Collection model={model.resources.quips} itemType={collectionTypes.simple} />
		</Details>
		<Details title="Aspects">
			<Collection 
				model={model.aspects} 
				capacity={7} 
				itemType={collectionTypes.track}/>
		</Details>
		<Details title="Temporary Tracks">
			<Collection 
				model={model.tracks} 
				itemType={collectionTypes.track}/>
		</Details>
		<Details title="Notes"><Notes notes={model.notes} /></Details>
	</div>
</main>
