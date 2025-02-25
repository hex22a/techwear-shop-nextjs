'use client';

import TabsHeader, {Tab} from "@/app/product/[id]/ui/tabs_header";
import Reviews, {ReviewProps} from "./reviews";
import Details, {DetailsProps} from "./details";
import FAQs from "./faqs";
import {useState} from "react";

export type TabsProps = ReviewProps & DetailsProps & {
    defaultTab: Tab,
}

export default function Tabs(props: TabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>(props.defaultTab);
    return (
        <>
            <div className="mt-20 mb-6">
                <TabsHeader activeTab={activeTab} onTabChange={setActiveTab}/>
            </div>
            {activeTab === Tab.REVIEWS && <Reviews {...props}/>}
            {activeTab === Tab.DETAILS && <Details {...props}/>}
            {activeTab === Tab.FAQS && <FAQs/>}
        </>
    );
}
