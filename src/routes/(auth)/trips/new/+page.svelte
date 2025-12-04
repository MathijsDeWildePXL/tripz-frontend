<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let form;

	let isSubmitting = false;

	const transportTypes = [
		{ value: 1, label: 'Car' },
		{ value: 2, label: 'Train' },
		{ value: 3, label: 'Plane' },
		{ value: 4, label: 'Bus' },
        { value: 6, label: 'Other' }
	];
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-3xl">
		<div class="mb-6">
			<button
				on:click={() => goto('/trips')}
				class="text-blue-600 hover:text-blue-800 flex items-center"
			>
				← Back to Trips
			</button>
		</div>

		<div class="bg-white rounded-lg shadow-md p-8">
			<h1 class="mb-6 text-3xl font-bold text-gray-800">Add New Trip</h1>

			{#if form?.error}
				<div class="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
					{form.error}
				</div>
			{/if}

			<form method="POST" use:enhance={() => {
				isSubmitting = true;
				return async ({ update, result }) => {
					await update();
					isSubmitting = false;
					if (result.type === 'redirect') {
						goto(result.location);
					}
				};
			}}>
				<div class="space-y-6">
					<!-- Transport Type -->
					<div>
						<label for="transportType" class="block text-sm font-medium text-gray-700 mb-2">
							Transport Type *
						</label>
						<select
							id="transportType"
							name="transportType"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						>
							<option value="">Select transport type</option>
							{#each transportTypes as type}
								<option value={type.value}>{type.label}</option>
							{/each}
						</select>
					</div>

					<!-- Departure Date -->
					<div>
						<label for="departureDate" class="block text-sm font-medium text-gray-700 mb-2">
							Departure Date *
						</label>
						<input
							type="date"
							id="departureDate"
							name="departureDate"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<!-- Return Date -->
					<div>
						<label for="returnDate" class="block text-sm font-medium text-gray-700 mb-2">
							Return Date *
						</label>
						<input
							type="date"
							id="returnDate"
							name="returnDate"
							required
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<!-- Destination -->
					<div>
						<label for="destination" class="block text-sm font-medium text-gray-700 mb-2">
							Destination *
						</label>
						<input
							type="text"
							id="destination"
							name="destination"
							required
							placeholder="e.g., Paris, France"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<!-- Distance -->
					<div>
						<label for="distance" class="block text-sm font-medium text-gray-700 mb-2">
							Distance (km) *
						</label>
						<input
							type="number"
							id="distance"
							name="distance"
							required
							min="0"
							step="0.1"
							placeholder="e.g., 500"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<!-- Purpose -->
					<div>
						<label for="purpose" class="block text-sm font-medium text-gray-700 mb-2">
							Purpose *
						</label>
						<textarea
							id="purpose"
							name="purpose"
							required
							rows="3"
							placeholder="Describe the purpose of your trip"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						></textarea>
					</div>

					<!-- Estimated Cost -->
					<div>
						<label for="estimatedCost" class="block text-sm font-medium text-gray-700 mb-2">
							Estimated Cost (€) *
						</label>
						<input
							type="number"
							id="estimatedCost"
							name="estimatedCost"
							required
							min="0"
							step="0.01"
							placeholder="e.g., 250.00"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<!-- Submit Button -->
					<div class="flex gap-4 pt-4">
						<button
							type="submit"
							disabled={isSubmitting}
							class="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
						>
							{isSubmitting ? 'Creating...' : 'Create Trip'}
						</button>
						<button
							type="button"
							on:click={() => goto('/trips')}
							class="flex-1 rounded-lg bg-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-300 transition"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
