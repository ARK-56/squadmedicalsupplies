import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground">Payment Successful!</h1>
          <p className="mb-2 text-muted-foreground">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          {orderId && (
            <p className="mb-6 text-sm text-muted-foreground">
              Order ID: <span className="font-mono font-semibold text-foreground">{orderId.slice(0, 8)}</span>
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/equipment" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Continue Shopping
            </Link>
            <Link to="/" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
