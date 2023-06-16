import dynamic from 'next/dynamic';
import { EventProvider } from '@/contexts/Event/EventProvider';

const ProtectedRoute = dynamic(() => import('@/components/ProtectedRoute'), {
    ssr: false,
});

const TemplateLayout = ({ children }) => {
    return (
        <ProtectedRoute
            component={() => <EventProvider>{children}</EventProvider>}
            redirectUrl="/auth/login"
        />
    );
};

export default TemplateLayout;
