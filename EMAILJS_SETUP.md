# Setting up EmailJS

To make the contact form work, you need to set up EmailJS. Follow these steps:

1. Go to [EmailJS](https://www.emailjs.com/) and create an account

2. Create a new Email Service:
   - Go to Email Services
   - Add New Service
   - Choose your email provider (e.g., Gmail)
   - Follow the authentication steps

3. Create an Email Template:
   - Go to Email Templates
   - Create New Template
   - Design your email template using these variables:
     - {{from_name}} - Sender's name
     - {{from_email}} - Sender's email
     - {{message}} - The message
     - {{to_name}} - Recipient name

4. Get your credentials:
   - Public Key: Found in Account > API Keys
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates

5. Update the Contact page:
   Replace these values in `app/contact/page.tsx`:
   ```javascript
   'service_91e158k'  // Replace with your EmailJS service ID
   'template_cb6lljw' // Replace with your EmailJS template ID
   'O18xeRbToItAAmvYx'  // Replace with your EmailJS public key
   ```

That's it! Your contact form should now be working and sending emails through EmailJS.