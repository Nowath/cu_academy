import React from 'react'
import ListMemberContainer from '@/containers/public/listMember'
import { getTemplate } from '@/services/assets'
import { getMember } from '@/services/listMember/getMember';

async function Page() {
    const data = await getTemplate();
    const memberData = await getMember();
    return (
        <ListMemberContainer memberData={memberData} data={data}/>
    )
}

export default Page
