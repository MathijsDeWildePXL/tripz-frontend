<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="min-h-screen bg-gray-50 p-8">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-4 text-3xl font-bold text-gray-800">
			Welcome, {data.user.nickname}!
		</h1>
		<p class="text-gray-600">You are now logged in and can add expenses.</p>

		<div class="mt-6 rounded-lg bg-white p-6 shadow">
			<h2 class="mb-2 text-xl font-semibold">User Details</h2>
			<p><strong>Email:</strong> {data.user.companyEmail}</p>
			<p><strong>Role:</strong> {data.user.role}</p>
		</div>
	</div>
</div>
