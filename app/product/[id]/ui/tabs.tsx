export enum Tab {
    DETAILS = 0,
    REVIEWS = 1,
    FAQS = 2,
}
type TabsProps = { activeTab: Tab }

export default function Tabs(props: TabsProps) {
    return (
        <div className="flex flex-row justify-evenly items-center border-b border-b-gray-200">
            <div className={`${props.activeTab === Tab.DETAILS && 'border-b-2 border-b-black'} flex-grow text-center`}>Product Details</div>
            <div className={`${props.activeTab === Tab.REVIEWS && 'border-b-2 border-b-black'} flex-grow text-center`}>Rating & Reviews</div>
            <div className={`${props.activeTab === Tab.FAQS && 'border-b-2 border-b-black'} flex-grow text-center`}>FAQs</div>
        </div>
    )
}
