# McLean Crew - Million Meters Challenge

A comprehensive team fitness tracking application for the McLean Crew rowing team, designed to motivate and track progress towards a collective goal of 1,000,000 meters.

![McLean Crew Logo](public/images/mclean-crew-logo.png)

## 🚣‍♂️ About the Project

The McLean Crew Million Meters Challenge is a team-based fitness tracking platform that encourages rowers and team members to log their workouts and contribute to a collective goal. The application provides real-time progress tracking, leaderboards, and social features to keep the team motivated and connected.

## ✨ Features

### 🏠 **Dashboard**
- **Team Progress Overview**: Real-time tracking of total meters achieved vs. the 1,000,000m goal
- **Progress Visualization**: Visual progress bars and charts showing team advancement
- **Daily Goals**: Calculated daily targets for both team and individual members
- **Remaining Days**: Countdown to challenge completion

### 🏆 **Leaderboards & Recognition**
- **Top Performers**: Daily, weekly, and overall top performers with profile pictures
- **Comprehensive Leaderboard**: Full team rankings with detailed statistics
- **Achievement System**: Badges and recognition for milestones and consistency

### 📊 **Workout Tracking**
- **Multiple Activity Types**: Support for erg (rowing machine), OTW (on the water), running, biking, swimming, and lifting
- **Workout Submission**: Easy form to log workouts with meters, notes, and images
- **Activity Gallery**: Visual feed of all team workouts with photos and details
- **Progress Charts**: Individual and team progress visualization over time

### 👥 **User Profiles**
- **Personal Statistics**: Individual progress tracking and achievements
- **Workout History**: Complete log of personal activities
- **Profile Customization**: Profile pictures and personal information

### 🔐 **Authentication**
- **User Registration**: Secure signup and login system
- **Guest Mode**: Browse features without creating an account
- **Profile Management**: User account settings and preferences

### 📱 **Mobile-First Design**
- **Responsive Interface**: Optimized for all device sizes
- **Touch-Friendly**: Easy navigation on mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting condition

### 🎨 **Modern UI/UX**
- **Beautiful Design**: Clean, modern interface with McLean Crew branding
- **Smooth Animations**: Engaging user experience with smooth transitions
- **Accessibility**: Designed with accessibility in mind

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Firestore, Authentication)
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mcc-h0.git
   cd mcc-h0
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Authentication
   - Add your Firebase configuration to the environment variables

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deployment

### Local Build
```bash
pnpm run build
```

### GitHub Pages Deployment
The application is configured for automatic deployment to GitHub Pages:

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at `https://[username].github.io/[repository-name]/`

## 🏗️ Project Structure

```
mcc-h0/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel
│   ├── leaderboard/       # Team rankings
│   ├── profile/           # User profiles
│   ├── submit/            # Workout submission
│   ├── workouts/          # Workout gallery
│   └── ...
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
└── public/               # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- McLean Crew team for inspiration and feedback
- shadcn/ui for the beautiful component library
- Firebase for the robust backend infrastructure
- Next.js team for the amazing framework

---

**Built with ❤️ for the McLean Crew team**