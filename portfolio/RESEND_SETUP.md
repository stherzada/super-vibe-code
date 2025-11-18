# Contact Form with Resend Email Integration

## Setup Instructions

### 1. Get Resend API Key
1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

### 2. Configure Environment Variables
Create a `.env.local` file in the root of your project:

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your-email@example.com
```

### 3. Verify Domain (Optional but Recommended)
For production use:
1. Add and verify your domain in Resend dashboard
2. Update the `from` field in `/app/api/send-email/route.ts`:
   ```typescript
   from: 'Contact Form <noreply@yourdomain.com>'
   ```

### 4. Test the Form
1. Start the dev server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox

## Features
- ✅ Form validation with Zod
- ✅ Loading states and error handling
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Beautiful HTML email template
- ✅ Success/error notifications
- ✅ Reply-to functionality

## Files Created
- `/app/api/send-email/route.ts` - API endpoint
- `/components/ContactForm.tsx` - Form component
- `/components/Contact.tsx` - Updated with form

## Environment Variables
- `RESEND_API_KEY` - Your Resend API key (required)
- `CONTACT_EMAIL` - Email where submissions are sent (required)
