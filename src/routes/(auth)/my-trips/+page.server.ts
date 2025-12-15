import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const load = async (event: RequestEvent) => {
	const { fetch, locals } = event;
	const { user } = locals;

	if (!user) {
		return { trips: [], user: null };
	}

	const apiUrl = `${env.PUBLIC_API_URL}/trips?employeeId=${user.id}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch trips');
		}
		const result = await response.json();
		return {
			trips: result.data || [],
			user
		};
	} catch (error) {
		console.error('Error fetching user trips:', error);
		return {
			trips: [],
			user
		};
	}
};
