<script lang="ts">
    import { user } from "$lib/stores/auth";
</script>

{#if $user}
    <h1>Welcome, {$user.nickname || $user.companyEmail}!</h1>
    <p>You are now logged in and can add expenses.</p>
{:else}
    <p>Not logged in.</p>
{/if}
