export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">1. Account</h2>
          <p className="text-gray-700">You must provide accurate information and keep it updated.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">2. Orders</h2>
          <p className="text-gray-700">All sales final. Shipping times vary by location.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">3. Payments</h2>
          <p className="text-gray-700">Secure payment processing. No chargebacks.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">4. Liability</h2>
          <p className="text-gray-700">We are not liable for lost shipments or third-party services.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold">5. Contact</h2>
          <p className="text-gray-700">support@stellarmartbd.com</p>
        </section>
      </div>
    </div>
  );
}

