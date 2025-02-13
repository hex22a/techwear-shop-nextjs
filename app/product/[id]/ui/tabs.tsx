import TabsHeader, {Tab} from "@/app/product/[id]/ui/tabs_header";
import Reviews, {ReviewProps} from "./reviews";

export type TabsProps = ReviewProps & {
}

export default function Tabs(props: TabsProps) {
    return (
        <>
            <div className="mt-20 mb-6">
                <TabsHeader activeTab={Tab.REVIEWS}/>
            </div>
            <Reviews product_id={props.product_id} reviews={props.reviews}/>
        </>
    )
}
