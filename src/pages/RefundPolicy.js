import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { ScrollToTop } from '../components/ScrollTop';

const RefundPolicy = () => {
  ScrollToTop()
  return ( 
    <div>
      <Breadcrumb title={"Refund Policy"}/>
      <HelmetMeta title={"Refund Policy"}/>
      <div className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy font">
              <p className='d-flex justify-content-center policy-main'><strong>Refund Policy</strong></p>

              <p className='policy-strong'><strong>1. Returns and Refunds</strong></p>

              <p>We want you to be completely satisfied with your purchase. If for any reason you are not satisfied, we offer a flexible return and refund policy. Please read the following guidelines to understand our process:</p>

              <p className='policy-strong'><strong>2. Eligibility for Refunds</strong></p>

              <p>To be eligible for a refund, the following conditions must be met:</p>

              <ul>
                <li>The item must be in its original condition, unused, and undamaged.</li>
                <li>The item must be returned within [number of days] days from the date of purchase.</li>
                <li>The original receipt or proof of purchase must be provided.</li>
              </ul>

              <p className='policy-strong'><strong>3. Refund Process</strong></p>

              <p>To initiate a refund, please follow these steps:</p>

              <ul>
                <li>Contact our customer support team at [contact information] within the eligible return period and provide your order details.</li>
                <li>Our customer support team will guide you through the return process and provide you with a Return Merchandise Authorization (RMA) number.</li>
                <li>Pack the item securely in its original packaging, including all accessories and documentation that were included with the product.</li>
                <li>Clearly write the RMA number on the package.</li>
                <li>Ship the item back to the address provided by our customer support team. Please note that the return shipping costs are the responsibility of the customer, unless otherwise specified.</li>
              </ul>
              
              
              <p className='policy-strong'><strong>4. Refund Options</strong></p>

              <p>Upon receiving the returned item and verifying its condition, we will process your refund. The refund will be issued using the original payment method used for the purchase. Please note the following:</p>

              <ul>
                <li>If the item was purchased using a credit card, the refund will be credited back to the same credit card within [number of days] days, depending on your bank's processing time.</li>
                <li>If the item was purchased using an online payment service (e.g., PayPal), the refund will be processed to the original account used for the payment.</li>
                <li>Shipping charges and any applicable fees (such as restocking fees) may be deducted from the refund amount, unless the return is due to our error.</li>
              </ul>
              
              
              <p className='policy-strong'><strong>5. Non-Refundable Items</strong></p>

              <p>The following items are generally non-refundable:</p>

              <ul>
                <li>Gift cards or vouchers</li>
                <li>Downloadable software, digital products, or licenses</li>
                <li>Perishable or personalized items</li>
                <li>Items purchased during specific sales or promotional events (unless otherwise specified)</li>
              </ul>
              
              
              <p className='policy-strong'><strong>6. Damaged or Defective Items</strong></p>

              <p>If you receive a damaged or defective item, please contact our customer support team immediately. We will guide you through the necessary steps to resolve the issue, which may include providing a replacement, repair, or refund.</p>

              <p className='policy-strong'><strong>7. Cancellation of Orders</strong></p>

              <p>If you wish to cancel an order before it has been shipped, please contact our customer support team as soon as possible. We will make every effort to accommodate your request. If the order has already been shipped, please refer to our return policy for instructions on how to initiate a return and request a refund.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default RefundPolicy;