<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase, type Tables } from '$lib/utils/supabase';
  import GroupCard from '$lib/components/GroupCard.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
	import { authStore } from '$lib/stores/auth';

  let user = $authStore.user;
  let loading = true;
  let groups: Tables['groups'][] = [];
  let userGroups: Tables['group_members'][] = [];
  let error: string | null = null;
  let createGroupModalOpen = false;
  let newGroup = { name: '', description: '' };

  onMount(async () => {
    // if (!user) {
    //   goto('/login');
    //   return;
    // }
    
    await loadUserGroups();
  });

  async function loadUserGroups() {
    try {
      loading = true;
      
      // Get groups the user is a member of
      const { data: memberData, error: memberError } = await supabase
        .from('group_members')
        .select('*')
        .eq('user_id', user?.id);
        
      if (memberError) throw memberError;
      userGroups = memberData || [];
      
      if (userGroups.length > 0) {
        // Get detailed information about these groups
        const groupIds = userGroups.map(ug => ug.group_id);
        const { data: groupData, error: groupError } = await supabase
          .from('groups')
          .select('*')
          .in('id', groupIds);
          
        if (groupError) throw groupError;
        groups = groupData || [];
      }
    } catch (err) {
      console.error('Error loading groups:', err);
      error = 'Failed to load your groups. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function createGroup() {
    console.log(user)
    try {
      if (!newGroup.name.trim()) {
        error = 'Group name is required';
        return;
      }
      
      // Create the group
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert([
          { 
            name: newGroup.name.trim(), 
            description: newGroup.description.trim() 
          }
        ])
        .select();
        
      if (groupError) throw groupError;
      
      if (groupData && groupData[0]) {
        // Add the user to the group
        const { error: memberError } = await supabase
          .from('group_members')
          .insert([
            { 
              user_id: user?.id, 
              group_id: groupData[0].id 
            }
          ]);
          
        if (memberError) throw memberError;
        
        // Reset form and close modal
        newGroup = { name: '', description: '' };
        createGroupModalOpen = false;
        
        // Reload groups
        await loadUserGroups();
      }
    } catch (err) {
      console.error('Error creating group:', err);
      error = 'Failed to create group. Please try again.';
    }
  }

  function handleCreateGroupClick() {
    createGroupModalOpen = true;
    error = null;
  }

  function closeModal() {
    createGroupModalOpen = false;
    newGroup = { name: '', description: '' };
    error = null;
  }
</script>

<div class="p-6 max-w-6xl mx-auto">
  <div class="mb-8 flex justify-between items-center">
    <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
    <button 
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      on:click={handleCreateGroupClick}
    >
      Create New Group
    </button>
  </div>

  {#if error}
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
      <p>{error}</p>
    </div>
  {/if}

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  {:else if groups.length === 0}
    <div class="bg-white rounded-lg shadow p-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Welcome to MonthlyMemos!</h2>
      <p class="text-gray-600 mb-6">You haven't joined any groups yet. Create your first group to get started.</p>
      <button 
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        on:click={handleCreateGroupClick}
      >
        Create Your First Group
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each groups as group (group.id)}
        <GroupCard {group} onView={() => goto(`/groups/${group.id}`)} />
      {/each}
    </div>
  {/if}

  {#if createGroupModalOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Create New Group</h2>
          <button 
            class="text-gray-400 hover:text-gray-600" 
            on:click={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form on:submit|preventDefault={createGroup} class="space-y-4">
          <div>
            <label for="group-name" class="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
            <input
              id="group-name"
              type="text"
              bind:value={newGroup.name}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter group name"
              required
            />
          </div>
          
          <div>
            <label for="group-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="group-description"
              bind:value={newGroup.description}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="What is this group about?"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-2">
            <button 
              type="button"
              on:click={closeModal}
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>