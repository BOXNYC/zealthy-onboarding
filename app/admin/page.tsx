import SectionsConfig from "@/components/admin/SectionsConfig";
import PageTitle from "@/components/UX/PageTitle";
import { getConfig } from "@/app/actions/api"

export default async function Admin() {
    const config = await getConfig();
    return (<>
        <PageTitle title="Admin" />
        <div className="">
            <h3 className="text-lg font-semibold">Input steps</h3>
            <SectionsConfig configDefault={config} />
        </div>
    </>);
}
