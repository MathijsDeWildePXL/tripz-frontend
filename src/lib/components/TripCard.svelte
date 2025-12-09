<script lang="ts">
	import type { Trip } from '$lib/types';

	export let trip: Trip;

	function formatDate(dateString: string | null | undefined): string {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString();
	}

	function getStatusColor(status: string): string {
		const colors: Record<string, string> = {
			Submitted: 'bg-blue-100 text-blue-800',
			Approved: 'bg-green-100 text-green-800',
			Rejected: 'bg-red-100 text-red-800',
			Pending: 'bg-yellow-100 text-yellow-800',
			Completed: 'bg-purple-100 text-purple-800'
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	}
</script>

<div class="cursor-pointer rounded-lg bg-white p-6 shadow transition hover:shadow-md">
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<div class="mb-2 flex items-center gap-3">
				<h3 class="text-xl font-semibold text-gray-800">{trip.destination}</h3>
				<span class="rounded-full px-3 py-1 text-xs font-medium {getStatusColor(trip.status)}">
					{trip.status}
				</span>
			</div>
			<div class="grid grid-cols-2 gap-4 text-sm text-gray-600 md:grid-cols-4">
				<div>
					<p class="font-medium text-gray-700">Employee</p>
					<p>{trip.employeeName || 'N/A'}</p>
				</div>
				<div>
					<p class="font-medium text-gray-700">Transport</p>
					<p>{trip.transportType || 'N/A'}</p>
				</div>
				<div>
					<p class="font-medium text-gray-700">Departure</p>
					<p>{formatDate(trip.departureDate)}</p>
				</div>
				<div>
					<p class="font-medium text-gray-700">Return</p>
					<p>{formatDate(trip.returnDate)}</p>
				</div>
			</div>
		</div>
		<div class="text-right">
			<p class="text-2xl font-bold text-gray-800">€{trip.estimatedCost.toFixed(2)}</p>
			<p class="text-xs text-gray-500">Estimated Cost</p>
		</div>
	</div>
	<div class="mt-4 text-xs text-gray-500">
		Submitted: {formatDate(trip.submittedAt)}
	</div>
</div>
