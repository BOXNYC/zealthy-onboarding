import { Text } from "@/types/ui";

type PageTitleProps = {
    title: Text;
    subtitle?: Text;
};
export default function PageTitle({ title, subtitle }: PageTitleProps): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">{title}</h1>
            {subtitle && <h2 className="text-2xl text-center">{subtitle}</h2>}
        </div>
    );
}