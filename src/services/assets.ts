import { createClient } from "@/utils/supabase/client";

export interface Template {
    id: number;
    created_at: string;
    title: string;
    desc: string;
    shortDesc: string;
    maxRegis: number;
    banner: string;
    logo: string | null;
    poster: string | null;
    pr: string | null;
    startDate: string;
    endDate: string;
}

const supabase = createClient();
const bucketName = 'assets';

export async function getTemplate(): Promise<Template> {
    const { data: template, error } = await supabase
        .from('templete')
        .select('*')
        .limit(1)
        .single();

    if (error) throw error;
    return template;
}
