import { createClient } from "@/utils/supabase/client";
import { IMember } from "@/type/member";

const supabase = createClient();

export async function insertMember(memberData:IMember) {
    const { data, error } = await supabase
    .from('member_test')
    .insert(
        memberData,
    )
    .select()
    if (error) {
        console.error(error)
        return []
    }
    return data ?? []
}
