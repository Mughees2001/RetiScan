import React from 'react';

const TestimonialCarousel = () => {
  return (
    <section id="testimonials">
      <div id="testimonial-carousel" className="carousel slide" data-bs-ride="false">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2 className="testimonial-text">Clear Vision, Collective Insight, Collaborative Efforts.</h2>

          </div>
          <div className="carousel-item">
            <h2 className="testimonial-text">Enhanced Analysis and Integrated Solutions for Retinal Segmentation</h2>

          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonial-carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
