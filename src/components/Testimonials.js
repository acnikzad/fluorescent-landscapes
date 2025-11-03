import React, { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "George J.",
      location: "Mar 2025",
      rating: 5,
      text: "Amazing job. Chris Herendeen and his stellar team removed a 30 year old ungrounded doughboy pool, filled it in and did a reset of my backyard with trees, plants, sod, irrigation, new patio and concrete paths. Chris understood what I was looking for, drew up plans, 3D demo video and detail invoice! I am impressed with Chris's professionalism and amazing team. He exceeded my expectations. I highly recommend Landscape America!!!",
      project: "Landscape Yard or Garden Installation",
      readMoreUrl: "https://www.angi.com/companylist/us/ca/galt/landscape-america-reviews-1.htm#reviews-section"
    },
    {
      id: 2,
      name: "Rohan S.",
      location: "Nov 2024",
      rating: 5,
      text: "Landscape America were really good in their work. Timely completion of the job and with great quality. Throughout the process of working on our backyard, the communication was great, they were quickly able to incorporate our feedback and provided us their guidance whenever we asked. Overall a big thumbs up!!",
      project: "Landscape Yard or Garden Installation",
      readMoreUrl: "https://www.angi.com/companylist/us/ca/galt/landscape-america-reviews-1.htm#reviews-section"
    },
    {
      id: 3,
      name: "Phyllis M.",
      location: "Sep 2024",
      rating: 5,
      text: "We hired them twice. First time at the house we are selling, and at the new house. Chris & Jorge are great project managers. Easy to work with, flexible, knowledgeable. Their workers worked very hard, were helpful & friendly. Project was done on time! We highly recommend these landscapers!!! We are very happy with our new landscaped yards.",
      project: "Landscape Yard or Garden Installation",
      readMoreUrl: "https://www.angi.com/companylist/us/ca/galt/landscape-america-reviews-1.htm#reviews-section"
    },
    {
      id: 4,
      name: "Sharif A.",
      location: "Apr 2022",
      rating: 5,
      text: "Was looking for a landscaper for my backyard and I brought out 4 different landscapers to look at my yard. Chris and his team immediately stood out from the rest of the pack. He immediately gave me the best quote, put a design together that my wife and I loved! His team then came over and started to break ground on my backyard and the team was amazing through out the process!",
      project: "Landscape Yard or Garden Installation",
      readMoreUrl: "https://www.angi.com/companylist/us/ca/galt/landscape-america-reviews-1.htm#reviews-section"
    },
    {
      id: 5,
      name: "Terri A.",
      location: "Nov 2021",
      rating: 5,
      text: "Want to meet your neighbors? Hire Chris and staff to take care of your landscaping needs. Literally seconds after my front yard project was completed, a neighbor passed by and stopped to compliment how nice everything looked. The job was done efficiently, neatly and with care. Chris was patient and assistive with my indecisiveness as to both design and plant selection and provided knowledgeable consultation.",
      project: "Landscape Yard or Garden Installation",
      readMoreUrl: "https://www.angi.com/companylist/us/ca/galt/landscape-america-reviews-1.htm#reviews-section"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Fluorescent Landscapes.
          </p>
        </div>

        <div className="testimonials-showcase">
          {/* Main Testimonial Display */}
          <div className="testimonial-main">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                
                <blockquote className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentTestimonial].name}</h4>
                    <p className="author-location">{testimonials[currentTestimonial].location}</p>
                    <p className="project-type">{testimonials[currentTestimonial].project}</p>
                    <a 
                      href={testimonials[currentTestimonial].readMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more-link"
                    >
                      Read More Reviews →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="testimonial-controls">
              <button 
                className="testimonial-nav testimonial-nav-prev" 
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              
              <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="testimonial-nav testimonial-nav-next" 
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial Stats */}
          <div className="testimonial-stats">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5.0</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Referral Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
