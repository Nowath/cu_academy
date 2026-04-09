import { createClient } from "@/utils/supabase/client";
import { IMemberFilter, IMember } from "@/type/member";

const supabase = createClient();

export async function getMember(): Promise<IMemberFilter[]> {
    const { data, error } = await supabase
        .from('member_test')
        .select('id,prefix,name,grade,day1,day2')
        .eq('pass', true)
    if (error) {
        console.error(error)
        throw new Error("ดึงข้อมูลไม่สำเร็จ")
    }
    return data ?? []
}

export async function getAllMember(): Promise<IMember[]> {
    const { data, error } = await supabase
        .from('member_test')
        .select('*')
    if (error) {
        console.error(error)
        throw new Error("ดึงข้อมูลไม่สำเร็จ")
    }
    return data ?? []
}
