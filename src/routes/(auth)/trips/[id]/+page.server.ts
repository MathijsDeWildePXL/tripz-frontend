import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch, parent }) => {
	const { user } = await parent();

	try {
		const response = await fetch(`http://localhost:8080/trips/${params.id}`);
		if (!response.ok) {
			throw new Error('Failed to fetch trip');
		}
		const trip = await response.json();
		return {
			trip,
			user
		};
	} catch (error) {
		console.error('Error fetching trip:', error);
		throw error;
	}
};

export const actions = {
	approve: async ({ request, params, fetch }) => {
		const formData = await request.formData();
		const reason = formData.get('reason')?.toString();

		try {
			const response = await fetch(`http://localhost:8080/trips/${params.id}/approve`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: 2, // Approved
					reason: reason || null
				})
			});

			if (!response.ok) {
				let errorMessage = 'Failed to approve trip';
				try {
					const error = await response.json();
					errorMessage = error.message || errorMessage;
				} catch {
					// If JSON parsing fails, use default message
				}
				return fail(response.status, { error: errorMessage });
			}

			throw redirect(303, '/trips');
		} catch (error) {
			if (error instanceof Response) throw error;
			console.error('Error approving trip:', error);
			return fail(500, { error: 'An unexpected error occurred while approving the trip' });
		}
	},

	reject: async ({ request, params, fetch }) => {
		const formData = await request.formData();
		const reason = formData.get('reason')?.toString();

		if (!reason || reason.trim().length === 0) {
			return fail(400, { error: 'Reason is required when rejecting a trip', field: 'reason' });
		}

		if (reason.length > 500) {
			return fail(400, {
				error: 'Reason cannot exceed 500 characters',
				field: 'reason'
			});
		}

		try {
			const response = await fetch(`http://localhost:8080/trips/${params.id}/approve`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					status: 3, // Rejected
					reason: reason
				})
			});

			if (!response.ok) {
				let errorMessage = 'Failed to reject trip';
				try {
					const error = await response.json();
					errorMessage = error.message || errorMessage;
				} catch {
					// If JSON parsing fails, use default message
				}
				return fail(response.status, { error: errorMessage });
			}

			throw redirect(303, '/trips');
		} catch (error) {
			if (error instanceof Response) throw error;
			console.error('Error rejecting trip:', error);
			return fail(500, { error: 'An unexpected error occurred while rejecting the trip' });
		}
	}
} satisfies Actions;
