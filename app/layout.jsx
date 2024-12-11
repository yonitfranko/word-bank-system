export default function RootLayout({ children }) {
    return (
        <html lang="he" dir="rtl">
            <head>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            </head>
            <body className="bg-white">
                <main className="container mx-auto px-4">
                    {children}
                </main>
            </body>
        </html>
    );
}