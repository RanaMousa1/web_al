import React, { useState } from 'react';
import API_URL from '../config/api';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('✅ Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatusMessage(`❌ ${data.error || 'Failed to send message'}`);
      }
    } catch (error) {
      setStatusMessage('❌ Could not connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border-2 border-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-3 border-2 border-black"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            {statusMessage && (
              <div
                className={`p-3 rounded ${
                  statusMessage.includes('✅')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-8 py-3 font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
