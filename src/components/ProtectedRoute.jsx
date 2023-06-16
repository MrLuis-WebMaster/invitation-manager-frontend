import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ component: Component, redirectUrl }) => {
    const { data: session, status } = useSession();
    const [checkUserState, setCheckUserState] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const router = useRouter();

    const checkUser = async session => {
        try {
            const response = await fetch(
                `http://localhost:4000/users/${session.user.email}`
            );
            const data = await response.json();
            setCustomerId(data.body.customerId);
            if (data && data.body && data.body.isActive !== null) {
                setCheckUserState(true);
            } else {
                setCheckUserState(false);
            }
        } catch (error) {
            console.error(error);
            setCheckUserState(false);
            return false;
        }
    };

    const createUser = async session => {
        const response = await fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: session.user.name,
                email: session.user.email,
            }),
        });
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        if (!session && status === 'unauthenticated') {
            router.push(redirectUrl);
        }
        if (session && status === 'authenticated') {
            checkUser(session).then(userExists => {
                if (!userExists) {
                    createUser(session);
                }
            });
        }
    }, [session, status, redirectUrl, router]);

    if (status === 'loading') {
        return <p>Cargando</p>;
    }

    if (status === 'authenticated') {
        if (checkUserState === null) {
            return <p>Comprobando usuario...</p>;
        } else if (checkUserState === false) {
            router.push('payment/select-plan/' + customerId);
            return null;
        } else {
            return <Component />;
        }
    }

    return null;
};

export default ProtectedRoute;
