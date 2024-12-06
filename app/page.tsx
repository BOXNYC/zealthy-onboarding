import { getConfig } from "@/app/actions/api";
import Wizzard from "@/components/onboarding/Wizzard";

export const dynamic = 'force-dynamic'

export default async function Home() {
    const { input } = await getConfig();
    return (<>
        <Wizzard sections={input.steps} />
    </>);
}
