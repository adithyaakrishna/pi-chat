import { useNavigate } from "react-router-dom";

const WelcomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[#f8f3e9] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-serif text-green-900 mb-8">Welcome to Pi</h1>
      
      <div className="flex flex-col space-y-4 items-center justify-center">
        <button 
          onClick={() => navigate('/app')}
          className="bg-green-900 text-white px-8 py-3 rounded-full text-lg"
        >
          Get Started
        </button>
        
        <button 
          onClick={() => navigate('/app')}
          className="block text-green-900 hover:text-green-700"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default WelcomeLayout;