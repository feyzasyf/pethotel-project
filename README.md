# 🐾 PetHotel – Full-Stack Booking Platform        
Live Demo: [https://pethotel-project.vercel.app](https://pethotel-project.vercel.app)            
PetHotel is a full-stack booking platform where users can list pets for boarding and manage reservations with secure Stripe payments.          
Built with modern production-ready tools and deployed on Vercel.

## ✨ **Features**     
User authentication    
Pet listing creation      
Reservation & booking system       
Stripe payment integration (webhooks configured)      
Responsive UI         
Production deployment on Vercel        
Note: Image uploads are currently disabled in production (no external object storage configured yet).


## 🛠  **Tech Stack**        
- Next.js (App Router) v16+           
- React + TypeScript           
- NextAuth v5  
- Tailwind CSS/Shadcn
- Prisma ORM                       
- Neon Postgres          
- Stripe (Checkout + Webhooks)             
- Vercel (serverless)            


## Project Structure

```
app/
  (app)/
  (auth)/
  (marketing)/
  api/
    upload-img/
      route.ts
  generated/
  icon.svg
  layout.tsx

components/
  contexts/
    PetContextProvider.tsx
    SearchContextProvider.tsx

lib/
  auth-edge.ts
  auth.ts
  constants.ts
  guards.ts
  handlers.ts
  hooks.ts
  nextAuth.d.ts
  prisma.ts
  prismaErrors.ts
  serverUtils.ts
  stripe.ts
  types.ts
  utils.ts
  validations.ts

prisma/
  migrations/
  schema.prisma
  seed.ts

public/
styles/

```

**App Router Structure**
- Route Groups: (app), (auth), (marketing)
- Server Components for data fetching
- Client Components for interactivity
- Route Handlers for external integrations (/api)

**Server-Side Layer (lib/)**
- prisma.ts → Prisma client 
- stripe.ts → Stripe configuration
- guards.ts → Access control
- serverUtils.ts → Shared server utilities
- validations.ts → Zod schemas
- handlers.ts → Business logic abstraction
Separation keeps UI thin and business logic reusable.

### Database
Prisma schema in /prisma/schema.prisma    
Relational models: User, Pet, Booking       
Migrations managed via Prisma         
Seed script included   

### Payments            
Stripe Checkout session created server-side       
Webhook handler verifies signature         
Booking confirmation triggered only after checkout.session.completed         

### State Management     
Context API:      
    - PetContextProvider        
    - SearchContextProvider      



# Getting Started (Local Development)
Clone the repository:

```git clone https://github.com/your-username/pethotel-project.git
cd pethotel-project
```
Install dependencies:
```
npm install
```
Create .env :

```
DATABASE_URL=your_neon_database_url
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

```

Run the dev server: 
```
npm run dev
```
🔐 **Stripe Webhook (Local Testing)**
Use Stripe CLI:
```
stripe listen --forward-to localhost:3000/api/stripe_webhooks
```
Copy the generated webhook secret into .env.

**Production**
Deployed on Vercel:
[pet-hotel](https://pethotel-project.vercel.app)
Production environment variables are configured in Vercel Dashboard.

 **Current Limitations**
Image uploads are not persisted (no object storage configured)
No admin dashboard yet
No automated email notifications

# 👩‍💻 Author
Feyza Seyfi         
Web Developer             
GitHub: [https://github.com/feyzasyf](https://github.com/feyzasyf)      
LinkedIn: [https://www.linkedin.com/in/feyzaseyfi](https://www.linkedin.com/in/feyzaseyfi)      

