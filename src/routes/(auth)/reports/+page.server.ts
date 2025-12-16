import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';
import type { ReimbursementSummary } from '$lib/types';

export const load: PageServerLoad = async ({ fetch, parent }) => {
	const { user } = await parent();
	const apiUrl = `${env.PUBLIC_API_URL}/trips/summary`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Failed to fetch reimbursement summary');
		}
		const summary: ReimbursementSummary = await response.json();
		return {
			summary,
			user
		};
	} catch (error) {
		console.error('Error fetching reimbursement summary:', error);
		return {
			summary: {
				totalReimbursement: 0,
				byMonth: {},
				byTransportType: {}
			},
			user
		};
	}
};
