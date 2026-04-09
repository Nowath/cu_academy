import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function updateMember({ value, memberID }: {value:boolean, memberID:number}) {
    const { data, error } = await supabase
        .from('member_test')
        .update({ pass: value })
        .eq('id', memberID)
        .select()
    if (error) {
        console.error(error)
        throw new Error("อัพเดตข้อมูลไม่สำเร็จ")
    }
}
