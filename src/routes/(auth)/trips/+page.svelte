<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TripCard from '$lib/components/TripCard.svelte';

	export let data: PageData;

	let filters = {
		employeeId: $page.url.searchParams.get('employeeId') || '',
		transportType: $page.url.searchParams.get('transportType') || '',
		month: $page.url.searchParams.get('month') || '',
		year: $page.url.searchParams.get('year') || ''
	};

	$: currentPage = data.pagination.page;
	$: totalPages = data.pagination.totalPages;

	function applyFilters() {
		const params = new URL($page.url);
		params.searchParams.delete('employeeId');
		params.searchParams.delete('transportType');
		params.searchParams.delete('month');
		params.searchParams.delete('year');

		if (filters.employeeId) params.searchParams.set('employeeId', filters.employeeId);
		if (filters.transportType) params.searchParams.set('transportType', filters.transportType);
		if (filters.month) params.searchParams.set('month', filters.month);
		if (filters.year) params.searchParams.set('year', filters.year);
		params.searchParams.set('page', '1');

		goto(params.pathname + params.search);
	}

	function clearFilters() {
		filters = { employeeId: '', transportType: '', month: '', year: '' };
		goto('/trips');
	}

	function goToPage(pageNum: number) {
		const params = new URL($page.url);
		params.searchParams.set('page', pageNum.toString());
		goto(params.pathname + params.search);
	}
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<h1 class="mb-6 text-3xl font-bold text-gray-800">Trips</h1>

		<div class="mb-6 rounded-lg bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Filters</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div>
					<label for="employeeId" class="mb-1 block text-sm font-medium text-gray-700"
						>Employee ID</label
					>
					<input
						id="employeeId"
						type="text"
						bind:value={filters.employeeId}
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
						placeholder="Enter employee ID"
					/>
				</div>

				<div>
					<label for="transportType" class="mb-1 block text-sm font-medium text-gray-700"
						>Transport Type</label
					>
					<select
						id="transportType"
						bind:value={filters.transportType}
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
					>
						<option value="">All</option>
						<option value="1">Car</option>
						<option value="2">Train</option>
						<option value="3">Plane</option>
						<option value="4">Bus</option>
					</select>
				</div>

				<div>
					<label for="month" class="mb-1 block text-sm font-medium text-gray-700">Month</label>
					<select
						id="month"
						bind:value={filters.month}
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
					>
						<option value="">All</option>
						{#each Array(12) as _, i (i)}
							<option value={i + 1}
								>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option
							>
						{/each}
					</select>
				</div>

				<div>
					<label for="year" class="mb-1 block text-sm font-medium text-gray-700">Year</label>
					<input
						id="year"
						type="number"
						bind:value={filters.year}
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
						placeholder="2024"
					/>
				</div>
			</div>

			<div class="mt-4 flex gap-2">
				<button
					on:click={applyFilters}
					class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Apply Filters
				</button>
				<button
					on:click={clearFilters}
					class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
				>
					Clear Filters
				</button>
			</div>
		</div>

		<!-- Results Summary -->
		{#if data.pagination.totalCount > 0}
			<div class="mb-4 text-sm text-gray-600">
				Showing {(currentPage - 1) * data.pagination.pageSize + 1} - {Math.min(
					currentPage * data.pagination.pageSize,
					data.pagination.totalCount
				)} of {data.pagination.totalCount} trips
			</div>
		{/if}

		<!-- Trips List -->
		<div class="space-y-4">
			{#if data.trips.length === 0}
				<div class="rounded-lg bg-white p-6 text-center shadow">
					<p class="text-gray-600">No trips found.</p>
				</div>
			{:else}
				{#each data.trips as trip (trip.id)}
					<TripCard {trip} />
				{/each}
			{/if}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-6 flex items-center justify-center gap-2">
				<button
					on:click={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
					class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Previous
				</button>

				<div class="flex gap-1">
					{#each Array(totalPages) as _, i (i)}
						{@const pageNum = i + 1}
						{#if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
							<button
								on:click={() => goToPage(pageNum)}
								class="rounded-md px-4 py-2 text-sm font-medium shadow {currentPage === pageNum
									? 'bg-blue-600 text-white'
									: 'bg-white text-gray-700 hover:bg-gray-50'}"
							>
								{pageNum}
							</button>
						{:else if pageNum === currentPage - 2 || pageNum === currentPage + 2}
							<span class="px-2 py-2 text-gray-500">...</span>
						{/if}
					{/each}
				</div>

				<button
					on:click={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
					class="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Next
				</button>
			</div>
		{/if}
	</div>
</div>
