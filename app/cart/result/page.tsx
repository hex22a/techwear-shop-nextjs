import { stripe  } from '@/app/lib/stripe';
import Stripe from 'stripe';
import PrintObject from '@/app/ui/print_object';

type ResultPageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ session_id: string }>;
};


export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  if (!params.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession =
    await stripe.checkout.sessions.retrieve(params.session_id, {
      expand: ["line_items", "payment_intent"],
    });
  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  if (!paymentIntent) {
    return <div>No payment intent found</div>;
  }
  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h3>Checkout Session response:</h3>
      <PrintObject content={checkoutSession} />
    </>
  );
}
