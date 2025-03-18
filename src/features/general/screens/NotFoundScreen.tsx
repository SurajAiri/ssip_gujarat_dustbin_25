import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import CustomHeader from '@/components/Header';

const NotFoundScreen = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = count > 0 ? setInterval(() => setCount(count - 1), 1000) : undefined;
        
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [count]);

    return (
        <div>
            <CustomHeader />
        <div className="flex bg-background items-center justify-center p-16">
            <motion.div 
                className="flex flex-col items-center max-w-md text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <AlertCircle className="h-32 w-32 text-destructive mb-2" />
                <h1 className="text-6xl font-bold text-foreground my-2">404</h1>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Page Not Found
                </h2>
                <p className="text-base text-muted-foreground mb-8 leading-6">
                    The page you are looking for might have been removed, had its name changed, 
                    or is temporarily unavailable.
                </p>
                <Button 
                    variant="default" 
                    className="px-8 py-3 rounded-full hover:bg-red-700 bg-red-600 text-white"
                    onClick={() => navigate('/')}
                >
                    Go Home
                </Button>
            </motion.div>
        </div>
        <Footer />
        </div>

    );
};

export default NotFoundScreen;
