<script lang="ts">
  import { supabase, type Tables } from '$lib/utils/supabase';
  import { onMount } from 'svelte';
  
  export let group: Tables['groups'];
  export let onView: () => void;
  
  let memberCount = 0;
  let currentMonth: string;
  let hasResponded = false;
  
  onMount(async () => {
    // Get the current month and year
    const now = new Date();
    const month = now.getMonth() + 1; // JavaScript months are 0-indexed
    const year = now.getFullYear();
    
    // Format current month for display
    currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
    
    // Get member count
    const { count } = await supabase
      .from('group_members')
      .select('*', { count: 'exact', head: true })
      .eq('group_id', group.id);
      
    memberCount = count || 0;
    
    // Check if user has responded to this month's questions
    const user = (await supabase.auth.getUser()).data.user;
    if (user) {
      const { data: questions } = await supabase
        .from('questions')
        .select('id')
        .eq('group_id', group.id)
        .eq('month', month)
        .eq('year', year);
        
      if (questions && questions.length > 0) {
        const questionIds = questions.map(q => q.id);
        
        const { count: responseCount } = await supabase
          .from('responses')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .in('question_id', questionIds);
          
        hasResponded = responseCount === questions.length;
      }
    }
  });
  
  // Format the created_at date to a readable format
  $: createdDate = new Date(group.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <div class="p-6">
    <h3 class="text-xl font-semibold text-gray-800 mb-2">{group.name}</h3>
    
    {#if group.description}
      <p class="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
    {:else}
      <p class="text-gray-500 italic mb-4">No description provided</p>
    {/if}
    
    <div class="flex items-center text-sm text-gray-500 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <span>{memberCount} {memberCount === 1 ? 'member' : 'members'}</span>
      
      <span class="mx-2">•</span>
      
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>Created {createdDate}</span>
    </div>
    
    <div class="mb-4">
      {#if hasResponded}
        <div class="text-sm bg-green-100 text-green-800 rounded-full px-3 py-1 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {currentMonth} - Completed!
        </div>
      {:else}
        <div class="text-sm bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {currentMonth} - Pending
        </div>
      {/if}
    </div>
    
    <button 
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
      on:click={onView}
    >
      View Group
    </button>
  </div>
</div>