import React from "react";
import './about.scss'
import leader1 from '../../assets/images/leader1.png'
import leader2 from '../../assets/images/leader2.png'
import leader3 from '../../assets/images/leader3.png'

function OurLeadership() {
    return (
        <>
            <div className="our-leadership">
                <div className="custom-container">
                    <h2>Our Leadership <span>Team</span></h2>
                    <div className="our-leadership-content mb-5">
                        <div className="our-leadership-img" style={{width:"375px", textAlign:'center'}}>
                            <img src={leader1} alt={'leader 1'} height={"300"} />
                        </div>
                        <div className="our-leadership-text px-4">
                            <p className="text-center m-0 mb-1 fw-bold">Hi, I’m Marcy Arenas, Director of Operations at Purple PRN.</p>
                            <p>I grew up just outside Washington DC, in Fairfax County, Virginia, and graduated from Virginia Tech in 2010- Go Hokies! I then ventured west of the Mississippi for the first time,  going to Physical Therapy school at Washington University in St. Louis. I graduated, in 2014, with my Doctorate in Physical Therapy. During my last semester, it snowed, a lot, and it was then I decided to move south! I had never even visited Texas before, when I moved to Houston, in October of 2014.  </p>
                            <p>For the past decade, I worked at a pediatric speciality hospital, rotating between inpatient rehab and outpatient care. During and after COVID, as a therapist, I saw the improvements other disciplines were getting in work-life balance and pay differentials. In 2021, I took on a new role as rehab manager, which opened my eyes to the challenges faced by both clinicians and facilities in filling staffing gaps. Joining Purple PRN felt like the perfect fit for me because their mission aligns with my passion for advancing the rehab profession. I’m excited to bring my experience and enthusiasm to the team and improve both facilities and clinicians experience with staffing. </p>
                            <p>Outside of work, my world revolves around my family. My husband, Aaron, is a Houston-based trial attorney, and we have two adorable kids, Emma and Benjamin. When I’m not juggling work and family time, you can catch me kickboxing at 9 Round or curled up on the couch with a pint of ice cream and my first baby (dog), Zero.</p>
                        </div>
                    </div>
                    <div className="our-leadership-content mb-5">
                        <div className="our-leadership-img" style={{width:"375px", textAlign:'center'}}>
                            <img src={leader2} alt={'leader 2'} height={"300"} />
                        </div>
                        <div className="our-leadership-text px-4">
                        <p className="text-center m-0 mb-1 fw-bold">Hi, I'm Andrew Heidebrecht, Founder and CEO of Purple PRN.</p>
                            <p>If you're wondering about the person behind the business, well, that's me—I'm an engineering nerd turned physical therapist, all wrapped up in one. My journey started at UT in Austin, Texas, where I dove into Mechanical Engineering, only to find myself later captivated by Physical Therapy (which is basically mechanical engineering for the body) at Texas Woman’s University in Houston.</p>
                            <p>As a Clinic Director for 5 years,  a lightbulb went off and I thought of the idea for Purple PRN. It came from seeing how inefficient and backwards PRN and part-time staffing was and thinking, "There has to be a better way." With a background that spans engineering projects to clinical leadership, I've always been driven by the challenge of making things work better, whether it's a piece of machinery or a healthcare system.</p>
                            <p>At Purple PRN, our goal is simple: connect therapists with shifts/jobs that deserve their talent and dedication. We're here to streamline the staffing process, making it more transparent, efficient, and, most importantly, human.  I'm thrilled you're here and look forward to making healthcare staffing a little bit easier for everyone involved.  Whether you're a professional seeking your next opportunity or a healthcare facility in need of skilled staff, I'm here to ensure that your experience with Purple PRN is seamless and satisfactory.</p>
                            <p>When I'm not busy with Purple PRN, you’ll find me engaging in Brazilian Jiu-Jitsu and boxing—my go-to for staying grounded and focused.</p>
                            <p>P.S. If you're curious about the meaning behind Purple PRN, it reflects 3 things. One, it sticks in your head like a tasty 80's jam. It’s memorable and unique but not stupid.  Two, it describes the color of my face when dealing with traditional staffing agencies. Third, and most important, it makes choosing what to wear easy. Navigate our closets blindfolded? Yes pls.</p>
                        </div>
                    </div>
                    <div className="our-leadership-content">
                        <div className="our-leadership-img" style={{width:"375px", textAlign:'center'}}>
                            <img src={leader3} alt={'leader 3'}  height={"200"}/>
                        </div>
                        <div className="our-leadership-text px-4">
                        <p className="text-center m-0 mb-1 fw-bold">Chief Toddler Officer</p>
                            <p>What do I bring to the table? A relentless barrage of "why?" a fearless attitude towards coloring outside the lines, and a strategic mindset honed through outnegotiating my parents.  As a Snack Inspector (Level 1) and Director of Fun she specializes in rigorous quality control of applesauce and yogurt.  Finally, she was instrumental in introducing the team to concepts like nap-based productivity and expanding our company's operations into the lucrative realm of imaginary friends.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurLeadership;
