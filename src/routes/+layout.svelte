<script lang="ts">
  import '../app.css';
  import Nav from '../lib/components/Nav.svelte';
  import { initializeAuth, authStore } from '../lib/stores/auth';
  import { onMount } from 'svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
  
  onMount(() => {
    initializeAuth();
  });
</script>

<div class="min-h-screen flex flex-col">
  <Nav />
  
  <main class="flex-grow">
    {#if $authStore.loading}
      <div class="flex justify-center items-center h-full mt-16">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else}
      {@render children?.()}
    {/if}
  </main>
  
  <footer class="bg-gray-100 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MonthlyMemos. All rights reserved.
      </p>
    </div>
  </footer>
</div>