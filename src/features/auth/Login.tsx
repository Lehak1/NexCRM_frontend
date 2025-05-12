import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Mail, LineChart, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  { name: "Sana R.", feedback: "NexCRM made our campaign targeting effortless. Huge time saver!" },
  { name: "David K.", feedback: "Simple, powerful, and beautifully designed. We now engage smarter." },
  { name: "Aarav M.", feedback: "From segmentation to delivery—everything just works." },
  { name: "Lisa W.", feedback: "A compact CRM that fits perfectly in our workflow!" },
];

const Login = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="max-w-lg">
          <Sparkles className="h-10 w-10 text-blue-600 mb-3 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NexCRM</h1>
          <p className="text-md text-gray-600 mb-6 leading-relaxed">
            <span className="font-semibold text-blue-700">NexCRM</span> A Customer relationship management platform that helps businesses manage customers,
            segment audiences, and deliver personalized campaigns efficiently.
          </p>
          <Button onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}>
            Log In with Google
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">What NexCRM Does</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 rounded-xl shadow-lg bg-blue-50">
            <Users className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Customer Segmentation</h3>
            <p className="text-gray-600">Group customers with rules, behaviors, and preferences in real time.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-blue-50">
            <Mail className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Campaign Delivery</h3>
            <p className="text-gray-600">Send personalized campaigns to the right audience with ease.</p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-blue-50">
            <LineChart className="h-8 w-8 text-blue-600 mb-2 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Insights & Tracking</h3>
            <p className="text-gray-600">Analyze customer behavior and measure campaign success instantly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section (scrolling using Tailwind animation) */}
      <section className="bg-gradient-to-br from-indigo-100 to-blue-50 py-14 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">What Users Say</h2>
        <div className="overflow-hidden relative h-40">
          <div className="absolute animate-slide w-max flex gap-10">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] bg-white p-6 rounded-xl shadow-md text-left"
              >
                <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
                <p className="text-blue-600 font-semibold">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
