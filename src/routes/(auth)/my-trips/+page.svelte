<script lang="ts">
	import TripCard from '$lib/components/TripCard.svelte';

	export let data: any;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<h1 class="mb-2 text-3xl font-bold text-gray-800">My Trips</h1>
		<p class="mb-6 text-gray-600">View all your submitted trips and their reimbursement status</p>

		<!-- Trips List -->
		<div class="space-y-4">
			{#if data.trips.length === 0}
				<div class="rounded-lg bg-white p-6 text-center shadow">
					<p class="text-gray-600">You haven't submitted any trips yet.</p>
					<a
						href="/trips/new"
						class="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Submit a New Trip
					</a>
				</div>
			{:else}
				{#each data.trips as trip (trip.id)}
					<a href="/trips/{trip.id}" class="block">
						<TripCard {trip} />
					</a>
				{/each}
			{/if}
		</div>
	</div>
</div>
