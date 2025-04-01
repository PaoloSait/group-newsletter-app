import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);


// Define types for your Supabase tables
export type Tables = {
    users: {
        id: string;
        username: string;
        email: string;
        created_at: string;
    },
    groups: {
        id: string;
        name: string;
        description: string;
        created_at: string;
    },
    group_members: {
        id: string;
        user_id: string;
        group_id: string;
        joined_at: string;
    },
    questions: {
        id: string;
        group_id: string;
        question_text: string;
        question_type: string;
        month: number;
        year: number;
        created_at: string;
    },
    responses: {
        id: string;
        user_id: string;
        question_id: string;
        content: string;
        created_at: string;
        updated_at: string;
    },
    media: {
        id: string;
        response_id: string;
        file_path: string;
        media_type: string;
        uploaded_at: string;
    },
    letters: {
        id: string;
        group_id: string;
        month: number;
        year: number;
        generated_at: string;
        sent: boolean;
    }
};