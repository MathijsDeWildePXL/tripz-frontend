<script lang="ts">
	const API_URL = import.meta.env.VITE_API_URL;

	let formData = {
		departureDate: '',
		returnDate: '',
		destination: '',
		distance: '',
		transportType: '',
		purpose: '',
		estimatedCost: ''
	};

	let errors: Record<string, string> = {};
	let submitted = false;
	let isLoading = false;

	const transportTypes = [
		{ value: '1', label: 'Car' },
		{ value: '2', label: 'Train' },
		{ value: '3', label: 'Plane' },
		{ value: '4', label: 'Bus' },
		{ value: '5', label: 'Other' }
	];

	async function submitTrip() {
		isLoading = true;
		try {
			const response = await fetch(`${API_URL}/Trips`, {
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					employeeId: 'EMP006', // TODO: Get from auth context
					employeeName: 'Diana Prince', // TODO: Get from auth context
					transportType: parseInt(formData.transportType),
					departureDate: new Date(formData.departureDate).toISOString(),
					returnDate: new Date(formData.returnDate).toISOString(),
					destination: formData.destination,
					distance: parseInt(formData.distance),
					purpose: formData.purpose,
					estimatedCost: parseFloat(formData.estimatedCost)
				})
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log('Trip created:', data);
			submitted = true;

			setTimeout(() => {
				submitted = false;
				formData = {
					departureDate: '',
					returnDate: '',
					destination: '',
					distance: '',
					transportType: '',
					purpose: '',
					estimatedCost: ''
				};
				isLoading = false;
			}, 2000);
		} catch (error) {
			console.error('Error submitting trip:', error);
			errors.submit =
				error instanceof Error ? error.message : 'An error occurred while submitting the trip';
			isLoading = false;
		}
	}

	function handleSubmit() {
		errors = {};
		if (!formData.departureDate) errors.departureDate = 'Departure date is required';
		if (!formData.returnDate) errors.returnDate = 'Return date is required';
		if (formData.departureDate && formData.returnDate) {
			const departure = new Date(formData.departureDate);
			const returnDate = new Date(formData.returnDate);
			if (returnDate <= departure) {
				errors.returnDate = 'Return date must be after departure date';
			}
		}
		if (!formData.destination) errors.destination = 'Destination is required';
		if (!formData.distance) {
			errors.distance = 'Distance is required';
		} else if (isNaN(parseFloat(formData.distance)) || parseFloat(formData.distance) <= 0) {
			errors.distance = 'Distance must be a positive number';
		}
		if (!formData.transportType) errors.transportType = 'Transport type is required';
		if (!formData.purpose) errors.purpose = 'Purpose is required';
		if (!formData.estimatedCost) {
			errors.estimatedCost = 'Cost is required';
		} else if (
			isNaN(parseFloat(formData.estimatedCost)) ||
			parseFloat(formData.estimatedCost) < 0
		) {
			errors.estimatedCost = 'Cost must be a positive number';
		}

		if (Object.keys(errors).length === 0) {
			submitTrip();
		}
	}

	function handleCancel() {
		formData = {
			departureDate: '',
			returnDate: '',
			destination: '',
			distance: '',
			transportType: '',
			purpose: '',
			estimatedCost: ''
		};
		errors = {};
		submitted = false;
	}
</script>

<div class="min-h-screen bg-gray-100 py-8">
	<div class="mx-auto max-w-md">
		<div class="mb-6 flex items-center gap-4 bg-white px-4 py-4">
			<h1 class="text-xl font-bold text-gray-800">New Trip Registration</h1>
		</div>

		<div class="bg-white p-6 shadow-sm">
			{#if submitted}
				<div class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
					<p class="font-semibold">✓ Trip registered successfully!</p>
					<p class="mt-1 text-sm">Your trip has been added to the system.</p>
				</div>
			{/if}

			{#if errors.submit}
				<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
					<p class="font-semibold">✗ Error</p>
					<p class="mt-1 text-sm">{errors.submit}</p>
				</div>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="space-y-5">
				<div>
					<label for="departureDate" class="mb-2 block text-xs font-semibold text-gray-700">
						Departure Date
					</label>
					<input
						type="datetime-local"
						id="departureDate"
						bind:value={formData.departureDate}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.departureDate
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.departureDate}
						<p class="mt-1 text-xs text-red-500">{errors.departureDate}</p>
					{/if}
				</div>

				<div>
					<label for="returnDate" class="mb-2 block text-xs font-semibold text-gray-700">
						Return Date
					</label>
					<input
						type="datetime-local"
						id="returnDate"
						bind:value={formData.returnDate}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.returnDate
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.returnDate}
						<p class="mt-1 text-xs text-red-500">{errors.returnDate}</p>
					{/if}
				</div>

				<div>
					<label for="destination" class="mb-2 block text-xs font-semibold text-gray-700">
						Destination/Route
					</label>
					<input
						type="text"
						id="destination"
						placeholder="Enter destination or route"
						bind:value={formData.destination}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.destination
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.destination}
						<p class="mt-1 text-xs text-red-500">{errors.destination}</p>
					{/if}
				</div>

				<div>
					<label for="distance" class="mb-2 block text-xs font-semibold text-gray-700">
						Distance (km)
					</label>
					<input
						type="number"
						id="distance"
						placeholder="Enter distance"
						step="0.01"
						bind:value={formData.distance}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.distance
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.distance}
						<p class="mt-1 text-xs text-red-500">{errors.distance}</p>
					{/if}
				</div>

				<div>
					<label for="transportType" class="mb-2 block text-xs font-semibold text-gray-700">
						Transport Type
					</label>
					<select
						id="transportType"
						bind:value={formData.transportType}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.transportType
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					>
						<option value="">Select transport type</option>
						{#each transportTypes as type (type.value)}
							<option value={type.value}>{type.label}</option>
						{/each}
					</select>
					{#if errors.transportType}
						<p class="mt-1 text-xs text-red-500">{errors.transportType}</p>
					{/if}
				</div>

				<div>
					<label for="purpose" class="mb-2 block text-xs font-semibold text-gray-700">
						Purpose
					</label>
					<input
						type="text"
						id="purpose"
						placeholder="Enter purpose"
						bind:value={formData.purpose}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.purpose
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.purpose}
						<p class="mt-1 text-xs text-red-500">{errors.purpose}</p>
					{/if}
				</div>

				<div>
					<label for="estimatedCost" class="mb-2 block text-xs font-semibold text-gray-700">
						Estimated Cost
					</label>
					<input
						type="number"
						id="estimatedCost"
						placeholder="Enter cost"
						step="0.01"
						bind:value={formData.estimatedCost}
						class={`w-full rounded border bg-gray-50 px-3 py-2 text-sm transition-colors duration-200 focus:outline-none ${
							errors.estimatedCost
								? 'border-red-500 focus:border-red-600'
								: 'border-gray-300 focus:border-blue-500'
						}`}
					/>
					{#if errors.estimatedCost}
						<p class="mt-1 text-xs text-red-500">{errors.estimatedCost}</p>
					{/if}
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="button"
						on:click={handleCancel}
						disabled={isLoading}
						class="flex-1 rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isLoading}
						class="flex-1 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? 'Submitting...' : 'Submit Trip'}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
