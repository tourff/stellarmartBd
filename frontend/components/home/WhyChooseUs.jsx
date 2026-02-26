import { FaShippingFast, FaShieldAlt, FaHeadset, FaUndo } from 'react-icons/fa';

export default function WhyChooseUs() {
  const features = [
    { icon: FaShippingFast, title: 'Fast Delivery' },
    { icon: FaShieldAlt, title: 'Secure Payment' },
    { icon: FaHeadset, title: '24/7 Support' }, // FaHeadsetCog এর বদলে FaHeadset
    { icon: FaUndo, title: 'Easy Returns' },
  ];

  return (
    <section className="py-12 bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <item.icon size={30} className="text-[#004a7c] mb-3" />
            <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
