export const dynamic = "force-dynamic"

import React from 'react'
import RegisContainer from '@/containers/public/regis'
import { getTemplate } from '@/services/assets'
import { getMember } from '@/services/listMember/getMember';

async function Page() {
    const data = await getTemplate();
    const memberData = await getMember();
    return (
        <RegisContainer member={memberData} template={data} />
    )
}

export default Page
