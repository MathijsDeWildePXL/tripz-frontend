<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const stats = [
		{ label: 'Total Trips', value: '12', color: 'bg-blue-500' },
		{ label: 'Pending Approval', value: '3', color: 'bg-yellow-500' },
		{ label: 'Approved', value: '8', color: 'bg-green-500' },
		{ label: 'Total Cost', value: '€2,450', color: 'bg-purple-500' }
	];

	const quickActions = [
		{ label: 'Add New Trip', href: '/trips/new', icon: '✈️' },
		{ label: 'View All Trips', href: '/trips', icon: '📋' },
		{ label: 'Expense Reports', href: '/reports', icon: '📊' }
	];
</script>

<div class="min-h-screen bg-gray-50">
	<div class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold text-gray-900">
				Welcome back, {data.user.nickname}!
			</h1>
			<p class="mt-1 text-sm text-gray-600">Here's what's happening with your trips today.</p>
		</div>
	</div>

	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Stats Grid -->
		<div class="lg:grid-c (stat.label)ols-4 mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each stats as stat (stat.label)}
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="h-12 w-12 rounded-md {stat.color}"></div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500">{stat.label}</dt>
									<dd class="text-3xl font-semibold text-gray-900">{stat.value}</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Quick Actions -->
		<div class="mb-8">
			<h2 class="mb-4 text-xl font-semibold text-gray-900">Quick Actions</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{#each quickActions as action (action.href)}
					<a
						href={action.href}
						class="block rounded-lg bg-white p-6 shadow transition hover:shadow-md"
					>
						<div class="flex items-center">
							<span class="text-4xl">{action.icon}</span>
							<span class="ml-4 text-lg font-medium text-gray-900">{action.label}</span>
						</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- Recent Activity -->
		<div class="rounded-lg bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold text-gray-900">Recent Activity</h2>
			<div class="space-y-4">
				<div class="flex items-center border-l-4 border-green-500 bg-green-50 p-4">
					<div class="flex-1">
						<p class="font-medium text-gray-900">Trip to Paris Approved</p>
						<p class="text-sm text-gray-600">Your business trip was approved by management</p>
					</div>
					<span class="text-sm text-gray-500">2 hours ago</span>
				</div>
				<div class="flex items-center border-l-4 border-blue-500 bg-blue-50 p-4">
					<div class="flex-1">
						<p class="font-medium text-gray-900">New Trip Submitted</p>
						<p class="text-sm text-gray-600">Trip to London submitted for approval</p>
					</div>
					<span class="text-sm text-gray-500">1 day ago</span>
				</div>
				<div class="flex items-center border-l-4 border-yellow-500 bg-yellow-50 p-4">
					<div class="flex-1">
						<p class="font-medium text-gray-900">Expense Report Pending</p>
						<p class="text-sm text-gray-600">Complete your expense report for Berlin trip</p>
					</div>
					<span class="text-sm text-gray-500">3 days ago</span>
				</div>
			</div>
		</div>
	</main>
</div>
