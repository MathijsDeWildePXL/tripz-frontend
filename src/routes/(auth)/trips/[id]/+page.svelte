<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	let showApproveModal = false;
	let showRejectModal = false;
	let approveReason = '';
	let rejectReason = '';

	$: trip = form?.trip || data.trip;

	function formatDate(dateString: string | null | undefined): string {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatDateTime(dateString: string | null | undefined): string {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
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

	function canApproveOrReject(): boolean {
		return trip.status === 'Submitted' || trip.status === 'Pending';
	}

	function closeApproveModal() {
		showApproveModal = false;
		approveReason = '';
	}

	function closeRejectModal() {
		showRejectModal = false;
		rejectReason = '';
	}
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<button
				on:click={() => goto('/trips')}
				class="text-sm text-blue-600 hover:text-blue-700 hover:underline"
			>
				← Back to Trips
			</button>
		</div>

		<!-- Success Message -->
		{#if form?.success}
			<div class="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
				<p class="font-medium">Success</p>
				<p class="text-sm">Trip has been {trip.status.toLowerCase()} successfully.</p>
			</div>
		{/if}

		<!-- Error Message -->
		{#if form?.error}
			<div class="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
				<p class="font-medium">Error</p>
				<p class="text-sm">{form.error}</p>
			</div>
		{/if}

		<!-- Trip Details Card -->
		<div class="rounded-lg bg-white p-6 shadow">
			<div class="mb-6 flex items-start justify-between">
				<div>
					<h1 class="mb-2 text-3xl font-bold text-gray-800">{trip.destination}</h1>
					<span class="rounded-full px-3 py-1 text-sm font-medium {getStatusColor(trip.status)}">
						{trip.status}
					</span>
				</div>
				<div class="text-right">
					<p class="text-3xl font-bold text-gray-800">€{trip.estimatedCost.toFixed(2)}</p>
					<p class="text-sm text-gray-500">Estimated Cost</p>
				</div>
			</div>

			<!-- Trip Information Grid -->
			<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="rounded-lg bg-gray-50 p-4">
					<h3 class="mb-3 text-sm font-semibold text-gray-600 uppercase">Trip Details</h3>
					<dl class="space-y-2">
						<div>
							<dt class="text-sm font-medium text-gray-700">Employee</dt>
							<dd class="text-sm text-gray-900">{trip.employeeName || 'N/A'}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-gray-700">Transport Type</dt>
							<dd class="text-sm text-gray-900">{trip.transportType || 'N/A'}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-gray-700">Departure Date</dt>
							<dd class="text-sm text-gray-900">{formatDate(trip.departureDate)}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-gray-700">Return Date</dt>
							<dd class="text-sm text-gray-900">{formatDate(trip.returnDate)}</dd>
						</div>
					</dl>
				</div>

				<div class="rounded-lg bg-gray-50 p-4">
					<h3 class="mb-3 text-sm font-semibold text-gray-600 uppercase">Additional Information</h3>
					<dl class="space-y-2">
						<div>
							<dt class="text-sm font-medium text-gray-700">Submitted At</dt>
							<dd class="text-sm text-gray-900">{formatDateTime(trip.submittedAt)}</dd>
						</div>
						{#if trip.approvedAt}
							<div>
								<dt class="text-sm font-medium text-gray-700">
									{trip.status === 'Approved' ? 'Approved At' : 'Rejected At'}
								</dt>
								<dd class="text-sm text-gray-900">{formatDateTime(trip.approvedAt)}</dd>
							</div>
						{/if}
						{#if trip.reason}
							<div>
								<dt class="text-sm font-medium text-gray-700">Reason</dt>
								<dd class="text-sm text-gray-900">{trip.reason}</dd>
							</div>
						{/if}
					</dl>
				</div>
			</div>

			<!-- Action Buttons -->
			{#if canApproveOrReject()}
				<div class="flex gap-3 border-t pt-6">
					<button
						on:click={() => (showApproveModal = true)}
						class="flex-1 rounded-md bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
					>
						Approve Trip
					</button>
					<button
						on:click={() => (showRejectModal = true)}
						class="flex-1 rounded-md bg-red-600 px-4 py-3 font-medium text-white hover:bg-red-700"
					>
						Reject Trip
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Approve Modal -->
{#if showApproveModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		on:click={closeApproveModal}
		on:keydown={(e) => e.key === 'Escape' && closeApproveModal()}
		role="button"
		tabindex="0"
	>
		<div
			class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
			tabindex="-1"
		>
			<h2 class="mb-4 text-xl font-bold text-gray-800">Approve Trip</h2>
			<p class="mb-4 text-sm text-gray-600">
				Are you sure you want to approve this trip to {trip.destination}?
			</p>
			<form
				method="POST"
				action="?/approve"
				use:enhance={() => {
					return async ({ update }) => {
						closeApproveModal();
						await update();
					};
				}}
			>
				<div class="mb-4">
					<label for="approve-reason" class="mb-1 block text-sm font-medium text-gray-700">
						Reason (Optional)
					</label>
					<textarea
						id="approve-reason"
						name="reason"
						bind:value={approveReason}
						rows="3"
						maxlength="500"
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
						placeholder="Add any comments about this approval..."
					></textarea>
					<p class="mt-1 text-xs text-gray-500">{approveReason.length}/500 characters</p>
				</div>
				<div class="flex gap-3">
					<button
						type="button"
						on:click={closeApproveModal}
						class="flex-1 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
					>
						Confirm Approval
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Reject Modal -->
{#if showRejectModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		on:click={closeRejectModal}
		on:keydown={(e) => e.key === 'Escape' && closeRejectModal()}
		role="button"
		tabindex="0"
	>
		<div
			class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
			tabindex="-1"
		>
			<h2 class="mb-4 text-xl font-bold text-gray-800">Reject Trip</h2>
			<p class="mb-4 text-sm text-gray-600">
				Please provide a reason for rejecting this trip to {trip.destination}.
			</p>
			<form
				method="POST"
				action="?/reject"
				use:enhance={() => {
					return async ({ update }) => {
						closeRejectModal();
						await update();
					};
				}}
			>
				<div class="mb-4">
					<label for="reject-reason" class="mb-1 block text-sm font-medium text-gray-700">
						Reason (Required) <span class="text-red-600">*</span>
					</label>
					<textarea
						id="reject-reason"
						name="reason"
						bind:value={rejectReason}
						rows="3"
						maxlength="500"
						required
						class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none"
						placeholder="Explain why this trip is being rejected..."
					></textarea>
					<p class="mt-1 text-xs text-gray-500">{rejectReason.length}/500 characters</p>
				</div>
				<div class="flex gap-3">
					<button
						type="button"
						on:click={closeRejectModal}
						class="flex-1 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
					>
						Confirm Rejection
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
