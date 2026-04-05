"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signInWithEmail({ email, pass }: { email: string, pass: string }) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
    })

    if (error) {
        throw new Error("ล็อคอินไม่สำเร็จ");
    }
    return data
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/');
}

export async function checkLogin() {
    const supabase = await createClient(); // ใช้ client ฝั่ง server
    const { data: { user } } = await supabase.auth.getUser()
    return user
}
