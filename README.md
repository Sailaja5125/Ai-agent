This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## More about the ai-agent 
The application is made for automating the tasks 
i.e sending emails , messages to individual or a group of people in an organization etc within just one click 

ChatGpt vs ours 
ChatGpt writes the email but our Application both writes the email and also sends to the particular person whose email address is given in just one click 
not only a single person but also a group of people in an organization just import a datasheet or enter a custom data to our application and it does in a Jiffy !!
Services not only Restricted to Email but also for sending sms messages also 

## Architecture 

* single person
user Prompt -> vercel SDK (ai) -> writes an email and returns the given email id's in the prompt (also can use regex) -> sending the given mail to Mail sending applications (mailchimp or mail trap or SMTP using python) -> hence mail sent 

* an Organization
user Prompt -> vercel SDK (ai) -> writes an email for an organization -> inserts a doc or inserts in the given user interface i.e table of name and email -> sending the given mail to Mail sending applications (mailchimp or mail trap or SMTP in form of an array [] ) -> hence mail is sent 

## More features that have to disscussed before adding 

## user creation finished ✅
## email bot finished to send emails to one or two users ✅
## for more than one user ✅
## Email API (mail trap sandbox.io) setup completed ✅
## Build Home Page 
## Build Create Account Page
## Build OAuth using client and other third party applications
## Build Require chatbot page
## build Voice integeration also to it
## similarly build messaging service -another api
## ads service -another api
## analytics Service -another api
## any other Service 