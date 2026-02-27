import Link from 'next/link';
import Button from '../common/Button';

const BannerSection = ({ 
  title, 
  description, 
  image, 
  cta, 
  ctaLink, 
  bgColor = 'bg-primary-600',
  reverse = false 
}) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
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
              <Link href={ctaLink}>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
                  {cta}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className={`${reverse ? 'md:order-1' : 'md:order-2'} relative h-64 md:h-auto md:w-1/2`}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;