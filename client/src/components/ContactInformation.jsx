import React from 'react';

function ContactInformation() {
    return (
        <div className="grid border rounded-lg max-w-6xl mx-auto pt-14 border-gray-200/70 grid-cols-1 divide-y divide-gray-200/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0" >
            <div className="flex flex-col items-start gap-4 hover:bg-gray-50 transition duration-300 p-8 pb-14">
                <div className="flex items-center gap-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-panel-top size-5" aria-hidden="true" >
                        <rect width="18" height="7" x="3" y="3" rx="1"></rect>
                        <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                        <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                    </svg>
                    <h2 className="font-medium text-base">Address</h2>
                </div>
                <p className="text-gray-500 text-sm/6 max-w-72">
                    Automatically creates a complete website layout from a single prompt.
                </p>
            </div>
            <div className="flex flex-col items-start gap-4 hover:bg-gray-50 transition duration-300 p-8 pb-14">
                <div className="flex items-center gap-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen size-5" aria-hidden="true" >
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path>
                        <path d="M2 6h4"></path>
                        <path d="M2 10h4"></path>
                        <path d="M2 14h4"></path>
                        <path d="M2 18h4"></path>
                        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                    </svg>
                    <h2 className="font-medium text-base">Phone</h2>
                </div>
                <p className="text-gray-500 text-sm/6 max-w-72">
                    Generates high-quality headlines, text, and call-to-actions instantly.
                </p>
            </div>
            <div className="flex flex-col items-start gap-4 hover:bg-gray-50 transition duration-300 p-8 pb-14">
                <div className="flex items-center gap-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-spline size-5" aria-hidden="true" >
                        <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                        <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"></path>
                    </svg>
                    <h2 className="font-medium text-base">Email</h2>
                </div>
                <p className="text-gray-500 text-sm/6 max-w-72">Ensures fast load speed, clean code, and high PageSpeed scores.</p>
            </div>
        </div>
    );
}

export default ContactInformation;