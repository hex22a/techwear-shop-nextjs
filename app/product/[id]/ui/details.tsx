export type DetailsProps = {
    details: string,
}

export default function Details(props: DetailsProps) {
    return (
        <div>{props.details}</div>
    );
}
