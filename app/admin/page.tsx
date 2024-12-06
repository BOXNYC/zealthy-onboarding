import SectionsConfig from "@/components/admin/SectionsConfig";
import PageTitle from "@/components/UX/PageTitle";
import { getConfig } from "@/app/actions/api"

export const dynamic = 'force-dynamic';

export default async function Admin() {
    const config = await getConfig();
    return (<>
        <PageTitle title="Admin" />
        <div>
            <h3 className="text-lg font-semibold">Input steps</h3>
            <SectionsConfig configDefault={config} />
        </div>
    </>);
}
