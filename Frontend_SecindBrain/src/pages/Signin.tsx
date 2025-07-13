import { RefObject, useRef, useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Define types for DottedButton props
const DottedButton: React.FC<{ onClick: () => void; loading: boolean; children: React.ReactNode; disabled?: boolean }> = ({ onClick, loading, children, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none ${
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

// Define types for Input props
const Input: React.FC<{ reference: RefObject<HTMLInputElement>; placeholder: string; type?: string; icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = ({ reference, placeholder, type = "text", icon: Icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative mb-6">
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5">
            <Icon />
          </span>
        )}
        <input
          ref={reference}
          type={inputType}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} ${type === "password" ? 'pr-12' : 'pr-4'} py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white focus:border-black focus:outline-none transition-all duration-300 font-medium placeholder-gray-500`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ for route navigation

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Real API call
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { 
          username, 
          password 
        });
        
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          console.log("Sign in successful, but no token received");
          navigate("/dashboard"); // Navigate anyway
        }
      } catch (error) {
        console.error("Sign in error:", error);
        throw error; // Re-throw to be caught by outer catch block
      }
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-black opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-black opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-black opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600 font-medium">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-8 shadow-lg">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-dashed border-red-200 rounded-xl">
              <p className="text-red-600 font-medium text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Input reference={usernameRef} placeholder="Username" icon={User} />
            <Input reference={passwordRef} placeholder="Password" type="password" icon={Lock} />
          </div>

          <div className="flex items-center mb-6 mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-black" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex justify-center mb-6">
            <DottedButton onClick={signin} loading={loading} disabled={false}>
              <div className="flex items-center gap-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </div>
            </DottedButton>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-black hover:underline font-semibold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
