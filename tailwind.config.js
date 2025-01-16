/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            boxShadow: {
                default: '0px 4px 8px 0px rgba(0, 0, 0, 0.04)',
                cart: '0px 0px 16px 0px rgba(0, 0, 0, 0.16)',
            },
            
            backgroundImage: {
                "custom-gradient":"linear-gradient(95.43deg, #F36A0F -48.67%, #FFA970 103.55%)",
                "custom-gradient-hover": "linear-gradient(95.43deg, #D85A0C -48.67%, #FF9063 103.55%)",
            },
        },
    },
    plugins: [],
};
