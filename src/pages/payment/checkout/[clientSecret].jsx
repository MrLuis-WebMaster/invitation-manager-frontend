import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { clientSecret } = router.query;

    const handleSubmit = async event => {
        event.preventDefault();

        setIsLoading(true);

        if (!stripe || !elements) {
            setIsLoading(false);
            setError('Stripe not initialized');
            return;
        }

        const { error: paymentError, paymentMethod } =
            await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

        if (paymentError) {
            setIsLoading(false);
            setError(paymentError.message);
            return;
        }

        const { error: confirmationError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: paymentMethod.id,
            }
        );

        if (confirmationError) {
            setIsLoading(false);
            setError(confirmationError.message);
            return;
        }

        router.push('/payment/success');
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div>{error}</div>}
            <button type="submit" disabled={!stripe || isLoading}>
                {isLoading ? 'Loading...' : 'Pay'}
            </button>
        </form>
    );
};

const CheckoutPage = () => {
    return (
        <div>
            <h1>Checkout Page</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default CheckoutPage;
