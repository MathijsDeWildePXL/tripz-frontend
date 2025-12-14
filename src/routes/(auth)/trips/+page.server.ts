import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

// Allow self-signed certificates in development
if (process.env.NODE_ENV !== 'production') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export const load: PageServerLoad = async ({ url, fetch, parent }) => {
	const { user } = await parent();

	const employeeId = url.searchParams.get('employeeId');
	const transportType = url.searchParams.get('transportType');
	const month = url.searchParams.get('month');
	const year = url.searchParams.get('year');
	const page = url.searchParams.get('page') || '1';
	const pageSize = url.searchParams.get('pageSize') || '10';

	const params = new URLSearchParams();
	if (employeeId) params.append('employeeId', employeeId);
	if (transportType) params.append('transportType', transportType);
	if (month) params.append('month', month);
	if (year) params.append('year', year);
	params.append('page', page);
	params.append('pageSize', pageSize);

	const queryString = params.toString();
	const apiUrl = `${env.PUBLIC_API_URL}/trips${queryString ? `?${queryString}` : ''}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch trips');
		}
		const result = await response.json();
		return {
			trips: result.data || [],
			pagination: result.pagination || { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
			user
		};
	} catch (error) {
		console.error('Error fetching trips:', error);
		return {
			trips: [],
			pagination: { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 },
			user
		};
	}
};
