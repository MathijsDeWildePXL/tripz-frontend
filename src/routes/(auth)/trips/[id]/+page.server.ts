import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ params, fetch, parent }) => {
	const { user } = await parent();

	try {
		const response = await fetch(`${env.PUBLIC_API_URL}/trips/${params.id}`);
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

		const response = await fetch(`${env.PUBLIC_API_URL}/trips/${params.id}/approve`, {
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

		const updatedTrip = await response.json();
		return { success: true, trip: updatedTrip };
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

		const response = await fetch(`${env.PUBLIC_API_URL}/trips/${params.id}/approve`, {
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

		const updatedTrip = await response.json();
		return { success: true, trip: updatedTrip };
	}
} satisfies Actions;
