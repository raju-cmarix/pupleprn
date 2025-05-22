import { STRIPE } from "constants/AppConstants";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./termcondition.scss";

function TermCondition() {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Terms & Conditions</title>
      </Helmet>
      <div className="termcondition-section">
        <div className="custom-container">
          <div className="title">
            <h1>Terms & Conditions</h1>
          </div>
          <div className="termcondition-content">
            <div className="condition-box">
              <div className="condition-subtitle"></div>
              <p>
                These Terms of Service (“Terms”) govern your use of our website{" "}
                <Link to="/">(www.PurplePRN.com)</Link>and related products and
                services, including any content or information provided as part
                of the Site or such related products, services or websites
                (collectively with the Site, the “Services”), which are owned or
                operated by Purple Healthcare LLC D/B/A Purple PRN. (“Purple
                PRN”, “we”, “our” or “us”). Our Privacy Policy, available at{" "}
                <Link to="/privacy">www.PurplePRN.com/privacy-policy/</Link> is
                incorporated by reference into these Terms. Please read these
                Terms and the Privacy Policy carefully be fore you access the
                Services, as these Terms form a binding legal agreement between
                you and Purple PRN.
              </p>
              <p>
                These Terms may apply to the individual healthcare providers
                offering their services, to the healthcare facilities manager
                using the Service or to the business or other legal entity user
                they represent, or all of these entities. If you are using the
                Site or Services on behalf of a company or other legal entity,
                you hereby represent and warrant that you have the authority to
                enter into these Terms on behalf of such entity.
              </p>
              <p>By accessing, registering for or using the Services, you:</p>
              <ol className="register">
                <li>
                  acknowledge that you have read and understand these Terms
                </li>
                <li>agree to be bound by them in their entirety, and</li>
                <li>
                  are entering into a legally binding agreement with us. As used
                  in these Terms and unless separately identified as applicable
                  to either an individual or entity, “you” and “your” refer to
                  both you individually and the entity on behalf of which you
                  are entering into these Terms.
                </li>
              </ol>
            </div>
            <div className="condition-box">
              <div className="condition-subtitle">
                IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT USE THE
                SERVICES. YOUR USE OF OUR SERVICES REQUIRES YOUR ACCEPTANCE OF
                THESE TERMS AS THEY MAY BE AMENDED FROM TIME TO TIME, INCLUDING
                THE POLICIES INCORPORATED BY REFERENCE HEREIN, WHICH INCLUDES
                THE Purple PRN PRIVACY POLICY.
              </div>
              <ol>
                <li>Overview of Services; Disclaimer</li>
                <p>
                  1.1. Overview of Services. Purple PRN provides an online
                  booking platform that permits hospitals, health systems,
                  outpatient clinics, or their facility managers on their behalf
                  (collectively, “Healthcare Facilities”) to hire and schedule
                  for physical therapists, physical therapy assistants,
                  Occupational Therapist, Occupational Therapist Assistant and
                  Speech Language Pathologists (collectively “Healthcare
                  Providers”) that allows Healthcare Facilities to meet their
                  healthcare provider needs. Purple PRN allows Healthcare
                  Providers to sign up with the platform where Healthcare
                  Providers can be placed and scheduled to work with a
                  Healthcare Facility.
                </p>
                <p>
                  1.2. Healthcare Provider Registration. If you are a Healthcare
                  Provider, then this section applies to you and you will be
                  required to undergo Purple PRN’s credentialing process in
                  order to be placed with a Healthcare Facility. You will be
                  required to provide certain information such as your name,
                  address, date of birth, work history, educational history,
                  Social Security Numbers, ID and password for account
                  registration and financial information for payment processing,
                  and other information that will allow us to identify you
                  (“Healthcare Provider Credentialing Information”). You may be
                  required to undergo a background check in order to be placed
                  with a Healthcare Facility. Use of the Services is granted
                  subject to our ability to verify your identity and completion
                  of background check and drug screening. If you do not provide
                  accurate and complete information during the credentialing
                  process, we have the right to prohibit you from using the
                  Service or decline to process the request, in addition to any
                  other rights. If you believe that your Healthcare Provider
                  Credentialing Information or a device that you use to access
                  the Services has been lost or stolen, that someone is using
                  your account without your permission, you must notify us
                  immediately at{" "}
                  <a href="mailto:contact@PurplePRN.com">
                    contact@PurplePRN.com
                  </a>
                  .
                </p>
                <p>
                  1.3. Healthcare Facility Registration. If you are a Healthcare
                  Facility, then this section applies to you and you will be
                  required to provide certain information to register for an
                  account with Purple PRN. This information may include an ID
                  and password, name, address, date of birth, Social Security
                  Numbers, financial information for payment processing, and
                  other information that will allow us to identify you
                  (“Healthcare Facility Registration Information”). Use of the
                  Services is granted subject to our ability to verify your
                  identity.
                </p>
                <p>
                  1.4. Booking Process. Healthcare Facilities will have access
                  to review Healthcare Provider Credentialing Information.
                  Healthcare Facility may initiate a booking request for a
                  Healthcare Provider. Healthcare Providers agree to receive
                  notifications via the Services when a booking request has been
                  made for the Healthcare Provider provided such notifications
                  may be adjusted in the Services. If a booking request is
                  accepted, Healthcare Provider understands it will not be able
                  to cancel the booking request. Healthcare Facilities will be
                  able to cancel booking requests. Use of the Services does not
                  guarantee that any booking requests will be sent, accepted or
                  fulfilled.
                </p>
                <p>
                  1.5. Disclaimer. We reserve complete and sole discretion with
                  respect to the operation of the Services. We reserve the right
                  to change terms and warranties without notice. We also reserve
                  the right to withdraw, suspend, or discontinue any
                  functionality or feature of the Services at any time.
                </p>
              </ol>

              <ol start="2">
                <li>Your Eligibility; Your Responsibility</li>
                <p>
                  To be eligible to use the Services, you represent and warrant
                  that you:
                </p>
                <ol type="i">
                  <li>
                    are at least 18 years of age, or otherwise over the age of
                    majority in the jurisdiction in which you reside
                  </li>
                  <li>
                    are not currently restricted from the Services and are not
                    otherwise prohibited from having an account related thereto
                  </li>
                  <li>will only maintain one account at any given time</li>
                  <li>will only provide accurate information to Purple PRN</li>
                  <li>
                    have full power and authority to enter into these Terms and
                    doing so will not violate any other agreement to which you
                    are a party
                  </li>
                  <li>
                    will not violate any rights of Purple PRN or a third party.
                  </li>
                </ol>
                <p>
                  You assume all responsibility for your use of, and access to,
                  the Services. Accounts are for a single user, company or other
                  legal entity, as applicable. Any multiple-party use, other
                  than individual use on behalf of a company or other legal
                  entity, is prohibited. For example, sharing a login between
                  non-entity individual users is prohibited.
                </p>
              </ol>

              <ol start="3">
                <li>Personal Information; Your Content; Your Account</li>
                <p>
                  3.1. Accuracy. By registering for our Services, you represent
                  and warrant that all information you submit to us is true,
                  accurate, current and complete and that you will promptly
                  notify us in writing if your information changes. It is your
                  responsibility to keep your account and profile information
                  accurate and updated. We are not responsible for any disputes
                  or claims related to any inaccurate, incomplete, or untimely
                  information provided by you to us.
                </p>
                <p>
                  3.2. Privacy. To use our Services, you must register with us
                  and submit certain personally identifiable information. You
                  expressly agree that we may collect, disclose, store and
                  otherwise use your information in accordance with the terms of
                  the Purple PRN Privacy Policy, available at{" "}
                  <Link to="/privacy">www.PurplePRN.com/privacy-policy/</Link>
                </p>
                <p>
                  3.3. Your Account. The account you create and any related
                  profile is owned by us. With regard to your account, you agree
                  to: (i) keep your password secure and confidential; (ii) not
                  permit others to use your account; (iii) not use the accounts
                  of others; (iv) not transfer your account to another party;
                  and (v) notify us of any actual or suspected unauthorized use
                  of your account. You are responsible for any activity
                  occurring under your account.
                </p>
                <p>
                  3.4. Feedback. You may from time to time identify problems,
                  solutions to identified problems, provide suggestions,
                  comments or other feedback related to our Services or
                  otherwise relating to Purple PRN (“Feedback”) to Purple PRN.
                  You acknowledge and agree that all Feedback is and shall be
                  given entirely voluntarily and Purple PRN shall be free to use
                  or disclose such Feedback for any purpose. You further
                  acknowledge and agree that your Feedback does not contain
                  confidential or proprietary information and you are not
                  entitled to any compensation or reimbursement of any kind from
                  Purple PRN under any circumstances relating to such Feedback.
                </p>
              </ol>
              <ol start="4">
                <li>Personal Use; Limited License; Ownership</li>
                <p>
                  Subject to the terms and conditions herein, Purple PRN grants
                  you a limited, revocable, non-transferable, non-sublicensable,
                  non-exclusive license and right to access the Services through
                  a generally available mobile device, web browser or Purple PRN
                  authorized Site to view content and information and otherwise
                  use the Services to the extent intended and permitted by the
                  functionality thereof. This license is personal to you, and
                  you may not resell our Services, permit other users access to
                  our Services through your account, or use the Services to host
                  content for others. You may not copy or download any content
                  from the Services except with the prior written approval of
                  Purple PRN. You acknowledge that, except as otherwise
                  expressly provided, these Terms are solely between you and
                  Purple PRN.
                </p>
                <p>
                  Furthermore, without the prior written approval of Purple PRN,
                  you may not distribute, publicly perform or display, lease,
                  sell, transmit, transfer, publish, edit, copy, create
                  derivative works from, rent, sub-license, distribute,
                  decompile, disassemble, reverse engineer or otherwise make
                  unauthorized use of the Services. Any commercial use not
                  expressly authorized is prohibited. You agree not to remove,
                  obscure, or alter copyright, patent, trademark, or other
                  proprietary rights notices affixed to the Services. Your
                  rights are subject to your compliance with these Terms as well
                  as any other agreements applicable to the Services you are
                  using. The Services provided by Purple PRN are licensed, not
                  sold. The Services, and all copies of the Services, are owned
                  by Purple PRN or its third-party licensors and are protected
                  by various intellectual property laws, including, without
                  limitation, copyright and trade secret laws. Purple PRN
                  reserves all rights not expressly granted to you herein. You
                  agree that you have no right to any Purple PRN trademark or
                  service mark and may not use any such mark in any way unless
                  expressly authorized by Purple PRN.{" "}
                </p>
                <p>
                  Making unauthorized copies or distribution of Site content or
                  otherwise violating these Terms may result in the termination
                  of your Purple PRN account, prohibition on use of the
                  Services, and further legal action. Purple PRN reserves the
                  right to limit your use of or access to the Services, in its
                  sole discretion in order to maintain the performance and
                  availability of the Services and to enforce these Terms of
                  Service.
                </p>
                <p>
                  Purple PRN is not liable for the loss, corruption, alteration
                  or removal of any content transmitted using our Services. By
                  using our Services, you expressly waive the right to seek
                  damages and agree to hold Purple PRN harmless for any such
                  loss, alteration, corruption or removal. You acknowledge and
                  agree that you are solely responsible for retaining all
                  records and reconciling all transaction information relating
                  to your use of the Services.{" "}
                </p>
              </ol>

              <ol start="5">
                <li>Acceptable Use Policy</li>
                <p>
                  You agree to comply with all applicable laws and regulations
                  in connection with your use of the Services. You may not use
                  our Services to post or transmit any illegal material,
                  including without limitation any transmissions that would
                  constitute a criminal offense, give rise to civil liability,
                  or otherwise violate any local, state, national or
                  international law or regulation. In particular, the following
                  is a representative, non-exhaustive list of acts that are
                  prohibited:
                </p>
                <ul>
                  <li>Using the Services while operating a motor vehicle</li>
                  <li>
                    The transmission or posting of chain letters or pyramid
                    schemes, or other acts that involve deceptive online
                    marketing practices or fraud
                  </li>
                  <li>
                    Acts that may materially and adversely affect the quality of
                    another users’ experience
                  </li>
                  <li>
                    Actual or attempted unauthorized use or sabotage of any
                    computers, machines or networks
                  </li>
                  <li>
                    Introducing malicious programs into Purple PRN’s Services,
                    network or servers (e.g. viruses, worms, Trojan horses,
                    etc.)
                  </li>
                  <li>
                    Engaging in any monitoring or interception of data not
                    intended for you without authorization
                  </li>
                  <li>
                    Attempting to circumvent authentication or security of any
                    host, network, or account without authorization
                  </li>
                  <li>
                    Reverse engineer, decompile, disassemble, decipher or
                    otherwise attempt to derive the source code for any
                    underlying intellectual property used to provide the
                    Services, or any part thereof
                  </li>
                  <li>
                    Adapt, modify or create derivative works based on the
                    Services, technology underlying the Services, or other
                    users’ content, in whole or part
                  </li>
                  <li>
                    Duplicate, license, sublicense, publish, broadcast,
                    transmit, distribute, perform, display, sell, rebrand, or
                    otherwise transfer information found on the Services
                    (excluding content posted by you) except as permitted in
                    these Terms, or as expressly authorized by Purple PRN in
                    writing
                  </li>
                  <li>
                    Using any method, software or program designed to collect
                    identity information, authentication credentials, or other
                    information
                  </li>
                  <li>
                    Transmitting or receiving, uploading, using or reusing
                    material that is abusive, indecent, defamatory, harassing,
                    obscene or menacing, or a breach of confidence, privacy or
                    similar third party rights
                  </li>
                  <li>
                    Transmitting or receiving, uploading, using or reusing
                    material that violates any intellectual property rights of a
                    third party, including, without limitation, patents,
                    trademarks, trade secrets or copyrights
                  </li>
                  <li>
                    Transmitting, receiving, uploading, using or reusing
                    material that you do not have a right to transmit under any
                    law or under contractual or fiduciary relationships (such as
                    inside information, proprietary and confidential information
                    learned or disclosed as part of employment relationships or
                    under nondisclosure agreements)
                  </li>
                  <li>Falsifying user identification information</li>
                  <li>
                    Using the Services for anything other than lawful purposes
                    including, but not limited to, intentionally or
                    unintentionally violating any applicable local, state,
                    national or international law
                  </li>
                  or
                  <li>
                    Impersonating any person or entity, including, but not
                    limited to, a Purple PRN representative, or falsely stating
                    or otherwise misrepresenting your affiliation with a person
                    or entity.<br></br>Purple PRN enforces a zero-tolerance SPAM
                    policy regarding information transmitted through our
                    network. PurpleP RN may determine in its sole discretion
                    whether any transmissions are considered SPAM. SPAM
                    includes, but is not limited to, the following
                  </li>
                  <li>
                    Bulk unsolicited e-mail, promotional material, or other
                    forms of solicitation sent via the Services, or e-mail that
                    advertises any IP address belonging to Purple PRN or any URL
                    (domain) that is hosted by Purple PRN.
                  </li>
                  <li>
                    The use of web pages set up on ISPs that allow SPAM-ing that
                    directly or indirectly reference customers to domains or IP
                    addresses hosted by Purple PRN.
                  </li>
                  <li>
                    {" "}
                    Forging or misrepresenting message headers, whether in whole
                    or in part, to mask the true origin of the message.<br></br>
                  </li>
                  <li>
                    You agree not to use the Services for the purpose of
                    recruiting for another website or service that offers
                    competing functionality to the Services.
                  </li>
                </ul>
              </ol>

              <ol start="6">
                <li>Copyright Protected Materials</li>
                <p>
                  Purple PRN respects the intellectual property rights of others
                  and expects that you do the same. It is our policy to
                  terminate, in appropriate circumstances, the accounts of
                  subscribers who infringe the copyrights of others. You may not
                  upload, download, post, publish, transmit, reproduce, or
                  distribute in any way, files, material, information, software
                  or other material obtained through the Services that is
                  protected by copyright or other proprietary right or
                  derivative works with respect thereto, without obtaining
                  permission of the copyright owner or other right holder.
                  Purple PRN has the right, but not the obligation, to remove
                  from the Services any files, material, information, software
                  or other material Purple PRN believes is or may be, in its
                  sole discretion, infringing or otherwise in violation of the
                  rights of others.
                </p>
                <p>
                  If you believe in good faith that your copyright has been
                  infringed, please provide a written communication regarding
                  such belief to:{" "}
                  <a href="mailto:contact@PurplePRN.com">
                    contact@PurplePRN.com
                  </a>
                </p>
              </ol>

              <ol start="7">
                <li>Right to Restrict or Terminate Access</li>
                <p>
                  Purple PRN may deny or restrict your access to all or part of
                  the Services without notice in its reasonable discretion if it
                  deems that you have engaged in any conduct or activities that
                  Purple PRN in its reasonable discretion believes violates the
                  letter or spirit of any of these Terms. If Purple PRN denies
                  or restricts your access to the Services because of such a
                  violation, you shall have no right to obtain any refund or
                  credit for the subscriptions fees you have paid.
                </p>
                <p>
                  In the event that these Terms or the Services are terminated
                  for any reason or no reason, you acknowledge and agree that
                  you will continue to be bound by these Terms. Following
                  termination, you shall immediately cease use of the Services
                  and any license granted to you under any agreement related to
                  your use of the Services shall immediately terminate. Upon
                  termination, Purple PRN reserves the right to delete all of
                  your content, data, and other information stored on Purple
                  PRN’s servers. Purple PRN will not be liable to you or any
                  third party as a result of the termination of these Terms or
                  the Services or for any actions taken by Purple PRN pursuant
                  to these Terms as a result of such termination. Without
                  limiting the generality of the foregoing, Purple PRN will not
                  be liable to you or any third party for damages, compensation,
                  or reimbursement relating to your use of the Services, or the
                  termination thereof.
                </p>
                <p>
                  You may terminate these Terms by terminating your use of the
                  Services and any related account. Any sections or terms which
                  by their nature should survive or are otherwise necessary to
                  enforce the purpose of these Terms, will survive the
                  termination of these Terms and termination of the Services.
                  Termination of these Terms or the Services does not relieve
                  you from your obligation to pay Purple PRN any amounts owed to
                  Purple PRN.
                </p>
              </ol>

              <ol start="8">
                <li>Security</li>
                <p>
                  Access to our Services and to certain online transactions may
                  involve the use of identification numbers, passwords, payment
                  accounts or other individualized nonpublic information
                  (“Private Documentation”). You acknowledge and agree that you
                  are solely responsible for protecting your Private
                  Documentation and other personal information and for the
                  consequences of not protecting such information and data. You
                  shall use your best efforts to prevent unauthorized use of our
                  Services, your account, or of any Private Documentation, and
                  shall promptly report to Purple PRN any suspected unauthorized
                  use or other breach of security. You shall be responsible for
                  any unauthorized use of your account or privacy Documentation
                  until we receive written notice of a breach of security and a
                  request to block further access for such information. Purple
                  PRN shall not be liable for any unauthorized use of payment
                  accounts.
                </p>
              </ol>

              <ol start="9">
                <li>Disclaimers</li>
                <p>
                  Actual service coverage, speeds, locations and quality may
                  vary. Purple PRN will attempt to provide the Services at all
                  times, except for limited periods for maintenance and repair.
                  However, the Services may be subject to unavailability for a
                  variety of factors beyond our control including emergencies,
                  third-party service failures, transmission, equipment or
                  network problems or limitations, interference, signal
                  strength, and may be interrupted, limited or curtailed. Delays
                  or omissions may occur. We are not responsible for data,
                  messages or pages lost, not delivered, delayed or misdirected
                  because of interruptions or performance issues with the
                  Services or communications services or networks. We may impose
                  usage or Services limits, suspend the Services, or block
                  certain kinds of usage in our sole discretion to protect users
                  or the Services. The accuracy and timeliness of data received
                  is not guaranteed.
                </p>
                <p>
                  YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. ALL SITE
                  CONTENT AND THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS
                  AVAILABLE” BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS,
                  STATUTORY OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY
                  IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, TITLE, CUSTOM, TRADE, QUIET ENJOYMENT,
                  NONINFRINGEMENT, AVAILABILITY OR ACCURACY OF INFORMATION.
                  Purple PRN DOES NOT WARRANT THAT THE SERVICES WILL BE
                  AVAILABLE, WILL MEET YOUR REQUIREMENTS OR WILL OPERATE IN AN
                  UNINTERRUPTED, ERROR-FREE OR COMPLETELY SECURE MANNER OR THAT
                  ERRORS OR DEFECTS WILL BE CORRECTED. Purple PRN DOES NOT MAKE
                  ANY REPRESENTATIONS, WARRANTIES, OR CONDITIONS REGARDING THE
                  USE OR THE RESULTS OF THE USE OF THE SERVICES, IN TERMS OF
                  THEIR ACCURACY, RELIABILITY, TIMELINESS, COMPLETENESS, OR
                  OTHERWISE.
                </p>
                <p>
                  SOME JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR LIMITATION
                  OF IMPLIED WARRANTIES OR CONDITIONS, OR ALLOW LIMITATIONS ON
                  HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS
                  OR EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH EVENT, Purple
                  PRN’S WARRANTIES AND CONDITIONS WITH RESPECT TO THE SERVICES
                  WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY APPLICABLE
                  LAW IN SUCH JURISDICTION.
                </p>
                <p>
                  YOU ACKNOWLEDGE AND AGREE THAT THE SERVICES ARE NOT FAULT
                  TOLERANT AND ARE NOT DESIGNED OR INTENDED FOR USE AS A
                  “CRITICAL CONTROL APPLICATION” IN MEDICAL EMERGENCIES OR
                  HAZARDOUS “LIFE AND DEATH” ENVIRONMENTS REQUIRING MEDICAL
                  EXPERTISE AND/OR FAIL-SAFE PERFORMANCE, SUCH AS DIRECT LIFE
                  SUPPORT MACHINES, ACUTE CARE SETTINGS, OR IN OPERATING
                  ENVIRONMENTS THAT ARE RELATED TO THE DIRECT DELIVERY OF CARE,
                  IN WHICH THE FAILURE OR IMPROPER USE OF THE SERVICES COULD
                  LEAD DIRECTLY TO DEATH, PERSONAL INJURY OR SEVERE PHYSICAL
                  DAMAGE. YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT SANGUINA
                  CANNOT BE HELD LIABLE FOR ANY HEALTH CARE OR RELATED DECISIONS
                  MADE BY YOU OR A HEALTH CARE FACILITY OR PROVIDER.
                </p>
              </ol>

              <ol start="10">
                <li>Limitation of Liability</li>
                <p>
                  UNDER NO CIRCUMSTANCES WILL Purple PRN, ITS AFFILIATES,
                  EMPLOYEES, AGENTS, REPRESENTATIVES, LICENSORS OR OTHER THIRD
                  PARTY PARTNERS (“Purple PRN PARTIES”) BE LIABLE TO YOU OR ANY
                  OTHER PERSON FOR ANY INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL,
                  EXEMPLARY OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE,
                  INABILITY TO USE, OR THE RESULTS OF USE OF OUR SERVICES,
                  WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING
                  NEGLIGENCE), OR ANY OTHER LEGAL THEORY; INCLUDING WITHOUT
                  LIMITATION DAMAGES RESULTING FROM LOST PROFITS, LOST DATA,
                  LOSS OF BUSINESS OR BUSINESS INTERRUPTION, WHETHER DIRECT OR
                  INDIRECT, ARISING OUT OF THE USE, INABILITY TO USE, OR THE
                  RESULTS OF USE OF OUR SERVICES, WHETHER BASED ON WARRANTY,
                  CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL
                  THEORY. YOUR SOLE AND EXCLUSIVE REMEDY UNDER THIS AGREEMENT
                  SHALL BE FOR YOU TO DISCONTINUE YOUR USE OF THE SERVICES.
                </p>
                <p>
                  A Purple PRN PARTY’S TOTAL CUMULATIVE LIABILITY SHALL IN NO
                  EVENT EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID Purple
                  PRN FOR YOUR USE OF THE SERVICES IN THE PRIOR THREE (3)
                  MONTHS; AND (B) THE SUM OF ONE HUNDRED (100) US DOLLARS.
                </p>
                <p>
                  SOME STATES OR JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR
                  THE LIMITATION OF LIABILITY. IN SUCH STATES OR JURISDICTIONS,
                  THE Purple PRN PARTIES’ LIABILITY TO YOU SHALL BE LIMITED TO
                  THE FULL EXTENT PERMITTED BY LAW. EACH PROVISION OF THESE
                  TERMS THAT PROVIDES FOR A LIMITATION OF LIABILITY, DISCLAIMER
                  OF WARRANTIES, OR EXCLUSION OF DAMAGES IS TO ALLOCATE THE
                  RISKS OF THIS AGREEMENT BETWEEN THE PARTIES. THIS ALLOCATION
                  IS REFLECTED IN THE PRICING OFFERED BY Purple PRN TO YOU AND
                  IS AN ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN
                  THE PARTIES. EACH OF THESE PROVISIONS IS SEVERABLE AND
                  INDEPENDENT OF ALL OTHER PROVISIONS OF THESE TERMS. THE
                  LIMITATIONS IN SECTIONS 9 AND 10 WILL APPLY NOTWITHSTANDING
                  THE FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY IN THIS
                  AGREEMENT.
                </p>
              </ol>
              <ol start="11">
                <li>Dispute Resolution</li>
                <p>
                  Excluding claims for injunctive or other equitable relief, for
                  any claim where the total amount of the award sought is less
                  than $10,000, the party requesting relief may elect to resolve
                  the dispute through binding non-appearance-based arbitration.
                  In the event a party elects arbitration, they shall initiate
                  such arbitration through an established alternative dispute
                  resolution Purple PRN mutually agreed upon by the parties. The
                  arbitration shall be conducted by telephone, online or be
                  solely based on written submissions; the specific manner shall
                  be chosen by the party initiating the arbitration. The
                  arbitration shall not require any personal appearance by the
                  parties or witnesses unless otherwise mutually agreed by the
                  parties. Any judgment on the award rendered by the arbitrator
                  shall be final and may be entered in any court of competent
                  jurisdiction. You agree that any dispute resolution
                  proceedings will be conducted only on an individual basis and
                  not in a class, consolidated or representative action. If for
                  any reason a claim proceeds in court rather than in
                  arbitration each party waives any right to a jury trial.
                </p>
              </ol>
              <ol start="12">
                <li>Electronic Notices and Disclosures</li>
                <p>
                  You acknowledge and agree that Purple PRN may provide notices
                  and other disclosures to you electronically by posting such
                  notices or other disclosures on Purple PRN’s website, by
                  texting your phone number or by emailing it to you at any
                  email address provided to Purple PRN by you. Such notices or
                  other disclosures shall be considered received by you
                  following the posting on the website or twenty-four (24) hours
                  following the email being sent to you, as applicable. Any such
                  electronic notice or other disclosure shall have the same
                  effect and meaning as if it had been provided to you as a
                  paper copy.
                </p>
              </ol>
              <ol start="13">
                <li>Changes to the Terms</li>
                <p>
                  We may add to, change or remove any part of these Terms, at
                  any time without prior notice to you other than listing of a
                  later effective date than the one set forth at the top of
                  these Terms. Such modification shall be effective immediately
                  upon posting at the Site. As your next visit to the Site or
                  use of the Services may be governed by different Terms, we
                  encourage you to look for a new effective date on these Terms
                  when you visit the Site or use the Services. It is your
                  responsibility to check these Terms periodically for changes.
                  If we make any material changes to these Terms, we will
                  endeavor to provide registered users with additional notice of
                  any changes, such as at your e-mail address of record or when
                  you log-in to your account.
                </p>
                <p>
                  Your use or continued use of the Services following the
                  posting or notice of any changes to these Terms or any other
                  posted policies shall constitute your acceptance of the
                  changed Terms or policies.
                </p>
              </ol>
              <ol start="14">
                <li>Third-Party Content and Services</li>
                <p>
                  14.1. Linked Third Party Sites. The Services may make
                  available third-party resources such as but not limited to
                  property websites, landing pages, and other third-party sites
                  over which Purple PRN has no control. Purple PRN is not
                  responsible for the accuracy, completeness, functionality,
                  usability, availability or merchantability of any content
                  provided by third-party resources. The use of such third-party
                  resources is strictly at Client’s own risk. Purple PRN is not
                  responsible for the availability of external sites or
                  resources, does not endorse and is not responsible or liable
                  for any content, advertising, products or other materials on
                  or available from such sites or resources. Purple PRN will not
                  be responsible or liable, directly or indirectly, for any
                  damage or loss caused or alleged to be caused by or in
                  connection with use of or reliance on any such content,
                  advertising, products or other materials available on or
                  through any such site or resource.
                </p>
                <p>
                  14.2 Integrated Third-Party Services. The Services may contain
                  features designed to interoperate with products, applications,
                  or services not provided by Purple PRN such as {STRIPE} (each,
                  a “Third Party Service”). To use such features, you may need
                  to directly obtain access to such Third-Party Service from its
                  provider, and in some cases may be required to grant Purple
                  PRN access to your account(s) on such Third-Party Service.
                </p>
                <p>
                  14.3 Permissions; Disclaimer. If Company chooses to use a
                  Third Party Service with the Services, Company grants Purple
                  PRN permission to allow the Third Party Service and its
                  provider to access any data (including, without limitation,
                  data that may constitute non-public personal information)
                  provided to Purple PRN in connection with the Services as
                  required for the interoperation of that Third Party Service
                  with the Services. Purple PRN is not responsible for any
                  disclosure, modification or deletion of such data resulting
                  from access by any Third-Party Service or its provider. Any
                  acquisition by Company of a Third-Party Service, and any
                  exchange of data between Company and any Third Party Service
                  or its provider, is solely between Company and the applicable
                  third-party provider. Purple PRN does not warrant or support
                  Third Party Service or other third-party products or services,
                  whether or not they are designated by Purple PRN as operable
                  with the Services or otherwise. Further, Purple PRN cannot
                  guarantee the continued availability of any Services features
                  that interoperate with Third Party Service, and may cease
                  providing them without entitling Company to any refund,
                  credit, or other compensation, if for example and without
                  limitation, the provider of a Third Party Service ceases to
                  make the Third Party Service available for interoperation with
                  the corresponding Services features in a manner acceptable to
                  Purple PRN.
                </p>
                <p>
                  14.4 Apple App Store. If you are accessing the Services
                  through an application from the Apple App Store, you and
                  Purple PRN agree to the following additional terms:
                </p>
                <ul>
                  <li>
                    Purple PRN and you acknowledge that these Terms are
                    concluded between you and Purple PRN only, and not with
                    Apple, and Purple PRN, not Apple, is solely responsible for
                    the Services and the content thereof. Purple PRN and you
                    acknowledge and agree that Apple, and Apple’s subsidiaries,
                    are third party beneficiaries of these Terms, and that, upon
                    your acceptance of the Terms, Apple will have the right (and
                    will be deemed to have accepted the right) to enforce the
                    Terms against you as a third party beneficiary thereof.
                    Purple PRN and you agree to be bound by the App Store Terms
                    of Service as of the Effective Date (which you acknowledge
                    you have had the opportunity to review), including without
                    limitation the Usage Rules (as defined in the App Store
                    Terms of Service) (capitalized terms below have the
                    definitions given to them in the App Store Terms of Service
                    unless otherwise defined herein).
                  </li>
                  <li>
                    You may only access the Services on an iOS product that you
                    own or control and only as permitted by the Usage Rules set
                    forth in the App Store Terms of Service.
                  </li>
                  <li>
                    To the extent set forth herein or required by applicable
                    law, Purple PRN is solely responsible for providing any
                    maintenance and support services with respect to the
                    Services. You acknowledge and agree that Apple has no
                    obligation whatsoever to furnish any maintenance and support
                    services with respect to the Services.
                  </li>
                  <li>
                    Purple PRN, not Apple, is solely responsible for any product
                    warranties set forth in these Terms, whether express or
                    implied by law, to the extent not effectively disclaimed. In
                    the event of any failure of the application to conform to
                    any applicable warranty, you may notify Apple, and Apple
                    will refund the purchase price for the application to you;
                    provided that, to the maximum extent permitted by applicable
                    law, Apple will have no other warranty obligation whatsoever
                    with respect to the Services, and any other claims, losses,
                    liabilities, damages, costs or expenses attributable to any
                    failure to conform to any warranty, if any, will be Purple
                    PRN’s sole responsibility, to the extent not disclaimer
                    herein.
                  </li>
                  <li>
                    Purple PRN and you acknowledge that Purple PRN, not Apple,
                    is responsible for addressing any claims by you or any third
                    party relating to the Services or your possession and/or use
                    of the Services, including, but not limited to:
                    <ol
                      type="i"
                      className="claim">
                      <li>product liability claims</li>
                      <li>
                        any claim that the Services fail to conform to any
                        applicable legal or regulatory requirement
                      </li>
                      <li>
                        claims arising under consumer protection or similar
                        legislation.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Apple shall in no way be responsible for any claim
                    (including any related investigation, defense, settlement or
                    discharge thereof) that the Services or your possession and
                    use of the Services infringe any third party’s intellectual
                    property rights.
                  </li>
                  <li>
                    If you send SMS messages through Services, you acknowledge
                    that standard text messaging rates or other carrier charges
                    may apply to such use.
                  </li>
                  <li>
                    You represent and warrant that you are not located in a
                    country that is subject to a U.S. Government embargo, or
                    that has been designated by the U.S. Government as a
                    “terrorist supporting” country and that you are not listed
                    on any U.S. Government list of prohibited or restricted
                    parties.
                  </li>
                  <li>
                    If you authorize Purple PRN to access your Address Book on
                    your iOS product, you acknowledge and agree that Purple PRN
                    may access and use such data to invite share shift with your
                    contacts.
                  </li>
                  <li>
                    Purple PRN may send you Push Notifications and use your
                    geo-location data if you authorize Purple PRN to do so.
                    Additionally, the Services may incorporate the Google Maps
                    API. Accordingly, if the Google Maps API is incorporated, by
                    accessing or using our Services, you hereby agree to be
                    bound by Google’s Terms of Service (available at{" "}
                    <Link>https://www.google.com/intl/en/policies/terms/</Link>)
                    and Google’s Privacy Policy (available at{" "}
                    <Link>https://www.google.com/privacy.html</Link>) Purple PRN
                    will communicate with you via email and text messaging. You
                    can change your notification preferences in your account but
                    it will default to receiving messages via text AND email.
                  </li>
                  <li>
                    The text messages will be coming from a third-party source
                    (Twilio) within our system and the emails will be coming
                    from (PostMark).
                  </li>
                  <p>
                    Regarding messages you will be receiving and all
                    communication methods via texts/short code:
                  </p>
                  <ol className="regard">
                    <li>
                      You have the option to receive system notifications over
                      SMS. These notifications include timecard notification as
                      well as shift requests and reminders when applicable from
                      your employer. The number of notifications varies
                      depending on your activity on the platform. Within you
                      profile page, you can enable/disable varies notification
                      levels. You may also opt out of notification in your
                      profile or using the steps below.
                    </li>
                    <li>
                      When you opt-in to the service, we will send you an SMS
                      message to confirm your signup.
                    </li>
                    <li>
                      You can cancel the SMS service at any time. Just text
                      “STOP” to the short code. After you send the SMS message
                      “STOP” to us, we will send you an SMS message to confirm
                      that you have been unsubscribed. After this, you will no
                      longer receive SMS messages from us. If you want to join
                      again, just sign up as you did the first time and we will
                      start sending SMS messages to you again.
                    </li>
                    <li>
                      If at any time you forget what keywords are supported,
                      just text “HELP” to the short code. After you send the SMS
                      message “HELP” to us, we will respond with instructions on
                      how to use our service as well as how to unsubscribe.
                    </li>
                    <li>
                      We are able to deliver messages to the following mobile
                      phone carriers: Major carriers: AT&T, Verizon Wireless,
                      Sprint, T-Mobile, MetroPCS, U.S. Cellular, Alltel, Boost
                      Mobile, Nextel, and Virgin Mobile. Minor carriers: Alaska
                      Communications Systems (ACS), Appalachian Wireless (EKN),
                      Bluegrass Cellular, Cellular One of East Central IL
                      (ECIT), Cellular One of Northeast Pennsylvania, Cincinnati
                      Bell Wireless, Cricket, Coral Wireless (Mobi PCS), COX,
                      Cross, Element Mobile (Flat Wireless), Epic Touch (Elkhart
                      Telephone), GCI, Golden State, Hawkeye (Chat Mobility),
                      Hawkeye (NW Missouri), Illinois Valley Cellular, Inland
                      Cellular, iWireless (Iowa Wireless), Keystone Wireless
                      (Immix Wireless/PC Man), Mosaic (Consolidated or CTC
                      Telecom), Nex-Tech Wireless, NTelos, Panhandle
                      Communications, Pioneer, Plateau (Texas RSA 3 Ltd), Revol,
                      RINA, Simmetry (TMP Corporation), Thumb Cellular, Union
                      Wireless, United Wireless, Viaero Wireless, and West
                      Central (WCC or 5 Star Wireless). ***Carriers are not
                      liable for delayed or undelivered messages***
                    </li>
                    <li>
                      {" "}
                      As always, message and data rates may apply for any
                      messages sent to you from us and to us from you. You will
                      receive daily texts. If you have any questions about your
                      text plan or data plan, it is best to contact your
                      wireless provider. For all questions about the services
                      provided by this short code, you can send an email to{" "}
                      <a href="mailto:contact@PurplePRN.com">
                        contact@PurplePRN.com
                      </a>
                      .
                    </li>
                    <li>
                      If you have any questions regarding privacy, please read
                      our privacy policy:{" "}
                      <Link to="/privacy">
                        https://www.PurplePRN.com/privacy-policy
                      </Link>
                    </li>
                  </ol>
                </ul>
              </ol>

              <ol start="15">
                <li>Miscellaneous</li>
                <p>
                  15.1. Entire Agreement. These Terms, along with any rules,
                  guidelines, or policies published on the Purple PRN homepage
                  constitute the entire agreement between Purple PRN and you
                  with respect to your use of our Services. If there is any
                  conflict between the Terms and any other rules or instructions
                  posted on the Services, the Terms shall control. No amendment
                  to these Terms by you by shall be effective unless
                  acknowledged in writing by Purple PRN. Notwithstanding the
                  foregoing, Purple PRN reserves the right, in its sole
                  discretion, to modify these Terms or the policies referenced
                  herein at any time as set forth above.
                </p>
                <p>
                  15.2. Governing Law. These Terms shall be governed by, and
                  construed in accordance with, the laws of the state of Texas ,
                  without reference to its choice of law rules. Subject to the
                  arbitration provisions above, exclusive venue for any action
                  arising out of or in connection with this agreement shall be
                  in Houston, TX. The parties each hereby consent to the
                  jurisdiction and venue in Houston, TX and waive any objections
                  to such jurisdiction and venue.
                </p>
                <p>
                  15.3. Equitable Relief. Notwithstanding the foregoing, you
                  agree that Purple PRN shall be entitled to apply for
                  injunctive remedies or other equitable relief in any
                  jurisdiction. Subject to any applicable law to the contrary,
                  you agree that any cause of action arising out of or related
                  to the use of our Services must be commenced within one (1)
                  year after the cause of action accrues, or such action will be
                  permanently barred. If any portion of these Terms is found to
                  be unenforceable or invalid for any reason, that provision
                  will be limited or eliminated to the minimum extent necessary
                  so that the rest of these Terms will otherwise remain in full
                  force and effect.
                </p>
                <p>
                  15.4. Assignment. You may not assign your rights or
                  obligations under these Terms without the prior written
                  consent of Purple PRN. Purple PRN’s failure to insist upon or
                  enforce any provision of these Terms shall not be construed as
                  a waiver of any provision or right. Any sections or terms
                  which by their nature should survive or are otherwise
                  necessary to enforce the purpose of these Terms, will survive
                  the termination of these Terms and termination of the
                  Services.
                </p>
                <p>
                  15.5. Headings. All headings included in these Terms are
                  included for convenience only, and shall not be considered in
                  interpreting these Terms. These Terms do not limit any rights
                  that Purple PRN may have pursuant to any intellectual property
                  laws or any other laws.
                </p>
                <p>
                  15.6. Remedies. All rights and remedies available to Purple
                  PRN, pursuant to this Agreement or otherwise, at law or in
                  equity, are cumulative and not exclusive of any other rights
                  or remedies that may be available to Purple PRN. In no event
                  shall you seek or be entitled to rescission, injunctive or
                  other equitable relief, or to enjoin or restrain the operation
                  of the Services, or any other materials issued in connection
                  therewith, or exploitation of the Services or any data or
                  other material used or displayed through the Services. Except
                  as otherwise expressly set forth herein, there shall exist no
                  right of any person, other than you and Purple PRN, to claim a
                  beneficial interest in these Terms or any rights occurring by
                  virtue of these Terms. No independent contractor relationship,
                  partnership, joint venture, employer-employee or franchise
                  relationship is created by these Terms.
                </p>
                <p>
                  If you have any questions, complaints, or claims, you may
                  contact Purple PRN at 2950 Unity Dr #571112 Houston, TX 77057
                  or <a href="tel:(832) 800-3437">(832) 800-3437</a>.
                </p>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermCondition;
