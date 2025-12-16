<script lang="ts">
	import { page } from '$app/stores';
	import type { User } from '$lib/types';

	export let user: User;

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	const navItems = [
		{ href: '/', label: 'Dashboard' },
		{ href: '/trips', label: 'All Trips' },
		{ href: '/my-trips', label: 'My Trips' },
		{ href: '/reports', label: 'Reports' }
	];
</script>

<nav class="bg-white shadow-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<span class="text-2xl font-bold text-blue-600">Tripz</span>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					{#each navItems as item (item.label)}
						<a
							href={item.href}
							class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium {$page.url
								.pathname === item.href
								? 'border-blue-500 text-gray-900'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
						>
							{item.label}
						</a>
					{/each}
				</div>
			</div>

			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<div class="relative ml-3">
					<div>
						<button
							type="button"
							on:click={toggleMenu}
							class="flex items-center gap-3 rounded-full bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							id="user-menu-button"
							aria-expanded={isMenuOpen}
							aria-haspopup="true"
						>
							<span class="sr-only">Open user menu</span>
							<div class="flex items-center gap-2">
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
								>
									{user.nickname.charAt(0).toUpperCase()}
								</div>
								<span class="text-gray-700">{user.nickname}</span>
								<svg
									class="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						</button>
					</div>

					{#if isMenuOpen}
						<div
							class="ring-opacity-5 absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
						>
							<div class="border-b border-gray-200 px-4 py-3">
								<p class="text-sm font-medium text-gray-900">{user.nickname}</p>
								<p class="text-xs text-gray-500">{user.companyEmail}</p>
								<p class="mt-1 text-xs text-gray-500">Role: {user.role}</p>
							</div>
							<form method="POST" action="/logout">
								<button
									type="submit"
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									Sign out
								</button>
							</form>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
