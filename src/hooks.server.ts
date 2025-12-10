import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
	const userCookie = event.cookies.get('user');

	if (userCookie) {
		try {
			event.locals.user = JSON.parse(userCookie) as User;
		} catch {
			event.cookies.delete('user', { path: '/' });
		}
	}

	return resolve(event);
};
