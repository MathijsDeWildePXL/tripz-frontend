<script lang="ts">
	import { user } from '$lib/stores/auth';

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('user');
		if (saved) user.set(JSON.parse(saved));
	}

	$: {
		if ($user) {
			localStorage.setItem('user', JSON.stringify($user));
		}
	}
</script>

<slot />
