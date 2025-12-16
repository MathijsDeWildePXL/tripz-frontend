<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: summary = data.summary;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-7xl">
		<h1 class="mb-6 text-3xl font-bold text-gray-800">Reports</h1>

		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="space-y-8">
				<!-- Total Reimbursement -->
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-gray-700">Total Reimbursement</h2>
					<p class="text-3xl font-bold text-blue-600">
						${summary.totalReimbursement.toFixed(2)}
					</p>
				</div>

				<div class="grid gap-8 md:grid-cols-2">
					<!-- By Month -->
					<div>
						<h2 class="mb-4 text-xl font-semibold text-gray-700">By Month</h2>
						{#if Object.keys(summary.byMonth).length > 0}
							<ul class="space-y-2">
								{#each Object.entries(summary.byMonth) as [month, amount]}
									<li class="flex justify-between border-b pb-1 last:border-0">
										<span class="text-gray-600">{month}</span>
										<span class="font-medium text-gray-900">${amount.toFixed(2)}</span>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-gray-500">No data available</p>
						{/if}
					</div>

					<!-- By Transport Type -->
					<div>
						<h2 class="mb-4 text-xl font-semibold text-gray-700">By Transport Type</h2>
						{#if Object.keys(summary.byTransportType).length > 0}
							<ul class="space-y-2">
								{#each Object.entries(summary.byTransportType) as [type, amount]}
									<li class="flex justify-between border-b pb-1 last:border-0">
										<span class="text-gray-600">{type}</span>
										<span class="font-medium text-gray-900">${amount.toFixed(2)}</span>
									</li>
								{/each}
							</ul>
						{:else}
							<p class="text-gray-500">No data available</p>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
