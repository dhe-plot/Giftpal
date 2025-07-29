import React from 'react';
import SectionWithMockup from "@/components/ui/section-with-mockup";
import { Gift, Heart, Sparkles } from "lucide-react";

// Data for GIFTPAL sections with Unsplash images
const giftpalData1 = {
    title: (
        <>
            AI-Powered Gift
            <br />
            Discovery Made Simple
        </>
    ),
    description: (
        <>
            Let our intelligent gift recommendation engine find the perfect
            <br />
            presents for your loved ones. Simply tell us about the recipient
            <br />
            and occasion, and we'll curate personalized gift suggestions
            <br />
            that create lasting memories.
        </>
    ),
    primaryImageSrc: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1200&fit=crop&crop=center',
    secondaryImageSrc: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=1200&fit=crop&crop=center',
};

const giftpalData2 = {
    title: (
        <>
            Smart Reminders
            <br />
            Never Miss a Moment
        </>
    ),
    description: (
        <>
            Stay ahead of every special occasion with our intelligent
            <br />
            reminder system. From birthdays to anniversaries,
            <br />
            we'll notify you in advance so you can find the perfect
            <br />
            gift and make every celebration memorable.
        </>
    ),
    primaryImageSrc: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=1200&fit=crop&crop=center',
    secondaryImageSrc: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=1200&fit=crop&crop=center',
};

const giftpalData3 = {
    title: (
        <>
            Curated Marketplace
            <br />
            Quality Guaranteed
        </>
    ),
    description: (
        <>
            Browse through our carefully curated selection of gifts
            <br />
            from trusted sellers and premium brands. Every item
            <br />
            is handpicked to ensure quality and uniqueness,
            <br />
            making your gift-giving experience exceptional.
        </>
    ),
    primaryImageSrc: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=1200&fit=crop&crop=center',
    secondaryImageSrc: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop&crop=center',
};

// Demo component showcasing different layouts
export function SectionMockupDemoPage() {
    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-black py-16 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Gift className="text-purple-400" size={32} />
                    <h1 className="text-4xl font-bold text-white">GIFTPAL</h1>
                    <Sparkles className="text-yellow-400" size={32} />
                </div>
                <p className="text-gray-400 text-lg">
                    Experience the future of gift-giving with our AI-powered platform
                </p>
            </div>

            {/* Section 1: Default Layout */}
            <SectionWithMockup
                title={giftpalData1.title}
                description={giftpalData1.description}
                primaryImageSrc={giftpalData1.primaryImageSrc}
                secondaryImageSrc={giftpalData1.secondaryImageSrc}
            />

            {/* Section 2: Reverse Layout */}
            <SectionWithMockup
                title={giftpalData2.title}
                description={giftpalData2.description}
                primaryImageSrc={giftpalData2.primaryImageSrc}
                secondaryImageSrc={giftpalData2.secondaryImageSrc}
                reverseLayout={true}
            />

            {/* Section 3: Default Layout */}
            <SectionWithMockup
                title={giftpalData3.title}
                description={giftpalData3.description}
                primaryImageSrc={giftpalData3.primaryImageSrc}
                secondaryImageSrc={giftpalData3.secondaryImageSrc}
            />

            {/* Footer */}
            <div className="bg-black py-16 text-center border-t border-gray-800">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Heart className="text-red-400" size={24} />
                    <p className="text-gray-400">
                        Making every gift special with AI-powered recommendations
                    </p>
                </div>
                <p className="text-gray-600 text-sm">
                    GIFTPAL - Your intelligent gift-giving companion
                </p>
            </div>
        </div>
    );
}

// Individual section examples for testing
export function GiftDiscoverySection() {
    return (
        <SectionWithMockup
            title={giftpalData1.title}
            description={giftpalData1.description}
            primaryImageSrc={giftpalData1.primaryImageSrc}
            secondaryImageSrc={giftpalData1.secondaryImageSrc}
        />
    );
}

export function SmartRemindersSection() {
    return (
        <SectionWithMockup
            title={giftpalData2.title}
            description={giftpalData2.description}
            primaryImageSrc={giftpalData2.primaryImageSrc}
            secondaryImageSrc={giftpalData2.secondaryImageSrc}
            reverseLayout={true}
        />
    );
}

export function CuratedMarketplaceSection() {
    return (
        <SectionWithMockup
            title={giftpalData3.title}
            description={giftpalData3.description}
            primaryImageSrc={giftpalData3.primaryImageSrc}
            secondaryImageSrc={giftpalData3.secondaryImageSrc}
        />
    );
}

export default SectionMockupDemoPage;
