import React from 'react';
import { Star, Smile, Sparkles, Shield, Play } from 'lucide-react';

const Testimonials = () => {
  const videoReviews = [
    {
      id: 1,
      name: 'Pooja S.',
      treatment: 'Deep Yellow Peels for Melasma',
      city: 'Pune',
      thumbnail: '/assets/images/hero_doctor.png',
      duration: '4:12',
    },
    {
      id: 2,
      name: 'Rajesh P.',
      treatment: 'CO2 Laser Acne Resurfacing',
      city: 'Aurangabad',
      thumbnail: '/assets/images/clinic_interior.png',
      duration: '3:05',
    },
    {
      id: 3,
      name: 'Anjali K.',
      treatment: 'Exilis RF Jawline Tightening',
      city: 'Mumbai',
      thumbnail: '/assets/images/hero_doctor.png',
      duration: '2:45',
    },
  ];

  const textReviews = [
    {
      id: 1,
      stars: 5,
      text: 'Extremely clean and relaxing clinic. Dr. Ajeet explained the entire process of CO2 fractional laser for my acne scars. The results are amazing in just 3 sessions. Highly recommended!',
      author: 'Rajesh P.',
      city: 'Aurangabad',
      treatment: 'Acne Scar Reduction',
    },
    {
      id: 2,
      stars: 5,
      text: 'My dark pigmentation patches had been causing uneven skin tone. The customized skin peel treatments did magic. My skin feels fresh, clear, and glowing. Thank you Skin Solutions!',
      author: 'Pooja S.',
      city: 'Pune',
      treatment: 'Deep Skin Peels',
    },
    {
      id: 3,
      stars: 5,
      text: 'Excellent Laser Hair Reduction treatment! It was almost painless using their advanced Nd-YAG laser device. Staff was incredibly polite, highly hygienic environment.',
      author: 'Anjali K.',
      city: 'Mumbai',
      treatment: 'Laser Hair Reduction',
    },
    {
      id: 4,
      stars: 5,
      text: 'I visited for my hair fall issue. Underwent Hair fall mesotherapy and LLLT. Outstanding growth results inside 4 months. Dr. Ajeet is incredibly professional.',
      author: 'Amit K.',
      city: 'Aurangabad',
      treatment: 'Hair Mesotherapy',
    },
    {
      id: 5,
      stars: 5,
      text: 'The Exilis Radio Frequency procedure worked wonders for my loose double-chin skin! There was zero pain and my face looks sculpted. Incredible technology.',
      author: 'Sunita M.',
      city: 'Aurangabad',
      treatment: 'Exilis Face Tightening',
    },
    {
      id: 6,
      stars: 5,
      text: 'Highly professional medical clinic. Highly hygienic environment. Very soft handling during mole cauterization procedure. Excellent post-care guidelines.',
      author: 'Ramesh R.',
      city: 'Pune',
      treatment: 'RF Mole Cauterization',
    },
  ];

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-r from-white to-[#F5F0E8] py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Patient Feedback
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Over 10,000 Rejuvenated Smiles
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Read the genuine transformation journeys and clinical reviews shared by our patients.
          </p>
        </div>
      </section>

      {/* SECTION 2: RATING SUMMARY DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-border-light rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          {/* Left Block */}
          <div className="flex flex-col items-center md:items-start space-y-3.5 md:border-r border-gray-150 md:pr-16 w-full md:w-auto flex-shrink-0 text-center md:text-left">
            <span className="text-[13px] text-body-gray font-bold uppercase tracking-wider">
              Google Verified Rating
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-[52px] font-sans font-extrabold text-charcoal leading-none">
                4.9
              </span>
              <span className="text-[20px] text-gray-400 font-bold">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-gold w-5.5 h-5.5" />
              ))}
            </div>
            <span className="text-[12px] text-gray-500 font-medium">
              Based on 450+ Patient Reviews
            </span>
          </div>

          {/* Right Block */}
          <div className="space-y-4 text-center md:text-left flex-grow">
            <h3 className="font-bold text-[20px] text-charcoal flex items-center justify-center md:justify-start gap-2">
              <Smile className="text-primary w-6 h-6" />
              <span>Restoring Beauty and Smile Since 2009</span>
            </h3>
            <p className="text-body-gray text-[14px] leading-relaxed max-w-xl">
              Our clinical objective at Skin Solutions is to deliver highly effective dermatological care in a safe, hygienic environment. Every review is a testament to our medical accuracy, state-of-the-art US-FDA laser equipment, and personalized care.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-[12px] text-body-gray font-semibold">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-primary" />
                100% Genuine Reviews
              </span>
              <span className="text-gray-300">|</span>
              <span>Hygienic Clinical Environment</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VIDEO REVIEW CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="flex items-center space-x-2.5 border-l-4 border-primary pl-4">
            <h2 className="font-sans font-bold text-2xl text-charcoal">
              Video Review Journeys
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoReviews.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={video.thumbnail}
                    alt={video.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="absolute inset-0 bg-charcoal/30 transition-colors group-hover:bg-charcoal/40" />

                  {/* Play Button Overlay */}
                  <div className="absolute w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="fill-primary ml-1" size={18} />
                  </div>

                  {/* Duration tag */}
                  <span className="absolute bottom-3 right-3 bg-charcoal/70 text-white text-[10px] font-bold py-0.5 px-2 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info details */}
                <div className="p-5 space-y-2 flex-grow">
                  <span className="inline-flex items-center gap-1 text-[11px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    <Sparkles size={10} />
                    <span>Transformation Review</span>
                  </span>
                  <h4 className="font-bold text-[15px] text-charcoal leading-tight">
                    {video.name} Sharing Skin Peel Feedback
                  </h4>
                  <p className="text-[12.5px] text-body-gray leading-relaxed font-semibold">
                    Treatment: {video.treatment} ({video.city})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TEXT REVIEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="flex items-center space-x-2.5 border-l-4 border-primary pl-4">
            <h2 className="font-sans font-bold text-2xl text-charcoal">
              Detailed Written Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {textReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-7 border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-gold">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="fill-gold w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-primary font-bold text-4xl leading-none">&ldquo;</span>
                  <p className="text-body-gray italic text-[14px] leading-relaxed -mt-2 mb-6">
                    {review.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[14px]">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-charcoal leading-tight">
                      {review.author}
                    </h4>
                    <p className="text-[12px] text-gray-500">
                      {review.city} • {review.treatment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
