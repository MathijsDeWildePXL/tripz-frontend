import { writable } from 'svelte/store';
import type { User } from '$lib/types';

export const user = writable<User | null>(null);

export function setUser(u: User) {
	user.set(u);
}

export function logout() {
	user.set(null);
}
