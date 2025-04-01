<script>
  import { page } from '$app/stores';
  import { authStore, signOut } from '../stores/auth'
  import { onMount } from 'svelte';
  
  let isMenuOpen = $state(false);
  let isLoggedIn = $state(false);

//   let isLoggedIn = $derived(!!$authStore.user);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  async function handleSignOut() {
    await signOut();
  }
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-2xl font-bold text-blue-600">MonthlyMemos</a>
        </div>
      </div>
      
      <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
        <a 
          href="/" 
          class="{$page.url.pathname === '/' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800 px-3 py-2 text-sm font-medium"
        >
          Home
        </a>
        
        {#if isLoggedIn}
          <a 
            href="/dashboard" 
            class="{$page.url.pathname.startsWith('/dashboard') ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800 px-3 py-2 text-sm font-medium"
          >
            Dashboard
          </a>
          <a 
            href="/groups" 
            class="{$page.url.pathname.startsWith('/groups') ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800 px-3 py-2 text-sm font-medium"
          >
            Groups
          </a>
          <button 
            onclick={handleSignOut}
            class="text-gray-600 hover:text-blue-800 px-3 py-2 text-sm font-medium"
          >
            Sign Out
          </button>
        {:else}
          <a 
            href="/signin" 
            class="{$page.url.pathname === '/signin' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-800 px-3 py-2 text-sm font-medium"
          >
            Sign In
          </a>
          <a 
            href="/signup" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Sign Up
          </a>
        {/if}
      </div>
      
      <div class="flex items-center sm:hidden">
        <button 
          onclick={toggleMenu}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  {#if isMenuOpen}
    <div class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <a 
          href="/" 
          class="{$page.url.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium"
        >
          Home
        </a>
        
        {#if isLoggedIn}
          <a 
            href="/dashboard" 
            class="{$page.url.pathname.startsWith('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium"
          >
            Dashboard
          </a>
          <a 
            href="/groups" 
            class="{$page.url.pathname.startsWith('/groups') ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium"
          >
            Groups
          </a>
          <button 
            onclick={handleSignOut}
            class="text-gray-600 hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium w-full text-left"
          >
            Sign Out
          </button>
        {:else}
          <a 
            href="/signin" 
            class="{$page.url.pathname === '/signin' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium"
          >
            Sign In
          </a>
          <a 
            href="/signup" 
            class="{$page.url.pathname === '/signup' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'} hover:bg-blue-50 hover:text-blue-800 block px-3 py-2 text-base font-medium"
          >
            Sign Up
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>