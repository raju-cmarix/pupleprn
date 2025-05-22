import { STRIPE } from "constants/AppConstants";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import "./faq.scss";

function Faq() {
  window.dataLayer.push({
    event: "pageview",
    page: {
      title: "FAQ",
      url: window.location.href,
      path: window.location.pathname,
    },
  });

  const [open, setOpen] = useState("");
  const toggle = (id) => {
    const action = open === id ? "Collapse" : "Expand";
    window.dataLayer.push({
      event: "accordionToggle",
      eventProps: {
        category: "FAQ Interaction",
        action: action,
        label: `FAQ Item ${id}`,
      },
    });
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <>
      <Helmet>
        <title>Purple PRN - FAQ</title>
      </Helmet>
      <div className="faq-section">
        <div className="custom-container">
          <div className="title">
            <h1>FAQs</h1>
          </div>
          <p className="faq-des">
            Here are some Purple PRN frequently asked questions
          </p>

          <h3>General FAQ</h3>
          <div className="faq-accordian">
            <Accordion
              flush
              open={open}
              toggle={toggle}>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  What is Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <p>
                    Our goal is to connect quality allied health professionals
                    (PT, PTA, OT, OTA, SLP) with facilities by providing a brand
                    new online therapist staffing platform. Through our website
                    and eventual mobile application, Purple PRN enables
                    facilities to fulfill short-term personnel needs in real
                    time, while allowing high-quality professionals to secure
                    freelance work at the click of a button. Both sides provide
                    information on service types, skills and preferences,
                    ensuring full transparency and the best matching.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="2">
                  Why was Purple PRN created?
                </AccordionHeader>
                <AccordionBody accordionId="2">
                  <p>
                    We created Purple PRN because we saw a huge need in the
                    therapy industry for facilities and therapy professionals to
                    better connect with each other while also becoming more
                    empowered as professionals. We believe that our platform
                    will help to generate additional income for therapists as
                    well as additional revenue for the facilities.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="3">
                  Where is Purple PRN available?
                </AccordionHeader>
                <AccordionBody accordionId="3">
                  <p>
                    Currently, Purple PRN is fulfilling shifts throughout Texas,
                    Arizona, and Florida. We're launching in Chicago,
                    Philadelphia, and Atlanta in early 2025.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="5">
                  How much does it cost to sign up? Is there a monthly user fee?
                </AccordionHeader>
                <AccordionBody accordionId="5">
                  <p>
                    There is no fee to sign up, Purple PRN is FREE for anyone to
                    join. We don’t charge monthly or membership fees, just use
                    the platform when you need it.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="6">
                  Does Purple PRN have a mobile app?
                </AccordionHeader>
                <AccordionBody accordionId="6">
                  <p>
                    Yes we do! Go here to download it:{" "}
                    <Link
                      to="https://play.google.com/store/apps/details?id=com.purpleprn.android"
                      target="_blank"
                      className="underline-colored">
                      Android
                    </Link>{" "}
                    &{" "}
                    <Link
                      to="https://apps.apple.com/us/app/purple-prn/id6736521551"
                      target="_blank"
                      className="underline-colored">
                      iOS
                    </Link>
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="7">
                  Will the visits be paid for by insurance?
                </AccordionHeader>
                <AccordionBody accordionId="7">
                  <p>
                    It depends on your clinical setting and insurance contracts.
                  </p>
                </AccordionBody>
              </AccordionItem>

              <h3>Clinicians</h3>
              <AccordionItem>
                <AccordionHeader targetId="8">
                  Why should I use Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="8">
                  <p>
                    Purple PRN allows you to take control of your schedule,
                    providing you with the opportunity for flexible work hours.
                    Our simple website paired with a variety of shift
                    opportunities allow you to work where you want, when you
                    want. Our website enables you to sort shifts by distance,
                    hourly rate, and skills required.
                  </p>
                  <p>
                    Purple PRN also aims to provide full transparency to the
                    facility to ensure better matching. clinicians and
                    facilities have profiles that provide key information and
                    professional visibility, along with user-submitted ratings.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="9">
                  How do I use Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="9">
                  <p>
                    As a clinician, you can follow easy steps to register on our
                    platform. Once you start the process the site will walk you
                    through the rest. Use the contact form for any questions
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="10">
                  Why do I need to be approved?
                </AccordionHeader>
                <AccordionBody accordionId="10">
                  <p>
                    Purple PRN aims to ensure quality clinicians are on the
                    platform, and we take pride in knowing the clinicians who
                    will be representing Purple PRN. So we want to hear from you
                    before we approve your profile. We also have to ensure that
                    you’re licensed to practice!
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="11">
                  When will I be approved?
                </AccordionHeader>
                <AccordionBody accordionId="11">
                  <p>
                    Once you complete your registration you’re ready to book a
                    time on our company Calendly for an interview. If you do not
                    hear from us, please don’t hesitate to reach out to{" "}
                    <a href="mailto:contact@PurplePRN.com">
                      contact@PurplePRN.com
                    </a>
                    .
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="12">
                  Why do I need to provide my license?
                </AccordionHeader>
                <AccordionBody accordionId="12">
                  <p>
                    As part of the onboarding process, we need to validate that
                    your license(s) is valid in the state(s) where you will be
                    working.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="13">
                  How do I get paid with Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="13">
                  <p>
                    We’ve set up Purple PRN so that you can be paid out fast!
                    You can set up your bank account via {STRIPE} when you book
                    your first shift. Payouts are sent on Friday.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="14">
                  Do I need to work a certain number of shifts to stay active?
                </AccordionHeader>
                <AccordionBody accordionId="14">
                  <p>
                    No, you are welcome to complete one shift or as many as you
                    want–it’s up to you!
                  </p>
                </AccordionBody>
              </AccordionItem>
              {/* <AccordionItem>
                                <AccordionHeader targetId="15">I’m a recent clinicians grad and prefer to have another clinician onsite, is this
                                    possible?</AccordionHeader>
                                <AccordionBody accordionId="15">
                                    <p>
                                        Yes, in the Purple PRN shift details, you have the ability to see if another
                                        doctor will be available during the shift, ensuring that you will not be the
                                        only clinician on site.
                                    </p>
                                </AccordionBody>
                            </AccordionItem> */}
              <AccordionItem>
                <AccordionHeader targetId="16">
                  Is there anything I need to do right before my shift?
                </AccordionHeader>
                <AccordionBody accordionId="16">
                  <p>
                    Prior to your shift, you should get an email from us
                    regarding the details of your day. You will also receive an
                    onboarding form that outlines best practices to ensure you
                    have a successful shift!
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="17">
                  What do I do if I have questions or concerns before, during,
                  or after a shift?
                </AccordionHeader>
                <AccordionBody accordionId="17">
                  <p>
                    Contact Purple PRN at any time. Here are the ways to contact
                    us:
                  </p>
                  <p>
                    Email:{" "}
                    <a href="mailto:contact@PurplePRN.com">
                      contact@PurplePRN.com
                    </a>
                  </p>
                  <p>
                    Call: <a href="tel:832-800-3437"> 832-800-3437</a>
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="18">
                  What if the hours worked are different from the original
                  booking?
                </AccordionHeader>
                <AccordionBody accordionId="18">
                  <p>
                    The clinician fills out a digital timecard and the hours on
                    it are used to calculate the total time paid.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="19">
                  What does it cost to use Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="19">
                  <p>
                    Some clinicians incur a small platform service fee only
                    after working a shift, which helps us streamline booking and
                    administrative tasks like scheduling and billing. It also
                    allows us to provide robust customer service, platform
                    improvements, and the highest levels of data security and
                    confidentiality, complying with healthcare regulations.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="20">
                  Is my personal information easily viewed by anyone?
                </AccordionHeader>
                <AccordionBody accordionId="20">
                  <p>
                    Nope. Your personal information is blacked-out and only
                    viewable by facilities that have booked you.
                  </p>
                </AccordionBody>
              </AccordionItem>

              <h3>Facilities</h3>
              <AccordionItem>
                <AccordionHeader targetId="21">
                  Why should I use Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="21">
                  <p>
                    Purple PRN has introduced an easy way for you to be able to
                    find PRN, part- time, or full-time coverage fast . Our
                    platform allows you to set up a facility profile, easily add
                    shifts, and quickly confirm clinicians to fill your staffing
                    needs.
                  </p>
                  <p>
                    Purple PRN aims to staff dependable, quality, compassionate
                    clinicians who will provide exceptional service to your
                    patients and contribute to the patient-facility bond. We
                    strive to make each and every shift a success.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="22">
                  Why would a clinic need Purple PRN if they already have a
                  floater pool?
                </AccordionHeader>
                <AccordionBody accordionId="22">
                  <p>
                    Sometimes your floaters or PRNs are already busy when you
                    need them. Purple PRN offers a backup solution in these
                    cases.
                  </p>
                  <p>
                    Purple PRN may also be used to grow your business during
                    busy times, to flex-up to meet cyclical increases in demand,
                    or to cover expected leave of absence such as parental
                    leave, allowing your floaters/PRNs to continue to be
                    available for your unplanned PTO needs.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="23">
                  How do I use Purple PRN?
                </AccordionHeader>
                <AccordionBody accordionId="23">
                  <p>
                    Facility users create a free profile before scheduling a
                    one-on-one interview with our onboarding team. Once your
                    account is approved, you can begin posting shifts and
                    confirming the clinicians who apply to them.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="24">
                  How does the billing work?
                </AccordionHeader>
                <AccordionBody accordionId="24">
                  <p>
                    There is no cost to join or post shifts with Purple PRN.
                    There are no charges for anything until confirming a
                    therapist for a shift.
                  </p>
                  <p>
                    There are several payment options: credit card, debit card,
                    bank account/ACH withdrawal, and manual invoicing. You can
                    add your banking information using {STRIPE} when you
                    register your account.
                  </p>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. Manual invoicing will
                    require payment according to your business agreement.{" "}
                  </p>
                  <p>
                    You can access a pdf copy of each invoice in your facility
                    account at any time for accurate bookkeeping. You can also
                    update your payment method at any time, and we are always
                    willing to work with our facilities to create a method that
                    works for you.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="25">
                  What if I need to change or remove a shift?
                </AccordionHeader>
                <AccordionBody accordionId="25">
                  <p>
                    If there has been no confirmation of a clinicians, then you
                    may change or remove your shift at any time. Once a
                    clinicians confirms a shift, you must contact Purple PRN to
                    modify or remove{" "}
                    <a href="mailto:contact@PurplePRN.com">
                      (contact@PurplePRN.com
                    </a>{" "}
                    or <a href="tel:(832)800-3437">(832)800-3437)</a>.
                  </p>
                </AccordionBody>
              </AccordionItem>
              {/* <AccordionItem>
                <AccordionHeader targetId="26">
                  Are there any fees or penalties I should know about?
                </AccordionHeader>
                <AccordionBody accordionId="26">
                  <p>
                    If you decide to remove or cancel a shift after a clinician
                    has been confirmed, then you are subject to our cancellation
                    policy which can be found in your business agreement. The
                    closer the shift is, the higher the penalty. In addition,
                    repeated removal of requested or confirmed shifts can result
                    in a lowering of your facility rating.
                  </p>
                  <p>
                    Make sure your clinic is only posting shifts that you know
                    need to be filled in order to avoid repeated cancellations
                    for confirmed therapists. Please contact Purple PRN directly
                    in the event of an emergency or special circumstance.
                  </p>
                  <p>
                    The fee to the facility for booking a clinician is written
                    in your business contract.
                  </p>
                </AccordionBody>
              </AccordionItem> */}
              <AccordionItem>
                <AccordionHeader targetId="27">
                  Are there minimum hours for a shift?
                </AccordionHeader>
                <AccordionBody accordionId="27">
                  <p>
                    Facilities agree to pay a minimum of four (4) hours per
                    clinician per day per location.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="28">
                  Can I alter the shift after a clinician has confirmed?
                </AccordionHeader>
                <AccordionBody accordionId="28">
                  <p>
                    If a facility needs to change the duration or type of shift
                    after a therapist has been confirmed for that shift, the
                    facility may be subject to cancellation fees depending on
                    the availability of said therapist and at the discretion of
                    Purple PRN. Please contact Purple PRN directly if you need
                    to adjust a shift.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="29">
                  What if I want to hire a clinician full-time at my facility?
                </AccordionHeader>
                <AccordionBody accordionId="29">
                  <p>
                    We welcome the opportunity for Purple PRN clinicians to
                    transition to full-time placements at facilities. You will
                    just need to notify Purple PRN and pay a placement fee as
                    stated in your business agreement for this service.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="30">
                  What if the clinician isn’t a good fit for my facility?
                </AccordionHeader>
                <AccordionBody accordionId="30">
                  <p>
                    You are under no obligation to confirm a clinician who
                    applies to a shift at your facility. If they have never
                    worked with you before, you can view each user’s profile as
                    well as their reviews from other facilities before you
                    decide to confirm them. If there is a problem during the
                    shift, please call or email us.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="31">
                  What is my facility responsible for when a Purple PRN
                  therapist visits?
                </AccordionHeader>
                <AccordionBody accordionId="31">
                  <p>
                    To ensure each Purple PRN shift is a success, please contact
                    the PRN clinician at least 24 hours before the shift and
                    provide them information about the day’s activities as well
                    as any other relevant facility information. Please have a
                    staff member ready to receive the clinician and show them
                    around before the day begins, as well as provide support
                    throughout the day.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="32">
                  What do I do if we have issues before/during/after a shift?
                </AccordionHeader>
                <AccordionBody accordionId="32">
                  <p>
                    Don’t worry! You may contact Purple PRN at any time, here
                    are the ways to contact us:<br></br>
                    i. Email -{" "}
                    <a href="mailto:contact@PurplePRN.com">
                      contact@PurplePRN.com
                    </a>
                    <br></br>
                    ii. Call – <a href="tel:(832)800-3437">(832)800-3437</a>
                  </p>
                </AccordionBody>
              </AccordionItem>
              {/* <AccordionItem>
                <AccordionHeader targetId="33">
                  What if the hours worked are different from the original
                  booking?
                </AccordionHeader>
                <AccordionBody accordionId="33">
                  <p>
                    The clinician and the clinic receive a timesheet for the
                    clinician to fill out. Once it’s filled out, the clinic
                    contact signs the form. The hours on this form are used to
                    calculate the total. If the hours are more than the booking,
                    the clinic is billed for the difference. If the hours are
                    fewer due to a clinician issue, the facility will receive a
                    refund. If the hours are fewer due to a facility issue, the
                    facility will still be billed for the original booking
                    amount.
                  </p>
                </AccordionBody>
              </AccordionItem> */}
              {/* <AccordionItem>
                <AccordionHeader targetId="34">
                  What if I want to hire the clinicians full-time at my
                  facility?
                </AccordionHeader>
                <AccordionBody accordionId="34">
                  <p>
                    We welcome the opportunity for Purple PRN clinicians to
                    transition to full- time placements at facilities. You will
                    just need to notify Purple PRN and pay a placement fee for
                    this referral service. It is ESSENTIAL that you work with
                    Purple PRN on reporting this placement, as you are subject
                    to our terms & conditions and potential penalty fees &
                    Purple PRN account deactivation should you not follow the
                    rules. We also have data on facility usage to monitor any
                    activities that may flag for any potential PRN to full-time
                    transition
                  </p>
                </AccordionBody>
              </AccordionItem> */}
              <h3>1099 FAQ</h3>
              <AccordionItem>
                <AccordionHeader targetId="35">
                  What does it mean to be a 1099?
                </AccordionHeader>
                <AccordionBody accordionId="35">
                  <p>
                    A 1099 contractor, often referred to simply as a "1099
                    worker" or "independent contractor," is a type of worker
                    classification used in the United States
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="36">
                  What are the key characteristics of being a 1099 contractor
                </AccordionHeader>
                <AccordionBody accordionId="36">
                  <p>
                    They are not considered employees of the client or employer
                    but rather work independently.
                  </p>
                  <p>
                    1099 contractors are allowed to deduct certain expenses from
                    their tax liability.
                  </p>
                  <p>
                    1099 contractors typically have more control over how they
                    perform their tasks.
                  </p>
                  <p>
                    Unlike employees, 1099 contractors do not have income taxes
                    withheld from their paychecks. Instead, they are responsible
                    for paying income taxes directly to the IRS.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="37">
                  What are the tax benefits to being 1099
                </AccordionHeader>
                <AccordionBody accordionId="37">
                  <p>
                    <span className="fw-bold">
                      Self-Employment Tax Deduction:
                    </span>{" "}
                    While traditional employees pay Social Security and Medicare
                    taxes (FICA taxes), self-employed individuals pay the
                    equivalent of these taxes through self-employment tax.
                    However, you can deduct the employer-equivalent portion of
                    your self-employment tax on your income tax return.
                  </p>
                  <p>
                    <span className="fw-bold">Health Insurance Premiums:</span>{" "}
                    If you pay for your own health insurance as a self-employed
                    person, you may be eligible to deduct the cost of your
                    health insurance premiums on your tax return.
                  </p>
                  <p>
                    <span className="fw-bold">
                      Retirement Plan Contributions:
                    </span>{" "}
                    Self-employed individuals have various retirement plan
                    options, such as a Simplified Employee Pension (SEP) IRA or
                    a Solo 401(k). Contributions to these retirement plans are
                    tax-deductible and can help you save for the future while
                    reducing your taxable income.
                  </p>
                  <p>
                    <span className="fw-bold">Business Mileage Deduction:</span>{" "}
                    If you use your personal vehicle for business purposes, you
                    can deduct the mileage driven for work-related trips. Be
                    sure to keep accurate records of your mileage.
                  </p>
                  <p>
                    <span className="fw-bold">Meals and Entertainment:</span>{" "}
                    You can deduct a percentage of your business-related meals
                    and entertainment expenses, as long as they are directly
                    related to your business.
                  </p>
                  <p>
                    <span className="fw-bold">
                      Education and Training Costs:
                    </span>{" "}
                    Expenses related to improving your skills and knowledge for
                    your self-employed work can be deductible. This includes
                    courses, seminars, and relevant books or materials.
                  </p>
                  <p>
                    <span className="fw-bold">Tax Preparation Fees:</span> Fees
                    paid to tax professionals or for tax software to help you
                    with your self-employed taxes can also be deductible.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="38">
                  Can I have my own PLLC as a Physical Therapist as a 1099
                </AccordionHeader>
                <AccordionBody accordionId="38">
                  <p>
                    It is possible for a physical therapist working as a 1099
                    contractor to have their own Professional Limited Liability
                    Company (PLLC).
                  </p>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionHeader targetId="39">
                  Where can I learn more about being 1099?
                </AccordionHeader>
                <AccordionBody accordionId="39">
                  <p>
                    IRS Website: The Internal Revenue Service (IRS) website
                    offers comprehensive information about self-employment
                    taxes, deductions, and reporting requirements.
                  </p>
                  <p>
                    Small Business Administration (SBA): The SBA provides
                    resources and guides for small business owners and
                    self-employed individuals.
                  </p>
                  <p>
                    Freelancer and Contractor Forums: Online communities like
                    Freelancer Union and Reddit's r/freelance are great places
                    to ask questions and learn from experienced freelancers and
                    contractors.
                  </p>
                </AccordionBody>
              </AccordionItem>
              <p className="mt-2">
                <span className="fw-bold">Disclaimer:</span> It's important to
                note that tax laws and regulations can change, so it's advisable
                to consult with a tax professional or use tax software to ensure
                you're taking advantage of all available deductions and benefits
                specific to your situation. Additionally, keeping thorough
                records of your income and expenses is crucial for accurately
                claiming these deductions on your tax return.
              </p>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
