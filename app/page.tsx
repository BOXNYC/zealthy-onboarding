import { getConfig } from "@/app/actions/api";
import Wizzard from "@/components/onboarding/Wizzard";

export default async function Home() {
    const { input } = await getConfig();
    return (<>
        <Wizzard sections={input.steps} />
    </>);
}
