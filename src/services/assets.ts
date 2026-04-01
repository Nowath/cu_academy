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

    const getPublicUrl = (path: string | null) => {
        if (path != null && path.includes("https")) return path;
        if (!path) return null;

        const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(path.trim().replace(/^\//, ''));

        return data.publicUrl;
    };
    return {
        ...template,
        banner: getPublicUrl(template.banner) as string,
        logo: getPublicUrl(template.logo),
        poster: getPublicUrl(template.poster),
        pr: getPublicUrl(template.pr),
    };
}
