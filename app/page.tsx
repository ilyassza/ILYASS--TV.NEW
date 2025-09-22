import Header from './components/Header'
import HeroSection from './components/HeroSection'
import CardsSection from './components/CardsSection'
import StatisticsSection from './components/StatisticsSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CardsSection />
      <StatisticsSection />
      <Footer />
    </main>
  )
}