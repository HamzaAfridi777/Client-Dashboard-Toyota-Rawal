import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import twElements from 'tw-elements'; // Import the plugin directly if needed

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/tw-elements/js/**/*.js'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        forms,
        // twElements // Use if the plugin needs to be directly included in the plugins array
    ],
};
