import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

// Allow self-signed certificates in development
if (process.env.NODE_ENV !== 'production') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

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
