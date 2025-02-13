export enum Tab {
    DETAILS = 0,
    REVIEWS = 1,
    FAQS = 2,
}
type TabsProps = {
    activeTab: Tab,
    onTabChange: (tab: Tab) => void,
}

export default function TabsHeader(props: TabsProps) {
    const { activeTab, onTabChange } = props;
    const handleProductDetailsClick = () => onTabChange(Tab.DETAILS);
    const handleReviewsClick = () => onTabChange(Tab.REVIEWS);
    const handleFaqsClick = () => onTabChange(Tab.FAQS);

    return (
        <div className="flex flex-row justify-evenly items-center border-b border-b-gray-200">
            <button onClick={handleProductDetailsClick} className={`${activeTab === Tab.DETAILS && 'border-b-2 border-b-black'} flex-grow text-center`}>Product Details</button>
            <button onClick={handleReviewsClick} className={`${activeTab === Tab.REVIEWS && 'border-b-2 border-b-black'} flex-grow text-center`}>Rating & Reviews</button>
            <button onClick={handleFaqsClick} className={`${activeTab === Tab.FAQS && 'border-b-2 border-b-black'} flex-grow text-center`}>FAQs</button>
        </div>
    )
}
