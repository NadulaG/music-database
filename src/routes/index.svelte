<script>
	import SongCard from '../components/songCard.svelte';

	let searchTerm = '';
	let results;

	const handleSearch = async () => {
		const response = await fetch(`/api/${searchTerm}`);
		const data = await response.json();
		results = data.data.tracks.items;
	};
</script>

<svelte:head>
	<title>Home | Music Database</title>
</svelte:head>

<input
	class="w-full rounded-md text-lg p-4 border-2 border-gray-200 mb-5 text-base-200"
	bind:value={searchTerm}
	on:change={handleSearch}
	type="text"
	placeholder="Search"
/>

{#if results}
	<div class="flex flex-wrap justify-center gap-5">
		{#each results as song}
			<SongCard {song} />
		{/each}
	</div>
{/if}
