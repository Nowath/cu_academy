import { createClient } from "@/utils/supabase/client";
import { IMemberNoAuto } from "@/type/member";

const supabase = createClient();

export async function insertMember(memberData:IMemberNoAuto) {
    const { data, error } = await supabase
    .from('member_test')
    .insert(
        memberData,
    )
    .select()
    if (error) {
        console.error(error.message)
        throw new Error(error.message)
    }
    return data
}

export async function getPublicURL({ file, fileName }: {file:File,fileName:string}) {
    const { error } = await supabase.storage
        .from("slip")
        .upload(fileName, file)
    if (error) {
        console.error(error.message)
        throw new Error("upload รูปไม่สำเร็จ")
    }
    const publicURL = supabase.storage.from("slip").getPublicUrl(fileName);
    return publicURL;
}

export async function removeImage({ fileName }: {fileName:string}) {
    const { data, error } = await supabase.storage
        .from("slip")
        .remove([fileName]);
    if (error) {
        console.error(error.message)
        throw new Error("remove รูปไม่สำเร็จ")
    }
    return data;
}
