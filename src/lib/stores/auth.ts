import { writable } from 'svelte/store';
import { supabase } from '../utils/supabase';
import { browser } from '$app/environment';

// Initialize the auth store
export const authStore = writable<{user: any, loading: boolean, error: any}>({
    user: null,
    loading: true,
    error: null
});

// Initialize the auth state from Supabase session
export async function initializeAuth() {
    if (!browser) return;

    authStore.update(state => ({ ...state, loading: true }));

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        // Get user profile data
        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

        authStore.update(state => ({
            ...state,
            user: { ...session.user, profile },
            loading: false
        }));
    } else {
        authStore.update(state => ({ ...state, user: null, loading: false }));
    }

    // Subscribe to auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            const { data: profile } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

            authStore.update(state => ({
                ...state,
                user: { ...session.user, profile },
                loading: false
            }));
        } else if (event === 'SIGNED_OUT') {
            authStore.update(state => ({ ...state, user: null, loading: false }));
        }
    });
}

// Sign up a new user
export async function signUp(email: string, password: string, username: string) {
    authStore.update(state => ({ ...state, loading: true, error: null }));

    try {
        // Create the auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) throw authError;

        if (authData.user) {
            // Create the user profile
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    username,
                    email,
                    created_at: new Date()
                });

            if (profileError) throw profileError;
        }

        authStore.update(state => ({ ...state, loading: false }));
        return { success: true };
    } catch (error: any) {
        authStore.update(state => ({ ...state, error: error.message, loading: false }));
        return { success: false, error: error.message };
    }
}

// Sign in an existing user
export async function signIn(email: string, password: string) {
    authStore.update(state => ({ ...state, loading: true, error: null }));

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        authStore.update(state => ({ ...state, loading: false }));
        return { success: true };
    } catch (error: any) {
        authStore.update(state => ({ ...state, error: error.message, loading: false }));
        return { success: false, error: error.message };
    }
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        authStore.update(state => ({ ...state, error: error.message }));
        return { success: false, error: error.message };
    }

    return { success: true };
}