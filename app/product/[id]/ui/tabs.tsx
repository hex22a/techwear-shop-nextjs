import TabsHeader, {Tab} from "@/app/product/[id]/ui/tabs_header";
import Reviews from "./reviews";

export default function Tabs() {
    return (
        <>
            <div className="mt-20 mb-6">
                <TabsHeader activeTab={Tab.REVIEWS}/>
            </div>
            <Reviews />
        </>
    )
}
