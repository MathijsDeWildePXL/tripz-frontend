<script lang="ts">
	import { login } from '$lib/api';
	import { setUser } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let error = '';
	let loading = false;

	async function submit() {
		error = '';
		loading = true;

		try {
			const user = await login(username, password);
			setUser(user);

			goto('/', { replaceState: true });
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Login</h1>

<form on:submit|preventDefault={submit} class="login-form">
	<input type="text" placeholder="Email of Nickname" bind:value={username} required />

	<input type="password" placeholder="Password" bind:value={password} required />

	{#if error}
		<p class="error">{error}</p>
	{/if}

	<button disabled={loading}>
		{loading ? 'Logging in...' : 'Login'}
	</button>
</form>

<style>
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 300px;
	}
	.error {
		color: red;
	}
</style>
