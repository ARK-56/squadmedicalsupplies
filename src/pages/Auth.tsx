import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { user, signIn, signUp } = useAuth();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) setError(error.message);
      else setSignUpSuccess(true);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card"
        >
          <h1 className="font-display text-2xl font-bold text-foreground">{isLogin ? "Sign In" : "Create Account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLogin ? "Welcome back! Sign in to your account." : "Create an account to shop and leave reviews."}
          </p>

          {signUpSuccess ? (
            <div className="mt-6 rounded-lg bg-primary/10 p-4 text-sm text-primary">
              <p className="font-semibold">Check your email!</p>
              <p>We've sent a confirmation link to {email}. Please verify your email to sign in.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Display Name</label>
                  <input required type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name" />
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="••••••••" />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setIsLogin(!isLogin); setError(""); setSignUpSuccess(false); }} className="text-primary hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Auth;
