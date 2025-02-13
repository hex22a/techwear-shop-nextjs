import TabsHeader, {Tab} from "@/app/product/[id]/ui/tabs_header";
import Reviews from "./reviews";

export default function Tabs(props: {product_id: number}) {
    return (
        <>
            <div className="mt-20 mb-6">
                <TabsHeader activeTab={Tab.REVIEWS}/>
            </div>
            <Reviews product_id={props.product_id}/>
        </>
    )
}
