import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { ScrollToTop } from '../components/ScrollTop';

const ShippingPolicy = () => {
  ScrollToTop()
  return ( 
    <div>
      <Breadcrumb title={"Shipping Policy"}/>
      <HelmetMeta title={"Shipping Policy"}/>
      <div className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy font">
                <p className='d-flex justify-content-center policy-main'><strong>Shipping Policy</strong></p>

                <p className='policy-strong'><strong>1. Order Processing:</strong></p>

                <p>All orders are processed within 1-2 business days upon receipt of payment. Orders placed on weekends or holidays will be processed on the following business day. We strive to ship orders as quickly as possible, and any delays or exceptions will be communicated to you via email or phone.</p>

                <p className='policy-strong'><strong>2. Shipping Methods and Carriers:</strong></p>

                <p>We offer several shipping options to accommodate various delivery needs. During the checkout process, you can select your preferred shipping method from the available options. The shipping carriers we commonly use include but are not limited to:</p>

                <ul>
                  <li>FedEx</li>
                  <li>UPS</li>
                  <li>USPS</li>
                </ul>

                <p>Please note that the availability of specific carriers may vary depending on your location and the items in your order. The estimated delivery time and cost will be provided to you during the checkout process.</p>
                
                

                <p className='policy-strong'><strong>3. Shipping Destinations:</strong></p>

                <p>We currently ship to addresses within the United States and select international destinations. Please ensure that the shipping address provided is accurate and complete to avoid any delivery issues. For international shipments, please be aware that additional customs duties, taxes, or fees may apply, and it is the responsibility of the recipient to cover these charges.</p>

                <p className='policy-strong'><strong>4. Shipment Tracking:</strong></p>

                <p>Once your order has been shipped, we will provide you with a tracking number and a link to track the progress of your shipment. You can use this information to monitor the status and estimated delivery date of your package. Please allow some time for the tracking information to be updated by the shipping carrier.</p>

                <p className='policy-strong'><strong>5. Delivery Timeframes:</strong></p>

                <p>The delivery timeframes may vary depending on the shipping method selected and the destination of the package. Estimated delivery times are provided by the shipping carriers and are not guaranteed. While we make every effort to ensure timely delivery, we cannot be held responsible for any delays caused by the shipping carrier, customs processes, or unforeseen circumstances.</p>

                <p className='policy-strong'><strong>6. Shipping Fees:</strong></p>

                <p>Shipping fees are calculated based on the weight, dimensions, and destination of the package. The shipping cost will be displayed during the checkout process before you complete your order. Any applicable taxes or duties are not included in the shipping fees and will be the responsibility of the recipient.</p>

                <p className='policy-strong'><strong>7. Order Confirmation and Shipping Notifications:</strong></p>

                <p>You will receive an order confirmation email once your order has been successfully placed. Additionally, we will send you a shipping notification email with the tracking information once your order has been shipped. Please ensure that your email address is entered correctly and check your spam/junk folder if you do not receive these notifications.</p>

                <p className='policy-strong'><strong>8. Shipping Damage or Loss:</strong></p>

                <p>We take great care in packaging and securing your order to minimize the risk of damage during transit. However, if your package arrives damaged or is lost in transit, please contact our customer support team immediately. We will work with the shipping carrier to resolve the issue and assist you in any way we can.</p>

                <p className='policy-strong'><strong>9. Returns and Exchanges:</strong></p>

                <p>For information on our returns and exchanges policy, please refer to our dedicated Returns Policy page on our website.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ShippingPolicy;