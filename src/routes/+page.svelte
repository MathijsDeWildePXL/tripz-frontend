<script lang="ts">
	let currentYear = new Date().getFullYear();
	let features = [
		{
			title: 'Fast Development',
			description: 'Built with SvelteKit for lightning-fast development and optimal performance.',
			icon: '⚡'
		},
		{
			title: 'Modern Styling',
			description:
				'Tailwind CSS integration for beautiful, responsive designs with minimal effort.',
			icon: '🎨'
		},
		{
			title: 'CI/CD Ready',
			description: 'GitHub Actions pipeline configured for seamless deployment and testing.',
			icon: '🚀'
		}
	];
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
	<!-- Hero Section -->
	<div class="container mx-auto px-4 py-16">
		<div class="mb-16 text-center">
			<h1 class="mb-6 text-5xl font-bold text-gray-800 md:text-6xl">
				Welcome to <span
					class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
					>Tripz</span
				>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
				A modern web application built with SvelteKit and Tailwind CSS. Ready for deployment with
				GitHub Actions pipeline.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<button
					class="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
				>
					Get Started
				</button>
				<button
					class="rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors duration-300 hover:border-gray-400"
				>
					Learn More
				</button>
			</div>
		</div>

		<!-- Features Section -->
		<div class="mb-16 grid gap-8 md:grid-cols-3">
			{#each features as feature}
				<div
					class="rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
				>
					<div class="mb-4 text-4xl">{feature.icon}</div>
					<h3 class="mb-3 text-xl font-semibold text-gray-800">{feature.title}</h3>
					<p class="text-gray-600">{feature.description}</p>
				</div>
			{/each}
		</div>

		<!-- Stats Section -->
		<div class="mb-16 rounded-2xl bg-white p-8 shadow-lg">
			<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
				<div>
					<div class="mb-2 text-3xl font-bold text-blue-600">100%</div>
					<div class="text-gray-600">TypeScript</div>
				</div>
				<div>
					<div class="mb-2 text-3xl font-bold text-green-600">⚡</div>
					<div class="text-gray-600">Fast Build</div>
				</div>
				<div>
					<div class="mb-2 text-3xl font-bold text-purple-600">🔧</div>
					<div class="text-gray-600">Configurable</div>
				</div>
				<div>
					<div class="mb-2 text-3xl font-bold text-indigo-600">📱</div>
					<div class="text-gray-600">Responsive</div>
				</div>
			</div>
		</div>

		<!-- Tech Stack -->
		<div class="mb-16 text-center">
			<h2 class="mb-8 text-3xl font-bold text-gray-800">Built With</h2>
			<div class="flex flex-wrap justify-center gap-4">
				{#each ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'] as tech}
					<span
						class="rounded-full bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Footer -->
	<footer class="bg-gray-800 py-8 text-white">
		<div class="container mx-auto px-4 text-center">
			<p class="text-gray-400">
				© {currentYear} Tripz. Built with ❤️ using SvelteKit.
			</p>
			<div class="mt-4">
				<a
					href="https://svelte.dev/docs/kit"
					class="text-blue-400 transition-colors duration-200 hover:text-blue-300"
				>
					SvelteKit Documentation
				</a>
			</div>
		</div>
	</footer>
</div>
