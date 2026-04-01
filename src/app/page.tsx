import LandingContainer from "@/containers/public/landing"
import { getTemplate } from '@/services/assets'

export default async function Page() {
    const data = await getTemplate();
    return (
        <LandingContainer data={data}/>
    )
}
