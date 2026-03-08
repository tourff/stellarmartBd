import Link from 'next/link';

const BannerSection = ({ 
  title, 
  description, 
  image, 
  cta, 
  ctaLink, 
  bgColor = 'bg-blue-600',
  reverse = false 
}) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`rounded-2xl overflow-hidden ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex flex-col md:flex`}>
          {/* Content */}
          <div className={`${bgColor} p-8 md:p-12 flex flex-col justify-center ${reverse ? 'md:order-2' : 'md:order-1'}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <p className="text-white/90 text-lg mb-6">
              {description}
            </p>
            <div>
              <Link href={ctaLink} className="inline-block px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-800 transition-colors">
                {cta}
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className={`${reverse ? 'md:order-1' : 'md:order-2'} relative h-64 md:h-auto md:w-1/2`}>
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
