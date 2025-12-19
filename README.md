🏠 UNIHOME - Smart Interior Solutions for StudentsUNIHOME is a modern e-commerce platform dedicated to providing affordable, high-quality furniture and home decor for students and young professionals. Our platform bridges the gap between budget constraints and the desire for a comfortable, stylish living space.🚀 Technology StackLayerTechnologyFrameworkNext.js 15 (App Router)UI LibraryHeroUI (React UI Framework)StylingTailwind CSS 4AnimationFramer MotionLanguageTypeScriptThemenext-themes (Dark/Light/System Mode)✨ Core Features🛒 Shopping ExperienceSmart Hero Section: High-impact visuals with clear Call-to-Actions.Product Listings: Advanced filtering and sorting for furniture categories.Savings Combos: Exclusive furniture bundles at discounted prices for dorm rooms.Detailed Views: Comprehensive product specifications, ratings, and reviews.Cart & Checkout: Seamless, responsive flow from selection to payment.👥 User EcosystemDual Dashboards: Specialized interfaces for both Buyers (orders, wishlists) and Sellers (inventory, sales analytics).Community Hub: A social space for students to share room setups and DIY tips.Authentication: Secure Login/Register modules.🛠️ Support & InteractionReal-time Chat: Integrated ChatBot widget for instant customer assistance.Return Management: Easy-to-use system for handling returns and exchanges.Feedback System: Robust review and rating system for product quality assurance.🎨 Design SystemOur visual identity is inspired by nature and minimalist living, using earthy tones and organic textures.🌈 Color PalettePrimary (Brand Green): #08A045 | #0B6E4F | #073B3ASurfaces: #F5F1E8 (Main) | #EFE6D8 (Secondary) | #FFFFFF (Card)Material (Wood): #D2B48C (Light) | #B08968 (Medium) | #6B4F3F (Dark)Typography: #2E2E2E (Headings) | #4A4A4A (Body) | #7A7A7A (Muted)📁 Project StructurePlaintextunihome/
├── app/                    # Next.js App Router (Routing & Pages)
│   ├── (auth)/             # Login, Register, Forgot Password
│   ├── (dashboard)/        # Buyer & Seller Dashboards
│   ├── products/           # Listing and [id] detail pages
│   ├── layout.tsx          # Root layout with Global Providers
│   └── page.tsx            # Landing Page
├── components/             # Reusable React Components
│   ├── layout/             # Header, Footer, Navigation
│   └── ui/                 # HeroUI-based custom components
├── lib/                    # Configuration and Providers
├── types/                  # Global TypeScript Interfaces
├── utils/                  # Helper functions (Formatters, Validators)
├── public/                 # Static Assets (Images, Icons)
└── tailwind.config.ts      # Theme & HeroUI Customization
🛠️ Getting StartedPrerequisitesNode.js 18.x or laternpm / yarn / pnpmInstallationClone the repositoryBashgit clone https://github.com/your-username/unihome.git
cd unihome
Install dependenciesBashnpm install
Run the development serverBashnpm run dev
Open http://localhost:3000 to view the result.DeploymentBash# Build for production
npm run build

# Start production server
npm start
🔜 Roadmap[ ] Payment Integration: Adding VNPay and MoMo gateways.[ ] Live Notifications: Real-time order tracking and promo alerts.[ ] AI Decor Assistant: Using AI to suggest furniture based on room dimensions.[ ] Multi-language Support: English and Vietnamese localization.📄 LicenseThis project is private and intended for educational and commercial use by the UNIHOME team.
