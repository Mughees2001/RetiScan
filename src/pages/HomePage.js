import React from 'react';
import Slider from '../components/slider';
function HomePage() {

  return (
    <div className="hero_area">

<Slider/>

      
  <section class="department_section layout_padding">
    <div class="department_container">
      <div>
        <div class="heading_container heading_center">
          <h2>
            Our Services
          </h2>
          <p>
            Experience the ultimate privacy and retinal analysis through RetiScan.
          </p>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="box ">
              <div class="img-box">
                <img src="images/s1.png" alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Retinal Mapping
                </h5>
                <p>
                  Get precise retinal mapping of images.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box ">
              <div class="img-box">
                <img src="images/s2.png" alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Advice from Experts
                </h5>
                <p>
                  Chat with an expert
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box ">
              <div class="img-box">
                <img src="images/s3.png" alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Datasets for Research
                </h5>
                <p>
                  Get newest realesed datasets.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box ">
              <div class="img-box">
                <img src="images/s4.png" alt=""/>
              </div>
              <div class="detail-box">
                <h5>
                  Secure Data
                </h5>
                <p>
                  Your data, your choice. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Documentation Section */}
<section className="documentation_section ">
    <div className="heading_container heading_center">
      <h2>How It Works?</h2>
      <p>Discover the technology behind our Retinal Vessel Segmentation Framework</p>
    </div>
    <div className="row align-items-center py-5">
      <div className="col-md-6">
        <div className="img-box">
          <img src="images\fd4.jpg" alt="Framework Overview" className="img-fluid"/>
        </div>
      </div>
      <div className="col-md-6">
        <h3 style={{ fontSize: '2rem' }}>Framework Overview </h3>
        <p>Our framework leverages this innovative approach, wherein multiple clients—such as healthcare providers or research institutions—collaborate to improve a central machine learning model while maintaining the confidentiality and integrity of their data. Each participant contributes by training the model on their local dataset and only sharing their model's weights (denoted as θ weight) with a central server.

            <br></br><br></br>The server plays a pivotal role as the aggregator, combining the weights received from all clients to enhance the global model. This aggregation process respects the privacy of each client's. Once the model weights are aggregated, they are distributed back to the clients in an updated form (θ' weight), ensuring that all participants benefit from the collective learning experience.</p>
      </div>
    </div>
    <div className="row align-items-center mt-5">
      <div className="col-md-6 order-md-2">
        <div className="img-box">
          <img src="images\fd1.jpg" alt="Technology Details" className="img-fluid"/>
        </div>
      </div>
      <div className="col-md-6 order-md-1">
        <h3>Training Interface</h3>
        <p>Download our training software from <a href="https://drive.google.com/your-shareable-link" target="_blank" rel="noopener noreferrer">here</a>. <br></br>  <br></br> Our Training Interface offers a streamlined dashboard for efficient training process with all necessary tools for training.

            The progress of your model's learning is visually represented through an intuitive graph that tracks and displays the loss metrics for both training and validation phases, allowing you to monitor the model's performance in real-time. <br></br><br></br>

            The interface allows you to customize the training parameters to suit your requirements, including the number of epochs, learning rate, and batch size. This personalized approach ensures that you can optimize the model's learning curve for peak performance. With our software, you have the power to harness advanced machine learning techniques for retinal image analysis, ensuring that your research or clinical applications are built on reliable segmentation models.
        </p>

      </div>
    </div>

    <div className="row align-items-center mt-1">
    <div className="container">
    <div className="col-12 col-md-8 offset-md-2 form_container">
      <div className="heading_container heading_center mt-5">
        <h2>Upload Your Model</h2>
        <p>Enter your organization's details and upload your model's .pth file</p>
      </div>
      <form className="modern_form mt-3">
        <div className="form-group">
          <input type="text" className="form-control modern_input" placeholder="Organization Name" required />
        </div>
        <div className="form-group mt-3">
          <input type="text" className="form-control modern_input" placeholder="Access Key" required />
        </div>
        <div className="form-group file-upload-wrapper d-flex justify-content-center mt-4">
          <input type="file" id="file-upload" className="file-upload-input" required />
          <label htmlFor="file-upload" className="file-upload-label">
            Choose File
          </label>
        </div>
        <div className="button_container text-center mt-4">
          <button type="submit" className="btn send_button">Send</button>
        </div>
      </form>
    </div>
  </div>
    <div className="col-md-6 order-md-2">
        <h3>Share Model Insights</h3>
        <p>After training your model and encapsulating the intricate learnings into a .pth file, we invite you to submit your organization's name, access key, and the trained model's .pth file through our secure portal, to participate in a grander scheme of technological synergy. It allows us to integrate diverse learnings from various organizations, enhancing the accuracy of the central server's aggregate model.<br></br> <br></br> This process is the cornerstone of our commitment to innovation and shared progress in medical image analysis, ensuring that every participating entity contributes to and benefits from a model that is continually learning and evolving.

        </p>
        <h3 >Download Latest Version of Our Model</h3>
        <p>You can download the latest version of our aggregate model securely through the button below. So, start treating your patients with accuracy and security today!</p>
        <div className="text-center mt-3">
    <button type="button" className="btn download_button mt-3">Download Model</button>
  </div>

      </div>
  </div>
  
 
</section>


{/* Contact Section */}
<section className="contact_section bg-light py-5">
<div className="text-center ">
          <h2 style={{ fontSize: '2rem' }}>Contact Us Now </h2>
        </div>
        <div className="card" style={{ width: '100%', maxWidth: '600px', margin: 'auto', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <form action="">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Phone Number" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Message" rows="5"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                SEND
              </button>
            </div>
          </form>
        </div>
        </section>

      <footer class="footer_section">
    <div>
      <div class="row">
        <div class="col-md-6 col-lg-3 footer_col">
          <div class="footer_contact">
            <h4>
              Reach at..
            </h4>
            <div class="contact_link_box">
              <a href="">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span>
                  Location
                </span>
              </a>
              <a href="">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span>
                  Call +92 1234567890
                </span>
              </a>
              <a href="">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span>
                  demo@gmail.com
                </span>
              </a>
            </div>
          </div>
          <div class="footer_social">
            <a href="">
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="">
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 footer_col">
          <div class="footer_detail">
            <h4>
              About
            </h4>
            <p>
              Beatae provident nobis mollitia magnam voluptatum, unde dicta facilis minima veniam corporis laudantium alias tenetur eveniet illum reprehenderit fugit a delectus officiis blanditiis ea.
            </p>
          </div>
        </div>
        <div class="col-md-6 col-lg-2 mx-auto footer_col">
          <div class="footer_link_box">
            <h4>
              Links
            </h4>
            <div class="footer_links">
              <a class="active" href="index.html">
                Home
              </a>
              <a class="" href="about.html">
                About
              </a>
              <a class="" href="departments.html">
                Departments
              </a>
              <a class="" href="doctors.html">
                Doctors
              </a>
              <a class="" href="contact.html">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3 footer_col ">
          <h4>
            Newsletter
          </h4>
        </div>
      </div>
    </div>
  </footer>
    </div>
  );
}

export default HomePage;

