import CheckMemberContainer from "@/containers/admin/checkMember"
import { getTemplate } from "@/services/assets";
import { getAllMember } from "@/services/listMember/getMember";

export default async function Page() {
    const data = await getTemplate();
    const memberData = await getAllMember();
    return (
        <CheckMemberContainer data={data} memberData={memberData} />
    )
}
