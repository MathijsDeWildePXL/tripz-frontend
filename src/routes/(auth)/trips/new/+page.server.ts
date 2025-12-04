import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { CreateTripRequest } from '$lib/types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	return { user };
};

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		const formData = await request.formData();
		
		const transportType = formData.get('transportType');
		const departureDate = formData.get('departureDate');
		const returnDate = formData.get('returnDate');
		const destination = formData.get('destination');
		const distance = formData.get('distance');
		const purpose = formData.get('purpose');
		const estimatedCost = formData.get('estimatedCost');

		// Validation
		if (!transportType || !departureDate || !returnDate || !destination || !distance || !purpose || !estimatedCost) {
			return fail(400, { error: 'All fields are required' });
		}

		// Validate dates
		const departure = new Date(departureDate as string);
		const returnD = new Date(returnDate as string);
		if (returnD < departure) {
			return fail(400, { error: 'Return date must be after departure date' });
		}

		try {
			const user = locals.user;
			if (!user) {
				return fail(401, { error: 'You must be logged in to create a trip' });
			}

			const tripData: CreateTripRequest = {
				userId: user.id,
				transportType: parseInt(transportType as string),
				departureDate: departureDate as string,
				returnDate: returnDate as string,
				destination: destination as string,
				distance: parseFloat(distance as string),
				purpose: purpose as string,
				estimatedCost: parseFloat(estimatedCost as string)
			};

			const response = await fetch('http://localhost:8080/trips', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(tripData)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ message: 'Failed to create trip' }));
				return fail(response.status, { error: errorData.message || 'Failed to create trip' });
			}

		} catch (error) {
			console.error('Error creating trip:', error);
			return fail(500, { error: 'An unexpected error occurred while creating the trip' });
		}

		throw redirect(303, '/trips');
	}
};
