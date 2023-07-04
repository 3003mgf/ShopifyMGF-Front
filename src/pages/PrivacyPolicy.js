import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';
import { ScrollToTop } from '../components/ScrollTop';


const PrivacyPolicy = () => { 
  ScrollToTop()
  return ( 
    <div>
      <Breadcrumb title={"Privacy Policy"}/>
      <HelmetMeta title={"Privacy Policy"}/>
      <div className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy font">
              <p className='policy-main d-flex justify-content-center'><strong>Privacy Policy</strong></p>

              <p>This Privacy Policy outlines how we collect, use, disclose, and protect the personal information you provide when using our website or engaging with our services. We are committed to protecting your privacy and ensuring the security of your personal information. Please read this policy carefully to understand our practices.</p>

              <p className='policy-strong'><strong>1. Information We Collect</strong></p>

              <p>We may collect the following types of personal information:</p>
              <ul>
                <li>Contact information: Name, email address, phone number, postal address, or other similar contact details.</li>
                <li>Account information: Username, password, and other credentials used to access our services.</li>
                <li>Payment information: Credit card details, billing address, or other payment-related information.</li>
                <li>Usage information: Information about how you use our website, products, and services, including browsing activities, pages visited, and referring website addresses.</li>
                <li>Communication information: Correspondence, feedback, or inquiries you send to us.</li>
              </ul>
    
              <p className='policy-strong'><strong>2. How We Use Your Information</strong></p>

              <p>We use your personal information for the following purposes:</p>
              <ul>
                <li>To provide and improve our products and services.</li>
                <li>To process and fulfill orders, payments, and refunds.</li>
                <li>To communicate with you about your account, inquiries, or customer support needs.</li>
                <li>To personalize and enhance your experience on our website.</li>
                <li>To send you promotional offers, newsletters, or marketing communications (with your consent, where required by law).</li>
                <li>To analyze and track usage data to improve our website, products, and services.</li>
                <li>To protect against fraudulent or unauthorized activity.</li>
              </ul>
              
              <p className='policy-strong'><strong>3. Information Sharing and Disclosure</strong></p>

              <p>We may share your personal information in the following circumstances:</p>
              <ul>
                <li>With trusted third-party service providers who assist us in delivering our products and services (e.g., shipping providers, payment processors, IT service providers).</li>
                <li>With business partners or affiliates for marketing or promotional purposes (with your consent, where required by law).</li>
                <li>When required by law, regulation, or legal process to disclose information.</li>
                <li>In response to a valid request from law enforcement authorities or other government officials.</li>
                <li>In connection with the sale, merger, acquisition, or reorganization of our business, in which case your personal information may be transferred to the acquiring entity.</li>
              </ul>
              
              <p className='policy-strong'><strong>4. Data Security</strong></p>

              <p>We take appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission or storage is completely secure. We cannot guarantee the absolute security of your personal information.</p>

              <p className='policy-strong'><strong>5. Your Rights and Choices</strong></p>

              <p>You have the right to access, correct, update, or delete your personal information. You may also opt-out of receiving marketing communications from us. Please contact us using the information provided below to exercise these rights or make any inquiries about your personal information.</p>

              <p className='policy-strong'><strong>6. Cookies and Tracking Technologies</strong></p>

              <p>We use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website. You can manage your cookie preferences by adjusting your browser settings or using the options provided on our website.</p>

              <p className='policy-strong'><strong>7. Links to Third-Party Websites</strong></p>

              <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of these third parties before providing any personal information to them.</p>

              <p className='policy-strong'><strong>8. Children's Privacy</strong></p>

              <p>Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected personal information from a child, please contact us immediately.</p>

              <p className='policy-strong'><strong>9. Changes to This Privacy Policy</strong></p>

              <p>We reserve the right to update or modify this Privacy Policy at any time. We will notify you of any changes by posting the updated policy on our website with a revised date.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default PrivacyPolicy;