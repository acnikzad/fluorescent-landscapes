# Fluorescent Landscapes - React Website

A modern, responsive website for Fluorescent Landscapes, showcasing landscape design services, 3D visualization capabilities, and portfolio work.

## 🚀 Features

### Core Components
- **Hero Section** - Eye-catching introduction with call-to-action
- **Services** - Interactive flip cards showcasing landscaping services
- **3D Visualization** - Interactive gallery of 3D landscape designs
- **Video Showcase** - Video demonstration of design process
- **Gallery** - Comprehensive portfolio with auto-rotating slideshow
- **Instagram Integration** - Social media feed with fallback content
- **Contact Form** - Professional contact section
- **Weather Widget** - Floating weather information
- **Responsive Design** - Mobile-first approach with modern UI/UX

### Technical Features
- React 18 with modern hooks
- CSS Grid and Flexbox layouts
- Responsive design for all devices
- Interactive components with smooth animations
- Modal galleries and image overlays
- Instagram API integration (configurable)
- Video playback with fallback handling

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fluorescent-landscapes
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Instagram Basic Display API (Optional)
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
```

### 4. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📱 Instagram Integration Setup

### 1. Facebook Developer Account
- Go to [Facebook Developers](https://developers.facebook.com/)
- Create a new app or use existing one
- Add Instagram Basic Display product

### 2. Instagram Basic Display Setup
- Configure OAuth redirect URIs
- Add Instagram test users
- Generate access token

### 3. Environment Variable
Add your access token to `.env`:
```env
REACT_APP_INSTAGRAM_ACCESS_TOKEN=IGQWRP...
```

### 4. Fallback Content
If Instagram API is unavailable, the component automatically displays placeholder content showcasing your services.

## 🎨 Customization

### Adding New Photos
1. Place images in `src/photos/`
2. Import in component: `import newImage from '../photos/newImage.jpg';`
3. Add to component's image array

### Styling
- Component-specific CSS files in `src/styles/`
- Global styles in `src/App.css` and `src/index.css`
- Responsive breakpoints: 1024px, 768px, 480px

### Component Structure
Each component follows a consistent pattern:
- Import statements and dependencies
- State management with React hooks
- JSX structure with semantic HTML
- CSS classes for styling
- Export default component

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Navigation header
│   ├── Hero.js         # Main hero section
│   ├── Services.js     # Services showcase
│   ├── 3DVisualization.js # 3D design gallery
│   ├── VideoShowcase.js # Video demonstration
│   ├── Gallery.js      # Portfolio gallery
│   ├── Instagram.js    # Social media feed
│   ├── Contact.js      # Contact form
│   ├── Footer.js       # Site footer
│   └── Weather.js      # Weather widget
├── styles/             # Component-specific CSS
├── photos/             # Image assets
├── config/             # Configuration files
└── App.js              # Main application component
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload `build` folder to S3 bucket
- **GitHub Pages**: Use `gh-pages` package

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (irreversible)

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎯 Future Enhancements

### Potential Improvements
- [ ] Add blog/news section
- [ ] Implement customer testimonials
- [ ] Add online quote calculator
- [ ] Integrate with CRM systems
- [ ] Add multi-language support
- [ ] Implement dark/light theme toggle
- [ ] Add search functionality
- [ ] Create admin dashboard

### Performance Optimizations
- [ ] Image lazy loading
- [ ] Code splitting with React.lazy()
- [ ] Service worker for offline support
- [ ] Image optimization and WebP support
- [ ] Bundle analysis and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Fluorescent Landscapes.

## 📞 Support

For technical support or questions about this website:
- Contact the development team
- Check component documentation
- Review React and CSS best practices

---

**Built with React and modern web technologies for Fluorescent Landscapes**
