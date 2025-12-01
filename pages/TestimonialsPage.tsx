import { TestimonialCard } from '../components/TestimonialCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { FadeIn } from '../components/FadeIn';
import { Star, Quote } from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

export function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Property Investor, Dubai",
      content: "Modern Services has transformed how I manage my UK properties. Their attention to detail and transparent reporting give me complete peace of mind from abroad. I've been able to grow my portfolio from 2 to 8 properties over the past 5 years, all thanks to their exceptional management.",
      rating: 5
    },
    {
      name: "James Chen",
      role: "International Investor, Singapore",
      content: "The team's expertise in both property management and UK tax compliance is invaluable. They've maximized my returns while ensuring full legal compliance. The monthly reports are detailed and easy to understand, even with the time zone difference.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Real Estate Portfolio Owner, Spain",
      content: "After 5 years with Modern Services, I can confidently say they are the best in the business. Professional, responsive, and truly care about my investments. They've helped me navigate Brexit changes and kept my properties fully occupied throughout.",
      rating: 5
    },
    {
      name: "Robert Thompson",
      role: "Property Developer, USA",
      content: "Their integrated approach to property management and accounting has streamlined my entire UK operation. Exceptional service and results. The 24/7 support means I can reach them whenever I need, despite being 5 hours behind.",
      rating: 5
    },
    {
      name: "Amira Hassan",
      role: "Investor, UAE",
      content: "From tenant sourcing to financial reporting, Modern Services handles everything seamlessly. I couldn't ask for a better partner in managing my London properties. They found high-quality tenants within weeks of each property going on the market.",
      rating: 5
    },
    {
      name: "Pierre Dubois",
      role: "Property Owner, France",
      content: "The maintenance team is incredibly responsive. When there was a heating issue in winter, they had it resolved within 4 hours. My tenants were very impressed, and so was I. This level of service is why I continue to invest in UK property.",
      rating: 5
    },
    {
      name: "Lisa Anderson",
      role: "Expatriate Investor, Australia",
      content: "Moving to Australia could have been a nightmare for managing my UK properties, but Modern Services made it effortless. Their online portal lets me track everything in real-time, and the monthly financial statements are always on time and accurate.",
      rating: 5
    },
    {
      name: "David Kumar",
      role: "Portfolio Investor, India",
      content: "What sets Modern Services apart is their proactive approach. They don't just react to problems; they prevent them. Regular inspections, preventive maintenance, and excellent tenant relations mean my properties stay in top condition with minimal void periods.",
      rating: 5
    },
    {
      name: "Elena Popov",
      role: "Business Owner, Russia",
      content: "The accounting services provided through their partnership with Pluto Consultancy have been a game-changer. Tax compliance is complex for international investors, but they make it simple. I save both time and money every tax year.",
      rating: 5
    },
    {
      name: "Michael O'Brien",
      role: "Investor, Ireland",
      content: "I've worked with three different property management companies over the years, and Modern Services is head and shoulders above the rest. Their professionalism, communication, and results speak for themselves. My rental yields have increased by 15% since switching to them.",
      rating: 5
    },
    {
      name: "Yuki Tanaka",
      role: "International Investor, Japan",
      content: "As someone who values precision and reliability, I appreciate Modern Services' systematic approach. Every detail is handled with care, from tenant screening to financial reporting. The language barrier has never been an issue thanks to their accommodating team.",
      rating: 5
    },
    {
      name: "Carlos Mendez",
      role: "Property Developer, Mexico",
      content: "Modern Services helped me navigate the UK property market as a first-time international investor. Their market insights and guidance were invaluable. Three years later, I own five properties in England, all managed flawlessly by their team.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/90 to-[#0A1A2F]/70 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763976435739-2eb798e5907c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSyUyMHByb3BlcnR5JTIwaG91c2V8ZW58MXx8fHwxNzY0Mjc2NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="UK property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Quote size={64} className="text-[#C8A75B] mx-auto mb-6" />
          <h1 className="text-white mb-4">Client Testimonials</h1>
          <p className="text-xl text-gray-200">
            Trusted by international investors worldwide
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-[#C8A75B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-white fill-white" />
                ))}
              </div>
              <div className="text-white text-sm">5-Star Average Rating</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">98%</div>
              <div className="text-white text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">200+</div>
              <div className="text-white text-sm">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl text-white mb-2">20+</div>
              <div className="text-white text-sm">Years of Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-[#0A1A2F] mb-4">What Our Clients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real feedback from real investors who trust us with their property investments in England.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20 bg-[#F4F5F7]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-12 rounded-lg shadow-xl">
            <Quote size={48} className="text-[#C8A75B] mb-6" />
            <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">
              "Modern Services doesn't just manage properties—they build partnerships. In an industry where trust is everything, they've proven time and again that they have their clients' best interests at heart. I sleep better at night knowing my UK investments are in their capable hands."
            </p>
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-[#C8A75B] fill-[#C8A75B]" />
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="text-xl text-[#0A1A2F]">Alexandra Petrov</div>
              <div className="text-gray-500">Multi-Property Investor, Germany</div>
              <div className="text-sm text-gray-400 mt-2">Client since 2016</div>
            </div>
          </div>
          </div>
        </FadeIn>
      </section>

      {/* Countries Served */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
            <h2 className="text-[#0A1A2F] mb-4">Serving Investors Globally</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We proudly serve property investors from around the world who trust us with their UK investments.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {['UAE', 'USA', 'Singapore', 'Spain', 'France', 'Germany', 'Australia', 'Japan', 'India', 'Russia', 'Mexico', 'Ireland'].map((country) => (
              <div key={country} className="bg-[#F4F5F7] p-6 rounded-lg">
                <div className="text-[#0A1A2F]">{country}</div>
              </div>
            ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0A1A2F]">
        <FadeIn>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Join Our Family of Satisfied Investors</h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience the Modern Services difference. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => onNavigate('contact')}>
              Schedule Consultation
            </Button>
            <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-[#0A1A2F]" onClick={() => onNavigate('services')}>
              View Our Services
            </Button>
          </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
