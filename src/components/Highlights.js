//Highlights.js
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Highlights() {
    const [isSkincareExpanded, setIsSkincareExpanded] = useState(false);
    const [isDealsExpanded, setIsDealsExpanded] = useState(false);
    const [isStoresExpanded, setIsStoresExpanded] = useState(false);
    const toggleExpansion = (highlight) => {
        switch (highlight) {
            case 'skincare':
                setIsSkincareExpanded(!isSkincareExpanded);
                break;
            case 'deals':
                setIsDealsExpanded(!isDealsExpanded);
                break;
            case 'stores':
                setIsStoresExpanded(!isStoresExpanded);
                break;
            default:
                break;
        }
    };

    return (
        <Row className="mt-3 mb-3">
            <Col xs={12} md={4}>
                <div
                    className={`highlight p-3 ${isSkincareExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpansion('skincare')}
                >
                    <h3>Level up your skincare routine</h3>
                    <p>
                        Your gateway to exquisite skincare, unveils the secrets to radiant, nourished skin. Experience the pinnacle of beauty and wellness with our luxurious, transformative products for a timeless glow.
                    </p>
                </div>
            </Col>
            <Col xs={12} md={4}>
                <div
                    className={`highlight p-3 ${isDealsExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpansion('deals')}
                >
                    <h3>Our stores and stockists</h3>
                    <p>
                        We have stores and counters in cities of note across the world, each individually designed to delight all five senses and provide a calm, welcoming haven. In these spaces, we host our customer as a guest. We will be pleased to help you locate your nearest physical LuxeHavin Skin store or stockist.
                    </p>
                </div>
            </Col>
            <Col xs={12} md={4}>
                <div
                    className={`highlight p-3 ${isStoresExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpansion('stores')}
                >
                    <h3>Flash Deals</h3>
                    <p>
                    Members get free shipping with no order minimum, register now! Make sure you follow @LuxeHavinSkin to stay updated.
                        
                    </p>
                </div>
            </Col>
        </Row>
    );
};

