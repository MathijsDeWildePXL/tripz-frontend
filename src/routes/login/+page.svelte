<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4"
>
	<div class="w-full max-w-md rounded-xl bg-white p-10 shadow-2xl">
		<h1 class="mb-2 text-center text-3xl font-bold text-gray-800">Welcome Back</h1>
		<p class="mb-8 text-center text-gray-600">Sign in to continue to Tripz</p>

		<form method="POST" action="?/login" use:enhance class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="username" class="text-sm font-medium text-gray-700"> Email or Nickname </label>
				<input
					id="username"
					name="username"
					type="text"
					placeholder="Enter your email or nickname"
					required
					class="rounded-lg border-2 border-gray-200 px-4 py-3 text-base transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100"
				/>
			</div>

			<div class="flex flex-col gap-2">
				<label for="password" class="text-sm font-medium text-gray-700"> Password </label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Enter your password"
					required
					class="rounded-lg border-2 border-gray-200 px-4 py-3 text-base transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-gray-100"
				/>
			</div>

			{#if form?.error}
				<p class="rounded-lg border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-600">
					{form.error}
				</p>
			{/if}

			<button
				type="submit"
				class="mt-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-400/50 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
			>
				Login
			</button>
		</form>
	</div>
</div>
