import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./privacypolicy.scss";

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Purple PRN - Privacy Policy</title>
      </Helmet>
      <div className="privacy-section">
        <div className="custom-container">
          <div className="title">
            <h1>Privacy Policy</h1>
          </div>
          <div className="privacy-content">
            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Effective Date: June 13, 2021 Last Updated: June 1, 2022
              </div>
              <p>
                Purple Healthcare LLC doing business as Purple PRN (collectively
                referred to herein as “Purple PRN”, “we”, “our”, or “us)
                recognizes the importance of protecting personal data we may
                collect from visitors and any other individual or entity
                (“Users”, “you”, or “your”) who visit our web sites. This
                Privacy Policy applies to data collection by Purple PRN and
                shall apply to your use of the website, www.PurplePRN.com and
                other Purple PRN-related sites, applications, software,
                communications, capabilities and services (“Services”)
                accessible on or by any top-level Purple PRN domain owned by us
                (each, a “Site” and collectively the “Sites”), but excluding
                services that state that they are offered under a different
                privacy policy.
              </p>
              <p>Our Privacy Policy explains:</p>
              <ol>
                <li>what information we collect</li>
                <li>why we collect it</li>
                <li>how we use that information</li>
                <li>how we may share it</li>
                <li>
                  the choices we offer, including how to access and delete
                  information.
                </li>
              </ol>
              <p>
                Specifically, our Privacy Policy covers the following topics:
              </p>
              <ol>
                <li>When This Privacy Policy Applies </li>
                <li>Conditions of Use</li>
                <li>Information We Collect</li>
                <li>Information Collected Related to California Residents</li>
                <li>Cookies & Other Technologies</li>
                <li>How We Use Information We Collect</li>
                <li>Our Legal Basis for Collecting Personal Information</li>
                <li>Your Failure to Provide Personal Information</li>
                <li>Our Retention of Your Personal Information</li>
                <li>Sharing Personal Information</li>
                <li>Sale of Personal Information </li>
                <li>
                  Your Rights and Choices
                  <ol type="a">
                    <li>Rights Specific to Californians</li>
                    <li>Rights Specific to European Union Residents</li>
                  </ol>
                </li>
                <li>Exercising Your Rights</li>
                <li>Our Opt-in/Opt-out Policy</li>
                <li>Third Party Links</li>
                <li>International Transfer</li>
                <li>How We Protection Personal Information</li>
                <li>Children</li>
                <li>Direct Marketing and “Do Not Track” Signals </li>
                <li>Changes to this Privacy Policy </li>
                <li>
                  How to Contact Us Please familiarize yourself with our privacy
                  practices and let us know if you have any questions. By using
                  the Sites, you signify your acceptance of this Privacy Policy.
                  If you do not agree to this Privacy Policy, please do not use
                  the Sites.
                </li>
              </ol>
              <p>
                If you have any questions or comments about this Privacy Policy,
                please submit a request to{" "}
                <a href="mailto:contact@PurplePRN.com">contact@PurplePRN.com</a>
                .
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                When this Privacy Policy Applies
              </div>
              <p>
                Our Privacy Policy applies to all of the services offered by
                Purple PRN and its affiliates, including InstaStaff, and
                services offered on other sites, but excludes services that have
                separate privacy policies that do not incorporate this Privacy
                Policy. Our Privacy Policy does not apply to services offered by
                other companies or individuals, including products or sites that
                may be displayed to you, or other sites linked from our
                Services. Our Privacy Policy does not cover the information
                practices of other companies and organizations who advertise our
                Services, and who may use cookies, pixel tags and other
                technologies to serve and offer relevant ads.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">Conditions of Use</div>
              <p>
                By accessing or using the Sites and Services in any manner, you
                also agree to be bound by PurplePRN’s Terms of Service (the
                “Agreement”). Please read the Agreement carefully. If you do not
                accept all of the terms and conditions contained in or
                incorporated by reference into the Agreement, please do not use
                the Sites.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">Information We Collect</div>
              <p>
                We collect information, including personal information, to
                provide better services to all our Users. We use the term
                “Personal Information” to refer to any information that
                identifies or can be used to identify you. Common examples of
                Personal Information include: full name, email address, digital
                identity, such as a login name or handle, information about your
                device, and certain metadata.
              </p>
              <p>
                The personal information which we collect includes, but is not
                limited to, the following circumstances and data elements:
              </p>
              <ul className="privacypolicy-lists">
                <li>
                  {" "}
                  If you express an interest in obtaining additional information
                  about our services, request customer support, use our “Contact
                  Us” or similar features, register to use our Sites or
                  Services, or download certain content, we may require that you
                  provide to us your contact information, such as your name,
                  organization , phone number, or email address, and in some
                  instances, you may elect to provide us with location and
                  address information;
                </li>
                <li>
                  If you report a problem or have a question about our Services,
                  you may provide us with contact information, such as a phone
                  number or email address;
                </li>
                <li>
                  As part of our financial bank management services, we may
                  require that you provide to us your financial and billing
                  information, such as billing name and address, credit card
                  number or bank account information;
                </li>
                <li>
                  If you use and interact with our websites or emails, we
                  automatically collect information about your device and your
                  usage of our websites or emails through cookies, web beacons
                  or similar technologies, such as Internet Protocol (IP)
                  addresses or other identifiers, which may qualify as Personal
                  Information (please see the “What device and usage data we
                  process” section, below);
                </li>
                <li>
                  If you use and interact with our services, we automatically
                  collect information about your device and your usage of our
                  services, through log files and other technologies, some of
                  which may qualify as Personal Information;
                </li>
                <li>
                  {" "}
                  If you voluntarily submit certain information to our services,
                  such as filling out a survey about your user experience, we
                  collect the information you have provided as part of that
                  request; and If you provide us or our service providers with
                  any Personal Information relating to other individuals, you
                  represent that you have the authority to do so and acknowledge
                  that it will be used in accordance with this Privacy Policy.
                  If you believe that your Personal Information has been
                  provided to us improperly, or to otherwise exercise your
                  rights relating to your Personal Information, please contact
                  us by using the information set out in the “How to Contact Us”
                  section below.
                </li>
              </ul>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Information Collected Related to California Residents
              </div>
              <p>
                During the last twelve (12) months, we have collected the
                following categories of personal information from consumers.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Category Type of Identifiers We Collect Collected
              </div>
              <ol
                type="A"
                className="privacy-residents">
                <li>Identifiers.</li>
                <p>
                  First and last name, postal address, unique personal
                  identifier, online identifier, Internet Protocol address,
                  email address.
                </p>
              </ol>
              <ol
                type="A"
                start="2"
                className="privacy-residents">
                <li>
                  Personal information categories listed in the California
                  Customer Records statute (Cal. Civ. Code § 1798.80(e)).
                </li>
                <p>
                  A name, signature, address, telephone number, bank account
                  number, credit card number, debit card number, or any other
                  financial information. Background check, Health information,
                  Licenses, Skill checks, employment and education verification,
                  drug screens, and personal references, job information, job
                  qualifications, social security number, personal references.
                </p>
              </ol>
              <ol
                type="A"
                start="6"
                className="privacy-residents">
                <li>Internet or other similar network activity.</li>
                <p>
                  Browsing history, search history, information on a consumer’s
                  interaction with a website, application, or advertisement.
                </p>
              </ol>
              <p>
                We obtain the categories of personal information listed above
                from the following categories of sources:
              </p>
              <ul>
                <li>
                  Directly from our clients or their agents. For example, from
                  documents that our clients provide to us related to the
                  services for which they engage us.
                </li>
                <li>
                  Indirectly from our clients or their agents. For example,
                  through information we collect from our clients in the course
                  of providing services to them.
                </li>
                <li>
                  Directly and indirectly from activity on our website{" "}
                  <Link to="/"> (https://PurplePRN.com)</Link> For example, from
                  website usage details that are collected automatically. In
                  addition, like many companies, we use “cookies” which are
                  small text files a website can use to recognize repeat users,
                  facilitate the user’s ongoing access to and use of the site
                  and to track usage behavior of, for example, the webpages you
                  visit.
                </li>
                <li>
                  From third-parties that interact with us in connection with
                  the services we perform.
                </li>
              </ul>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Cookies and Similar Technologies
              </div>
              <p>
                We and our partners use various technologies to collect and
                store information when you visit one of our services, and this
                may include using cookies or similar technologies to identify
                your browser or device. We also use these technologies to
                collect and store information when you interact with services
                from our partners, such as advertising services. Our third party
                advertising and analytics partners include Google, Facebook and
                similar partners.
              </p>
              <p>
                The technologies we use for this automatic data collection may
                include:
              </p>
              <ul>
                <li>
                  Cookies. A cookie is a small file placed on the hard drive of
                  your computer. You may refuse to accept browser cookies by
                  activating the appropriate setting on your browser. However,
                  if you select this setting you may be unable to access certain
                  parts of our services. Unless you have adjusted your browser
                  setting so that it will refuse cookies, our system will issue
                  cookies when you direct your browser to our services. For more
                  information about our use of cookies, including details on how
                  to opt-out of certain cookies, please see our Cookie Policy.
                </li>
                <li>
                  Web Beacons. Pages of our services or our e-mails may contain
                  small electronic files known as web beacons (also referred to
                  as clear gifs, pixel tags and single-pixel gifs) that permit
                  us, for example, to count Users who have visited those pages
                  or opened an e-mail and for other related website statistics
                  (for example, recording the popularity of certain website
                  content and verifying system and server integrity).
                </li>
                <li>
                  Clickstream Data. Clickstream data is information collected by
                  our computers when you request Web pages from the Sites.
                  Clickstream data may include information such as the page
                  served, the time spent viewing the page, source of the
                  request, type of browser making the request, the preceding
                  page viewed and similar information. Clickstream data permits
                  us to analyze how visitors arrive at the Sites, what type of
                  content is popular, what type of visitors in the aggregate are
                  interested in particular kinds of content on the Sites.
                </li>
              </ul>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                How We Use Information We Collect
              </div>
              <p>
                We use your Personal Information in ways that are compatible
                with the purposes for which it was collected or authorized by
                you, including for the following purposes:
              </p>
              <ol>
                <li>
                  To present, operate or improve the Site and Services,
                  including analysis of Site activity;
                </li>
                <li>
                  To inform you about Services and products available from
                  Purple PRN;
                </li>
                <li>
                  To carry out our obligations and enforce our rights arising
                  from any contracts entered into between you and us, including
                  for billing and collection;
                </li>
                <li>To authorize access to our Sites and Services;</li>
                <li>To offer and administer programs;</li>
                <li>To customize or tailor your experience of the Services;</li>
                <li>
                  To administer content, promotion, surveys, or other Site
                  features;
                </li>
                <li>
                  To communicate about, and administer your participation in,
                  special programs, surveys, contests, online campaigns, online
                  programs, and other offers or promotions, and to deliver
                  pertinent emails;
                </li>
                <li>To improve our customer service. </li>
                <li>
                  To respond to and support users regarding their use of the
                  Sites and Services.
                </li>
                <li>To comply with all applicable legal requirements. </li>
                <li>
                  To investigate possible fraud or other violations of our Terms
                  of Use or this Privacy Policy and/or attempts to harm our
                  Users.
                </li>
              </ol>
              <p>
                We use the information we collect from our Sites to provide,
                maintain, and improve them, to develop new services, and to
                protect our company and our Users. We use information collected
                from cookies and other technologies, to improve your User
                experience and the overall quality of our services. We may use
                your Personal Information to see which web pages you visit at
                our Site, which web site you visited before coming to our Site,
                and where you go after you leave our Site. We can then develop
                statistics that help us understand how our visitors use our Site
                and how to improve it. We may also use the information we obtain
                about you in other ways for which we provide specific notice at
                the time of collection. We will ask for your consent before
                using information for a purpose other than those set out in this
                Privacy Policy.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Our Legal Basis for Collecting Personal Information
              </div>
              <p>
                Whenever we collect Personal Information from you, we may do so
                on the following legal bases:
              </p>
              <ol>
                <li>Your consent to such collection and use;</li>
                <li>
                  Out of necessity for the performance of an agreement between
                  us and you, such as your agreement to use our Services or your
                  request for Services;
                </li>
                <li>
                  Our legitimate business interest, including but not limited to
                  the following circumstances
                </li>
                <li>
                  where collecting or using Personal Information is necessary
                  for:
                </li>
              </ol>
              <ul>
                <li>
                  Intra-organization transfers for administrative purposes;
                </li>
                <li>
                  Product development and enhancement, where the processing
                  enables Purple PRN to enhance, modify, personalize, or
                  otherwise improve our services and communications for the
                  benefit of our Users, and to better understand how people
                  interact with our Sites;
                </li>
                <li>Fraud detection and prevention;</li>
                <li>
                  Enhancement of our cybersecurity, including improving the
                  security of our network and information systems; and
                </li>
                <li>General business operations and diligence;</li>
              </ul>
              <p>
                Provided that, in each circumstance, we will weigh the necessity
                of our processing for the purpose against your privacy and
                confidentiality interests, including taking into account your
                reasonable expectations, the impact of processing, and any
                safeguards which are or could be put in place. In all
                circumstances, we will limit such processing for our legitimate
                business interest to what is necessary for its purposes.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Your Failure to Provide Personal Information
              </div>
              <p>
                Your provision of Personal Information is required in order to
                use certain parts of our services and our programs. If you fail
                to provide such Personal Information, you may not be able to
                access and use our Services and/or our programs, or parts of our
                Services and/or our programs.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Our Retention of Your Personal Information
              </div>
              <p>
                We determine the appropriate retention period for Personal
                Information on the basis of the amount, nature and sensitivity
                of your Personal Information processed, the potential risk of
                harm from unauthorized use or disclosure of your Personal
                Information and whether we can achieve the purposes of the
                processing through other means, as well as on the basis of
                applicable legal requirements (such as applicable statutes of
                limitation).
              </p>
              <p>
                After expiry of the applicable retention periods, your Personal
                Information will be deleted. If there is any data that we are
                unable, for technical reasons, to delete entirely from our
                systems, we will put in place appropriate measures to prevent
                any further use of such data.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Sharing Personal Information
              </div>
              <p>
                Purple PRN may disclose your Personal Information to commercial
                providers for a business purpose, which include verifying your
                identity when making a payment or registering access to your
                accounts. When we disclose Personal Information for these
                reasons, we enter into a contract that describes the purpose and
                requires the recipient to both keep that Personal Information
                confidential and not use it for any purpose except for the
                purposes set forth in the contract.
              </p>
              <p>
                In the preceding twelve (12) months, we have disclosed the
                following categories of Personal Information for one or more
                business purposes:
              </p>
              <ul>
                <li>Identifiers;</li>
                <li>
                  California Customer Records Personal Information categories;
                </li>
                <li>
                  Internet or other network activity information.<br></br>We
                  disclose your Personal Information for a business purpose to
                  the following categories of third parties:
                </li>
                <li>Our affiliates.</li>
                <li>Commercial providers.</li>
                <li>Enterprise accounts, such as your employer.</li>
                <li>
                  Third parties to whom you or your agents authorize us to
                  disclose your personal information in connection with the
                  services we provide to you.<br></br>We may disclose your
                  Personal Information for legal reasons. Specifically, we will
                  share Personal Information with companies, organizations or
                  individuals outside of Purple PRN if we have a good- faith
                  belief that access, use, preservation or disclosure of the
                  information is reasonably necessary to:
                </li>
                <li>
                  meet any applicable law, regulation, legal process or
                  enforceable governmental request.
                </li>
                <li>
                  enforce applicable Terms of Use, including investigation of
                  potential violations and for billing and collection purposes.
                </li>
                <li>
                  detect, prevent, or otherwise address fraud, security or
                  technical issues.
                </li>
                <li>
                  protect against harm to the rights, property or safety of
                  Purple PRN, our Users or the public as required or permitted
                  by law.
                </li>
                <p>
                  We attempt to notify Users about legal demands for their
                  personal data when appropriate in our judgment, unless
                  prohibited by law or court order or when the request is an
                  emergency. We may dispute such demands when we believe, in our
                  discretion, that the requests are overbroad, vague or lack
                  proper authority, but we do not promise to challenge every
                  demand.
                </p>
                <p>
                  We may disclose your Personal Information in the event of a
                  business transfer. If we establish a new related entity, are
                  acquired by or merged with another organization, or if
                  substantially all of our assets are transferred to another
                  organization, Personal Information about our users is often a
                  transferred business asset. In the event that Purple PRN
                  itself or substantially all of our assets are acquired,
                  Personal Information about our users may be one of the
                  transferred assets.
                </p>
              </ul>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Sale of Personal Information
              </div>
              <p>
                In the preceding twelve (12) months, we have not sold any
                Personal Information.{" "}
              </p>
            </div>

            <div className="privacycontentbox rights-choices">
              <div className="privacy-subtitle">Your Rights and Choices</div>
              <p>
                You may have certain rights relating to your Personal
                Information, subject to local data protection law. Whenever you
                use our services, we aim to provide you with choices about how
                we use your personal data. We also aim to provide you with
                access to your Personal Information. If that information is
                wrong, we strive to give you ways to update it quickly or to
                delete it – unless we have to keep that information for
                legitimate business or legal purposes. Subject to applicable
                law, you may obtain a copy of Personal Information we maintain
                about you or you may update or correct inaccuracies in that
                information by contacting us. To help protect your privacy and
                maintain security, we will take steps to verify your identity
                before granting you access to the information. In addition, if
                you believe that Personal Information we maintain about you is
                inaccurate, subject to applicable law, you may have the right to
                request that we correct or amend the information by contacting
                us as indicated in the How to Contact Us section below.{" "}
              </p>
              <ul>
                <li>Rights Specific to California Residents</li>
                Under the California Consumer Privacy Act, California residents
                have specific rights regarding their personal information. This
                section explains how California residents can exercise those
                rights and describes Californians’ rights.<br></br>o Exercising
                Your Rights
              </ul>
              <p>
                If you are a California resident who chooses to exercise your
                rights, you can:
              </p>
              <p>
                1. Submit a request via email to{" "}
                <a href="mailto:contact@PurplePRN.com">contact@PurplePRN.com</a>{" "}
                to submit your request.
              </p>
              <p>
                o Our Response to Your Request Upon receiving your request, we
                will confirm receipt of your request by sending you an
                email/confirming receipt. To help protect your privacy and
                maintain security, we may take steps to verify your identity
                before granting you access to the information. In some
                instances, such as a request to delete personal information, we
                may first separately confirm that you would like for us to in
                fact delete your personal information before acting on your
                request.
              </p>
              <p>
                We will respond to your request within forty-five (45) days. If
                we require more time, we will inform you of the reason and
                extension period in writing. If you have an account with us, we
                will deliver our written response to that account. If you do not
                have an account with us, we will deliver our written response by
                mail or electronically, at your option.
              </p>
              <p>
                In some cases our ability to uphold these rights for you may
                depend upon our obligations to process Personal Information for
                security, safety, fraud prevention reasons, compliance with
                regulatory or legal requirements, listed below, or because
                processing is necessary to deliver the services you have
                requested. Where this is the case, we will inform you of
                specific details in response to your request.
              </p>
              <p>
                o Californians’ Rights With Respect to Personal Information
                Below we further outline specific rights which California
                residents may have under the California Consumer Privacy Act.
              </p>
              <ol>
                <li>Right to Access Your Data. </li>
                <p>
                  You have the right to request that we disclose certain
                  information to you about our collection and use of your
                  personal information over the past 12 months. Once we receive
                  and confirm your verifiable consumer request, we will disclose
                  to you:
                </p>
                <ul>
                  <li>
                    The categories of personal information we collected about
                    you.
                  </li>
                  <li>
                    The categories of sources for the Personal Information we
                    collected about you.
                  </li>
                  <li>
                    Our business or commercial purpose for collecting that
                    Personal Information.
                  </li>
                  <li>
                    The specific pieces of personal information we collected
                    about you.
                  </li>
                  <li>
                    The categories of third parties with whom we share that
                    personal information.
                  </li>
                  <li>
                    The specific pieces of personal information we’ve disclosed
                    for a business or commercial purpose, identifying the
                    personal information categories that each category of
                    recipient obtained about you.
                  </li>
                </ul>
                <p>
                  Any disclosures we provide will only cover the 12-month period
                  preceding the receipt of your request. The response we provide
                  will also explain the reasons we cannot comply with a request,
                  if applicable.
                </p>
              </ol>
              <ol start="2">
                <li>Right to Data Portability.</li>{" "}
                <p>
                  You have the right to a “portable” copy of your personal
                  information that you have submitted to us. Generally, this
                  means you have a right to request that we move, copy or
                  transmit your personal information stored on our servers / IT
                  environment to another service provider’s servers / IT
                  environment.
                </p>
                <li>Right to Correction.</li>{" "}
                <p>
                  You have the right to request correction or changes of your
                  personal information if it is found to be inaccurate or out of
                  date.
                </p>
                <li>Right to Delete Your Data.</li>{" "}
                <p>
                  You have the right to request that we delete any of your
                  personal information that we collected from you and retained,
                  subject to certain exceptions. Once we receive and confirm
                  your verifiable consumer request, we will delete (and direct
                  our service providers to delete) your personal information
                  from our records, unless an exception applies.
                </p>
              </ol>
              <p>
                We may deny your deletion request if retaining the information
                is necessary for us or our service providers to:
              </p>
              <ol className="provider">
                <li>
                  Complete the transaction for which we collected the personal
                  information, provide a good or service that you requested,
                  take actions reasonably anticipated within the context of our
                  ongoing business relationship with you, or otherwise perform
                  our contract with you;
                </li>
                <li>
                  Detect security incidents, protect against malicious,
                  deceptive, fraudulent, or illegal activity, or prosecute those
                  responsible for such activities;
                </li>
                <li>
                  Debug products to identify and repair errors that impair
                  existing intended functionality
                </li>
                <li>
                  Exercise free speech, ensure the right of another consumer to
                  exercise their free speech rights, or exercise another right
                  provided for by law
                </li>
                <li>
                  Comply with the California Electronic Communications Privacy
                  Act (Cal. Penal Code § 1546 seq.)
                </li>
                <li>
                  Engage in public or peer-reviewed scientific, historical, or
                  statistical research in the public interest that adheres to
                  all other applicable ethics and privacy laws, when the
                  information’s deletion may likely render impossible or
                  seriously impair the research’s achievement, if you previously
                  provided informed consent
                </li>
                <li>
                  Enable solely internal uses that are reasonably aligned with
                  consumer expectations based on your relationship with us;
                </li>
                <li>Comply with a legal obligation</li>
                <li>
                  Make other internal and lawful uses of that information that
                  are compatible with the context in which you provided it.
                </li>
              </ol>
              <ul>
                <li>Rights Specific to European Union Residents</li>
                <p>
                  The European Union’s General Data Protection Regulation
                  (“GDPR”), and corresponding legislation in the United Kingdom
                  and Switzerland, provide European, Switzerland and United
                  Kingdom residents with certain rights in connection with
                  Personal Data you have shared with us. If you are resident in
                  the European Economic Area, you may have the following rights:
                </p>
                <ol>
                  <li>
                    The right to be informed.
                    <p>
                      You are entitled to be informed of the use of your
                      Personal Data. This Privacy Policy provides such
                      information to you.
                    </p>
                  </li>
                  <li>
                    The right of access.
                    <p>
                      You have the right to request a copy of your Personal Data
                      which we hold about you.
                    </p>
                  </li>
                  <li>
                    The right of correction:{" "}
                    <p>
                      You have the right to request correction or changes of
                      your Personal Data if it is found to be inaccurate or out
                      of date.
                    </p>
                  </li>
                  <li>
                    The right to be forgotten:
                    <p>
                      You have the right to request us, at any time, to delete
                      your Personal Data from our servers and to erase your
                      Personal Data when it is no longer necessary for us to
                      retain such data. Note, however, that deletion of your
                      Personal Data will likely impact your ability to use our
                      services.
                    </p>
                  </li>
                  <li>
                    The right to object (opt-out):
                    <p>
                      You have the right to opt-out of certain uses of your
                      Personal Data, such as direct marketing, at any time.
                    </p>
                  </li>
                  <li>
                    The right to data portability:
                    <p>
                      You have the right to a “portable” copy of your Personal
                      Data that you have submitted to us. Generally, this means
                      your right to request that we move, copy or transmit your
                      Personal Data stored on our servers / IT environment to
                      another service provider’s servers / IT environment.
                    </p>
                  </li>
                  <li>
                    The right to refuse to be subjected to automated decision
                    making, including profiling:
                    <p>
                      You have the right not to be subject to a decision and
                      insist on human intervention if the decision is based on
                      automated processing and produces a legal effect or a
                      similarly significant effect on you.
                    </p>
                  </li>
                  <li>
                    The right to lodge a complaint with a supervisory authority.
                    <p>
                      You may also have the right to make a GDPR complaint to
                      the relevant Supervisory Authority. A list of Supervisory
                      Authorities is available here:{" "}
                      <Link to="/">
                        http://ec.europa.eu/justice/data-
                        protection/bodies/authorities/index_en.htm.
                      </Link>{" "}
                    </p>
                  </li>
                </ol>
              </ul>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">Our Opt-in/Opt-out Policy</div>
              <p>
                By providing an email address on the Purple PRN Sites or
                Services, you agree that we may contact you in the event of a
                change in this Privacy Policy, to provide you with any Service
                related notices, or to provide you with information about our
                events, invitations, or related educational information.
              </p>
              <p>
                For purposes of this Privacy Policy, “opt-in” is generally
                defined as any affirmative action by a User to submit or receive
                information, as the case may be.
              </p>
              <p>We currently provide the following opt-out opportunities:</p>
              <ol>
                <li>
                  At any time, you can follow a link provided in offers,
                  newsletters or other email messages (except for e-commerce
                  confirmation or service notice emails) received from us or a
                  Purple PRN Partner to unsubscribe from the service.
                </li>
                <li>
                  At any time, you can contact us through{" "}
                  <a href="mailto:contact@PurplePRN.com">
                    contact@PurplePRN.com
                  </a>{" "}
                  to unsubscribe from the service and opt-out of our right per
                  your consent under the terms of this Privacy Policy to share
                  your Personal Information.
                </li>
                <li>
                  At any time, you can reply or text “STOP” to opt-out of
                  receiving SMS texts.
                </li>
              </ol>
              <p>
                Notwithstanding anything else in this Privacy Policy, please
                note that we always reserve the right to contact you in the
                event of a change in this Privacy Policy, or to provide you with
                any service related notices.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">Third Party Links</div>
              <p>
                The Sites may contain links to webpages operated by parties
                other than Purple PRN. We do not control such websites and are
                not responsible for their contents or the privacy policies or
                other practices of such websites. Our inclusion of links to such
                websites does not imply any endorsement of the material on such
                websites or any association with their operators. Further, it is
                up to the User to take precautions to ensure that whatever links
                the User selects or software the User downloads (whether from
                this Site or other websites) is free of such items as viruses,
                worms, trojan horses, defects and other items of a destructive
                nature. These websites and services may have their own privacy
                policies, which the User will be subject to upon linking to the
                third party’s website. Purple PRN strongly recommends that each
                User review the third party’s terms and policies.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">International Transfer</div>
              <p>
                We may, directly or indirectly through third-party entities
                around the world, process, store, and transfer the information
                you provide, including your Personal Information, as described
                in this Privacy Policy. Specifically, the information and
                Personal Information that we collect may be transferred to, and
                stored at, a location outside of your jurisdiction. It may also
                be processed by staff operating outside of your jurisdiction who
                work for us or for one of the organizations outlined in this
                Privacy Policy in connection with the activities outlined in
                this Privacy Policy. By submitting your information and Personal
                Information using the Sites, you agree to this transfer, storing
                or processing. We will take all steps necessary to ensure that
                your Personal Information is treated securely and in accordance
                with this Privacy Policy. We have put in place commercially
                reasonable technical and organizational procedures to safeguard
                the information and Personal Information we collect on the
                Sites.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                How We Protect Personal Information
              </div>
              <p>
                Purple PRN maintains administrative, technical and physical
                safeguards designed to protect the user’s Personal Information
                and other information against accidental, unlawful or
                unauthorized destruction, loss, alteration, access, disclosure
                or use. For example, we use commercially reasonable security
                measures such as encryption, firewalls, and Secure Socket Layer
                software (SSL) or hypertext transfer protocol secure (HTTPS) to
                protect Personal Information.{" "}
              </p>
              <p>
                Purple PRN collects account information for payment or credit,
                and Purple PRN will use the information only to complete the
                task for which the account information was offered.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">Children</div>
              <p>
                Our website is not intended for children under 18 years of age.
                We do not intentionally gather Personal information about
                visitors who are under the age of 18. If a child has provided us
                with Personal Information, a parent or guardian of that child
                may contact us to have the information deleted from our records.
                If you believe that we might have any information from a child
                under age 18 in the applicable jurisdiction, please contact us{" "}
                <a href="mailto:contact@PurplePRN.com ">
                  contact@PurplePRN.com{" "}
                </a>
                . If we learn that we have inadvertently collected the personal
                information of a child under 18, or equivalent minimum age
                depending on jurisdiction, we will take steps to delete the
                information as soon as possible.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Direct Marketing and “Do Not Track” Signals
              </div>
              <p>
                Purple PRN does not track its users over time and across third
                party websites to provide targeted advertising and therefore
                does not respond to Do Not Track (DNT) signals. However, some
                third party sites do keep track of your browsing activities when
                they serve you content, which enables them to tailor what they
                present to you. If you are visiting such sites, your browser may
                include controls to block and delete cookies, web beacons and
                similar technologies, to allow you to opt out of data collection
                through those technologies.
              </p>
              <p>
                California residents are entitled to contact us to request
                information about whether we have disclosed Personal Information
                to third parties for the third parties’ direct marketing
                purposes. Under the California “Shine the Light” law, California
                residents may opt-out of our disclosure of Personal Information
                to third parties for their direct marketing purposes. You may
                choose to opt- out of the sharing of your Personal Information
                with third parties for marketing purposes at any time by
                submitting a request to{" "}
                <a href="mailto:contact@PurplePRN.com ">
                  contact@PurplePRN.com{" "}
                </a>
                . California users may request further information about our
                compliance with this law by contacting us at{" "}
                <a href="mailto:contact@PurplePRN.com ">
                  contact@PurplePRN.com{" "}
                </a>{" "}
                or by writing to us at the address listed in the “How to Contact
                Us” section.
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">
                Changes to this Privacy Policy
              </div>
              <p>
                Our Privacy Policy may change from time to time. We will not
                reduce your rights under this Privacy Policy without your
                explicit consent. We will post any privacy policy changes on
                this page and, if the changes are significant, we will provide a
                more prominent notice (including, for certain services or
                programs, email notification or privacy policy changes). We will
                also keep prior versions of this Privacy Policy in an archive
                for your review.{" "}
              </p>
            </div>

            <div className="privacycontentbox">
              <div className="privacy-subtitle">How to Contact Us</div>
              <p>
                If you have any specific questions about this Privacy Policy,
                you can contact us via email or phone or by writing to us at the
                address below: Send e-mail to:{" "}
                <a href="mailto:contact@PurplePRN.com">contact@PurplePRN.com</a>
                Send mail to our address: Purple PRN Attn: Privacy Policy
                Inquiry 62950 Unity Dr #571112 Houston, TX 77057, U.S.A.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
