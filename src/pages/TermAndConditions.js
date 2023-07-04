import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import HelmetMeta from '../components/Helmet';

const TermsAndConditions = () => {
  return ( 
    <div>
      <Breadcrumb title={"Terms & Conditions"}/>
      <HelmetMeta title={"Terms & Conditions"}/>
      <div className="policy-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy font">
              <p className='text-center policy-main'><strong>Terms and Conditions</strong></p>

              <p>These Terms and Conditions govern your use of our website and the services provided. By accessing or using our website, you agree to comply with these Terms and Conditions. Please read them carefully.</p>

              <p className='policy-strong'><strong>1. Intellectual Property</strong></p>

              <p>All content on our website, including text, graphics, logos, images, videos, and software, is the property of <b>Shopify</b> and is protected by intellectual property laws. You may not use, reproduce, distribute, or modify any content without our prior written consent.</p>

              <p className='policy-strong'><strong>2. User Responsibilities</strong></p>
              <ul>
                <li>You agree to use our website and services for lawful purposes only and not to engage in any activity that may disrupt, damage, or impair our website or infringe upon the rights of others.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
                <li>You must not share your account credentials or allow others to access your account without our permission.</li>
              </ul>
              
              <p className='policy-strong'><strong>3. Disclaimer of Liability</strong></p>
              <ul>
                <li>Our website and services are provided on an "as-is" basis without warranties of any kind, whether express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or information on our website.</li>
                <li>We are not liable for any damages, losses, or expenses arising from your use of our website or services, including but not limited to direct, indirect, incidental, consequential, or punitive damages.</li>
              </ul>
              
              <p className='policy-strong'><strong>4. Links to Third-Party Websites</strong></p>

              <p>Our website may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content, privacy practices, or terms and conditions of these third-party websites. You access them at your own risk.</p>

              <p className='policy-strong'><strong>5. Limitation of Liability</strong></p>

              <p>In no event shall [Your Company] or its directors, officers, employees, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our website or services, even if we have been advised of the possibility of such damages.</p>

              <p className='policy-strong'><strong>6. Indemnification</strong></p>

              <p>You agree to indemnify and hold [Your Company] and its directors, officers, employees, and affiliates harmless from any claims, damages, losses, liabilities, costs, or expenses arising out of your use of our website or services or your violation of these Terms and Conditions.</p>

              <p className='policy-strong'><strong>7. Governing Law and Jurisdiction</strong></p>

              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of [Your Country/State].</p>

              <p className='policy-strong'><strong>8. Modifications to Terms and Conditions</strong></p>

              <p>We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon posting on our website. Your continued use of our website after any modifications constitutes your acceptance of the revised Terms and Conditions.</p>

              <p className='policy-strong'><strong>9. Severability</strong></p>

              <p>If any provision of these Terms and Conditions is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</p>

              <p className='policy-strong'><strong>10. Contact Information</strong></p>

              <p>If you have any questions, concerns, or inquiries regarding these Terms and Conditions, please contact us using the information provided below:</p>

              <p>Shopify</p>
              <p>MGF 3003 Street, ARG, 2000.</p>
              <p>shopify@gmail.com</p>
              <p>+1 (786) 30032000</p>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default TermsAndConditions;