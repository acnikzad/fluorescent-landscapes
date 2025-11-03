import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';
import plantLogo from '../photos/Fluorecent Landscapes-Plant.png';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [questionnaireData, setQuestionnaireData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    projectAddress: '',
    projectTypes: {
      frontYard: false,
      backyard: false,
      fullProperty: false,
      sideYard: false,
      commercial: false,
      other: false,
      otherSpecify: ''
    },
    scopeOfWork: {
      newLandscaping: false,
      concreteHardscape: false,
      paverPatio: false,
      retainingWalls: false
    },
    services: {
      artificialTurf: false,
      irrigationSystem: false,
      drainageSolutions: false,
      landscapeLighting: false,
      plantingSoftscape: false,
      demolitionRemoval: false,
      gradingDirtWork: false,
      outdoorLiving: false,
      designServicesOnly: false,
      other: false,
      otherSpecify: ''
    },
    budget: '',
    idealStartDate: '',
    projectDeadline: '',
    designVision: '',
    hasReferencePhotos: false,
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    if (!showQuestionnaire && !showMessageModal) return;
    
    const timeoutId = setTimeout(() => {
      const modalSelector = showQuestionnaire 
        ? '.questionnaire-modal' 
        : '.message-modal';
      const modal = document.querySelector(modalSelector);
      if (!modal) return;
      
      const inputs = modal.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
      inputs.forEach(input => {
        if (!input.hasAttribute('data-attributes-set')) {
          input.setAttribute('autocomplete', 'off');
          input.setAttribute('autocorrect', 'off');
          input.setAttribute('autocapitalize', 'off');
          input.setAttribute('spellcheck', 'false');
          input.setAttribute('data-attributes-set', 'true');
        }
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [showQuestionnaire, showMessageModal]);


  const handleQuestionnaireChange = (e) => {
    const { name, type, checked, value } = e.target;
    
    if (type === 'checkbox' || type === 'radio') {
      let newValue;
      
      if (type === 'checkbox') {
        newValue = checked;
      } else {
        if (value === 'true') {
          newValue = true;
        } else if (value === 'false') {
          newValue = false;
        } else {
          newValue = value;
        }
      }
      
      if (name.includes('.')) {
        const [section, field] = name.split('.');
        setQuestionnaireData(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: newValue
          }
        }));
      } else {
        setQuestionnaireData(prev => ({
          ...prev,
          [name]: newValue
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_TEMP,
        e.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        e.target.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuestionnaireSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.target;
      
      const getValue = (name) => {
        const input = form.querySelector(`[name="${name}"]`);
        return input ? input.value : '';
      };
      
      const templateParams = {
        fullName: getValue('fullName'),
        phoneNumber: getValue('phoneNumber'),
        emailAddress: getValue('emailAddress'),
        projectAddress: getValue('projectAddress'),
        selectedProjectTypes: Object.entries(questionnaireData.projectTypes)
          .filter(([key, value]) => value === true && key !== 'other')
          .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
          .join(', '),
        otherProjectType: getValue('projectTypes.otherSpecify') || null,
        selectedScopeOfWork: Object.entries(questionnaireData.scopeOfWork)
          .filter(([key, value]) => value === true)
          .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
          .join(', '),
        selectedServices: Object.entries(questionnaireData.services)
          .filter(([key, value]) => value === true && key !== 'other')
          .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
          .join(', '),
        otherServices: getValue('services.otherSpecify') || null,
        budget: questionnaireData.budget || 'Not specified',
        idealStartDate: getValue('idealStartDate') || 'Not specified',
        projectDeadline: getValue('projectDeadline') || 'Not specified',
        designVision: getValue('designVision') || 'Not specified',
        hasReferencePhotos: questionnaireData.hasReferencePhotos ? 'Yes' : 'No',
        additionalNotes: getValue('additionalNotes') || 'None'
      };

      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE,
        process.env.REACT_APP_EMAILJS_QUESTIONNAIRE_TEMPLATE,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        form.reset();
        setQuestionnaireData({
          fullName: '',
          phoneNumber: '',
          emailAddress: '',
          projectAddress: '',
          projectTypes: {
            frontYard: false,
            backyard: false,
            fullProperty: false,
            sideYard: false,
            commercial: false,
            other: false,
            otherSpecify: ''
          },
          scopeOfWork: {
            newLandscaping: false,
            concreteHardscape: false,
            paverPatio: false,
            retainingWalls: false
          },
          services: {
            artificialTurf: false,
            irrigationSystem: false,
            drainageSolutions: false,
            landscapeLighting: false,
            plantingSoftscape: false,
            demolitionRemoval: false,
            gradingDirtWork: false,
            outdoorLiving: false,
            designServicesOnly: false,
            other: false,
            otherSpecify: ''
          },
          budget: '',
          idealStartDate: '',
          projectDeadline: '',
          designVision: '',
          hasReferencePhotos: false,
          additionalNotes: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to transform your outdoor space? We're here to help bring your vision to life.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>(555) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>info@fluorescentlandscapes.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-details">
                <h3>Address</h3>
                <p>123 Garden Street<br />Landscape City, LC 12345</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="contact-details">
                <h3>Hours</h3>
                <p>Monday - Friday: 8AM - 6PM<br />Saturday: 9AM - 4PM</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <div className="contact-options">
              <div className="contact-option">
                <h3>Have a question? Send us a message!</h3>
                <p>Quick questions or general inquiries? We'd love to hear from you.</p>
                <button 
                  className="btn-contact-option"
                  onClick={() => setShowMessageModal(true)}
                >
                  Send Message
                </button>
              </div>
              
              <div className="contact-option">
                <h3>Want to provide more details about your project?</h3>
                <p>Fill out our detailed form so we can provide you with an accurate quote.</p>
                <button 
                  className="btn-contact-option"
                  onClick={() => setShowQuestionnaire(true)}
                >
                  Fill Out Form
                </button>
              </div>
            </div>
            
            {/* Plant Logo in right column */}
            <div className="contact-logo-right">
              <img src={plantLogo} alt="Fluorescent Landscapes Plant Logo" />
            </div>
          </div>
        </div>
      </div>

      {/* Questionnaire Modal */}
      {showQuestionnaire && (
        <div 
          className="questionnaire-modal-overlay" 
          onClick={() => setShowQuestionnaire(false)}
          onKeyDown={(e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
              return;
            }
          }}
        >
          <div className="questionnaire-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Client Intake Form</h2>
              <button 
                className="modal-close"
                onClick={() => setShowQuestionnaire(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleQuestionnaireSubmit} className="questionnaire-form">
              {/* Contact Information */}
              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name:</label>
                    <input 
                      type="text" 
                      name="fullName"
                      defaultValue=""
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number:</label>
                    <input 
                      type="tel" 
                      name="phoneNumber"
                      defaultValue=""
                      required
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address:</label>
                    <input 
                      type="email" 
                      name="emailAddress"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Address:</label>
                    <input 
                      type="text" 
                      name="projectAddress"
                      defaultValue=""
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Project Type */}
              <div className="form-section">
                <h3>Project Type (Check all that apply)</h3>
                <div className="checkbox-grid">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.frontYard"
                      checked={questionnaireData.projectTypes.frontYard}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Front Yard</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.backyard"
                      checked={questionnaireData.projectTypes.backyard}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Backyard</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.fullProperty"
                      checked={questionnaireData.projectTypes.fullProperty}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Full Property</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.sideYard"
                      checked={questionnaireData.projectTypes.sideYard}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Side Yard</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.commercial"
                      checked={questionnaireData.projectTypes.commercial}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Commercial</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="projectTypes.other"
                      checked={questionnaireData.projectTypes.other}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Other (specify):</span>
                  </label>
                </div>
                {questionnaireData.projectTypes.other && (
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="projectTypes.otherSpecify"
                      placeholder="Please specify other project type"
                      defaultValue=""
                    />
                  </div>
                )}
              </div>

              {/* Scope of Work */}
              <div className="form-section">
                <h3>Scope of Work (Check all that apply)</h3>
                <div className="checkbox-grid">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="scopeOfWork.newLandscaping"
                      checked={questionnaireData.scopeOfWork.newLandscaping}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>New Landscaping Installation</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="scopeOfWork.concreteHardscape"
                      checked={questionnaireData.scopeOfWork.concreteHardscape}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Concrete or Hardscape Work</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="scopeOfWork.paverPatio"
                      checked={questionnaireData.scopeOfWork.paverPatio}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Paver Patio or Walkways</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="scopeOfWork.retainingWalls"
                      checked={questionnaireData.scopeOfWork.retainingWalls}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Retaining Walls</span>
                  </label>
                </div>
              </div>

              {/* Services */}
              <div className="form-section">
                <h3>Services</h3>
                <div className="checkbox-grid">
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.artificialTurf"
                      checked={questionnaireData.services.artificialTurf}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Artificial Turf</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.irrigationSystem"
                      checked={questionnaireData.services.irrigationSystem}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Irrigation System</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.drainageSolutions"
                      checked={questionnaireData.services.drainageSolutions}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Drainage Solutions</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.landscapeLighting"
                      checked={questionnaireData.services.landscapeLighting}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Landscape Lighting</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.plantingSoftscape"
                      checked={questionnaireData.services.plantingSoftscape}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Planting / Softscape</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.demolitionRemoval"
                      checked={questionnaireData.services.demolitionRemoval}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Demolition / Removal</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.gradingDirtWork"
                      checked={questionnaireData.services.gradingDirtWork}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Grading or Dirt Work</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.outdoorLiving"
                      checked={questionnaireData.services.outdoorLiving}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Outdoor Living (firepit, seating area, etc.)</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.designServicesOnly"
                      checked={questionnaireData.services.designServicesOnly}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Design Services Only</span>
                  </label>
                  <label className="checkbox-item">
                    <input 
                      type="checkbox" 
                      name="services.other"
                      checked={questionnaireData.services.other}
                      onChange={handleQuestionnaireChange}
                    />
                    <span>Other (specify):</span>
                  </label>
                </div>
                {questionnaireData.services.other && (
                  <div className="form-group">
                    <input 
                      type="text" 
                      name="services.otherSpecify"
                      placeholder="Please specify other services"
                      defaultValue=""
                    />
                  </div>
                )}
              </div>

              {/* Budget & Timeline */}
              <div className="form-section">
                <h3>Budget & Timeline</h3>
                <div className="form-group">
                  <label>Estimated Budget:</label>
                  <div className="radio-group">
                    {[
                      'Under $10,000',
                      '$10,000-$20,000',
                      '$20,000-$40,000',
                      '$40,000-$60,000',
                      '$60,000-$100,000',
                      'Over $100,000',
                      'Not sure yet'
                    ].map((option, index) => (
                      <label key={index} className="radio-item">
                        <input 
                          type="radio" 
                          name="budget"
                          value={option}
                          checked={questionnaireData.budget === option}
                          onChange={handleQuestionnaireChange}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ideal Start Date:</label>
                    <input 
                      type="date" 
                      name="idealStartDate"
                      defaultValue=""
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Deadline (if any):</label>
                    <input 
                      type="date" 
                      name="projectDeadline"
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              {/* Design Vision */}
              <div className="form-section">
                <h3>Design Vision</h3>
                <div className="form-group">
                  <label>Describe your dream landscape or outdoor living space. Include styles, colors, features:</label>
                  <textarea 
                    name="designVision"
                    rows="4"
                    placeholder="Tell us about your vision..."
                    defaultValue=""
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  ></textarea>
                </div>
              </div>

              {/* Inspiration & Notes */}
              <div className="form-section">
                <h3>Inspiration & Notes</h3>
                <div className="form-group">
                  <label>Do you have any reference photos or Pinterest boards?</label>
                  <div className="radio-group">
                    <label className="radio-item">
                      <input 
                        type="radio" 
                        name="hasReferencePhotos"
                        value="true"
                        checked={questionnaireData.hasReferencePhotos === true}
                        onChange={handleQuestionnaireChange}
                      />
                      <span>Yes (please email or text them to us)</span>
                    </label>
                    <label className="radio-item">
                      <input 
                        type="radio" 
                        name="hasReferencePhotos"
                        value="false"
                        checked={questionnaireData.hasReferencePhotos === false}
                        onChange={handleQuestionnaireChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Anything else we should know about your property, preferences, or goals?</label>
                  <textarea 
                    name="additionalNotes"
                    rows="4"
                    placeholder="Additional notes..."
                    defaultValue=""
                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <div className="modal-logo-left">
                  <img src={plantLogo} alt="Fluorescent Landscapes Plant Logo" />
                </div>
                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowQuestionnaire(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div 
          className="message-modal-overlay" 
          onClick={() => setShowMessageModal(false)}
          onKeyDown={(e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
              return;
            }
          }}
        >
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Send Us a Message</h2>
              <button 
                className="modal-close"
                onClick={() => setShowMessageModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="message-form">
              <div className="form-group">
                <label>Your Name:</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  defaultValue=""
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email:</label>
                <input 
                  type="text" 
                  name="email"
                  placeholder="Your Email" 
                  defaultValue=""
                  inputMode="email"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Phone (optional):</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Your Phone" 
                  defaultValue=""
                  inputMode="tel"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <div className="form-group">
                <label>Your Message:</label>
                <textarea 
                  name="message"
                  placeholder="Tell us about your question or project" 
                  rows="5" 
                  defaultValue=""
                  required
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                ></textarea>
              </div>
              
              <div className="form-actions">
                <div className="modal-logo-left">
                  <img src={plantLogo} alt="Fluorescent Landscapes Plant Logo" />
                </div>
                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowMessageModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
              
              {submitStatus === 'success' && (
                <div className="form-success">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-error">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact; 