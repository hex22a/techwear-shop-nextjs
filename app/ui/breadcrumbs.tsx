import SlimArrow from "@/app/ui/vector/slim-arrow.svg";

export type BreadcrumbsProps = {
    sitePath: { name: string, url: string}[]
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
    const { sitePath } = props;
    return (
        <>
            {sitePath.map((item, index) => (
                <span key={`${item.name}${index}`} className={index < sitePath.length - 1 ? `mr-3 opacity-60` : 'opacity-100'}>
                    <a href={item.url} className="mr-1">{item.name}</a>
                    {index < sitePath.length - 1 &&
                        <SlimArrow className="inline-block fill-black mb-1 -rotate-90" width={16} height={16}/>
                    }
                </span>
            ))}
        </>
    );
}
