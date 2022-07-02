<script context="module">
	export async function load({ props }) {
		return {
			props: {
				song: props.data
			}
		};
	}
</script>

<script>
	export let song;

	const convertDuration = (t) => {
		const minutes = Math.floor(t / 60000);
		const seconds = ((t % 60000) / 1000).toFixed(0);
		return seconds == 60
			? minutes + 1 + ':00'
			: minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	};
</script>

<svelte:head>
	<title>{song.name} | Music Database</title>
</svelte:head>

<div class="card lg:card-side bg-base-200 shadow-xl">
	<figure><img src={song.album.images[0].url} alt="Album" /></figure>
	<div class="card-body">
		<h2 class="card-title">
			{song.name}
			{#if song.explicit}
				<i class="fas fa-exclamation-triangle text-sm" />
			{/if}
		</h2>
		<div class="flex flex-row gap-2 mb-3">
			{#each song.artists as artist}
				<div class="badge badge-outline"><a href={artist.uri}>{artist.name}</a></div>
			{/each}
		</div>

		<div class="flex flex-row flex-wrap gap-2 mb-3">
			<div class="card w-48 h-fit bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex flex-col text-center justify-center gap-5 mx-auto">
						<h2 class="card-title"><i class="fas fa-fire" /> Popularity</h2>
						<div
							class="radial-progress bg-primary text-primary-content border-4 border-primary mx-auto"
							style="--value:{song.popularity};"
						>
							{song.popularity}%
						</div>
					</div>
				</div>
			</div>

			<div class="card w-48 h-fit bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex flex-col text-center justify-center gap-5 mx-auto">
						<h2 class="card-title"><i class="fas fa-calendar" /> Released</h2>
						<p>{song.album.release_date}</p>
					</div>
				</div>
			</div>

			<div class="card w-48 h-fit bg-base-100 shadow-xl">
				<div class="card-body">
					<div class="flex flex-col text-center justify-center gap-5 mx-auto">
						<h2 class="card-title"><i class="fas fa-clock" /> Duration</h2>
						<p>{convertDuration(song.duration_ms)}</p>
					</div>
				</div>
			</div>
		</div>

		<div class="card-actions justify-end">
			<a class="btn btn-secondary text-lg" target="_blank" href={song.external_urls.spotify}
				><i class="fas fa-globe" /></a
			>
			<a class="btn btn-primary text-lg" href={song.uri}><i class="fas fa-play" /></a>
		</div>
	</div>
</div>
