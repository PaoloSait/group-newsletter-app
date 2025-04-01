<!-- @migration-task Error while migrating Svelte code: Event attribute must be a JavaScript expression, not a string
https://svelte.dev/e/attribute_invalid_event_handler -->
<script>
  import { authStore } from '../lib/stores/auth';
  import { goto } from '$app/navigation';
  
  $: if ($authStore.user && !$authStore.loading) {
    goto('/dashboard');
  }
</script>

<svelte:head>
  <title>MonthlyMemos - Share Monthly Updates with Your Group</title>
</svelte:head>

<div class="relative">
  <!-- Hero section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">Stay connected with</span>
          <span class="block text-blue-600">monthly group letters</span>
        </h1>
        <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg">
          Share your thoughts, experiences, and photos with your group every month. 
          MonthlyMemos automatically compiles everyone's responses into a beautiful 
          monthly letter sent to the entire group.
        </p>
        <div class="mt-8 sm:flex">
          <div class="rounded-md shadow">
            <a href="/signup" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
              Get started
            </a>
          </div>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <a href="/signin" class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
              Sign in
            </a>
          </div>
        </div>
      </div>
      <div class="mt-12 lg:mt-0">
        <div class="bg-blue-100 rounded-lg overflow-hidden shadow-xl">
          <!-- <img src="/images/hero-illustration.svg" alt="Monthly letter illustration" class="w-full"> -->
        </div>
      </div>
    </div>
  </div>
  
  <!-- Features section -->
  <div class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          How it works
        </h2>
      </div>
      
      <div class="mt-16 grid gap-8 md:grid-cols-3">
        <!-- Feature 1 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Create or Join a Group</h3>
          <p class="mt-2 text-gray-500">
            Start by creating a group or joining an existing one. Invite friends, family, or colleagues to join your group.
          </p>
        </div>
        
        <!-- Feature 2 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Answer Monthly Questions</h3>
          <p class="mt-2 text-gray-500">
            Each month, respond to a set of questions. Share text, photos, and memories with your group.
          </p>
        </div>
        
        <!-- Feature 3 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Receive Monthly Letters</h3>
          <p class="mt-2 text-gray-500">
            At the end of each month, everyone receives a beautiful email compilation of all responses.
          </p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Testimonials section -->
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">
          What our users say
        </h2>
      </div>
      
      <div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Testimonial 1 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                JS
              </div>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-gray-900">Jane Smith</h3>
              <p class="text-gray-500 text-sm">Family Group</p>
            </div>
          </div>
          <p class="mt-4 text-gray-600">
            "Our family is spread across three continents. MonthlyMemos helps us stay connected in a way social media never could."
          </p>
        </div>
        
        <!-- Testimonial 2 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                TK
              </div>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-gray-900">Tom Kaplan</h3>
              <p class="text-gray-500 text-sm">College Friends</p>
            </div>
          </div>
          <p class="mt-4 text-gray-600">
            "We've been out of college for 5 years now, and these monthly letters have kept our friendships strong despite living in different cities."
          </p>
        </div>
        
        <!-- Testimonial 3 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                ML
              </div>
            </div>
            <div class="ml-3">
              <h3 class="text-lg font-medium text-gray-900">Maria Lopez</h3>
              <p class="text-gray-500 text-sm">Remote Team</p>
            </div>
          </div>
          <p class="mt-4 text-gray-600">
            "As a remote team, we use MonthlyMemos to share personal updates that don't come up in work meetings. It's improved our team culture immensely."
          </p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- CTA section -->
  <div class="bg-blue-600">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
      <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        <span class="block">Ready to get started?</span>
        <span class="block text-blue-200">Sign up today for free.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <a href="/signup" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
            Get started
          </a>
        </div>
      </div>
    </div>
  </div>
</div>