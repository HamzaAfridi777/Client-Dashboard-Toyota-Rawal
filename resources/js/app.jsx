import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
// import { createInertiaApp } from 'inertiajs/react';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { InertiaProgress } from '@inertiajs/progress';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize Inertia Progress with custom settings
InertiaProgress.init({
    delay: 250, // The delay before the progress bar appears (in milliseconds)
    color: '#29d', // The color of the progress bar
    includeCSS: true, // Whether to include the default NProgress styles
    showSpinner: true, // Whether to show the spinner
});
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
