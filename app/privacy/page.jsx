export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="text-gray-600">Your privacy is important to us. Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Personal information (name, email, phone)</li>
            <li>Order details</li>
            <li>Payment information (handled securely by gateway)</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
          <p className="text-gray-700">To process orders, send updates, and improve our service.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">3. Cookies</h2>
          <p className="text-gray-700">We use cookies for cart, preferences, and analytics.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">4. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Access, update, delete your data</li>
            <li>Opt-out of marketing</li>
            <li>Contact support@stellarmartbd.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

