<script>
	export let song;
</script>

<div class="card w-96 bg-base-200 shadow-xl">
    <figure><img src={song.album.images[0].url} alt={song.name} /></figure>
	<div class="card-body">
		<h2 class="card-title">
			{song.name}
		</h2>
		{#each song.artists as artist}
			<div class="badge badge-outline">{artist.name}</div>
		{/each}
		<div class="card-actions justify-end">
            <a class="btn btn-secondary text-lg" href="/song/{song.id}"><i class="fas fa-info-circle" /></a>
			<a class="btn btn-primary text-lg" href={song.uri}><i class="fas fa-play" /></a>
		</div>
	</div>
</div>
