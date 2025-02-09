import React from 'react';

const SampleComponent: React.FC = () => {
  return (
    <div>
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <div className="card">
        <h1>Welcome to My App</h1>
        <p>This is a sample component with modern styling.</p>
        <a href="#" className="button">Get Started</a>
      </div>

      <div className="card mt-2">
        <h2>Features</h2>
        <ul>
          <li>Responsive Design</li>
          <li>Modern Color Scheme</li>
          <li>Interactive Components</li>
        </ul>
      </div>

      <div className="card mt-2">
        <h3>Contact Us</h3>
        <form>
          <input type="text" className="input" placeholder="Your Name" />
          <input type="email" className="input" placeholder="Your Email" />
          <textarea className="input" placeholder="Your Message" rows={4} />
          <button type="submit" className="button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default SampleComponent; 