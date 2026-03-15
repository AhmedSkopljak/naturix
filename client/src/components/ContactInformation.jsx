import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function ContactInformation() {
    const contactDetails = [
        {
            icon: <MapPin className="size-5" />,
            title: "Address",
            content: "Maršala Tita 12, 71000 Sarajevo",
            subText: "Bosnia and Herzegovina"
        },
        {
            icon: <Phone className="size-5" />,
            title: "Phone",
            content: "+387 33 123 456",
            subText: "Mon-Fri from 8am to 6pm"
        },
        {
            icon: <Mail className="size-5" />,
            title: "Email",
            content: "naturix@gmail.com",
            subText: "Online support 24/7"
        }
    ];

    return (
        <div className="grid border rounded-2xl max-w-6xl mx-auto mt-16 border-gray-200/70 grid-cols-1 divide-y divide-gray-200/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0 overflow-hidden shadow-sm" >
            {contactDetails.map((item, index) => (
                <div
                    key={index}
                    // Promijenjeno: items-start -> items-center
                    className="flex flex-col items-center gap-4 hover:bg-gray-50/50 transition-colors duration-300 p-8 pb-12"
                >
                    {/* Header: Icon + Title */}
                    {/* Promijenjeno: flex-col i items-center za vertikalno centriranje ikone iznad naslova */}
                    <div className="flex flex-col items-center gap-3 text-primary-dull">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            {item.icon}
                        </div>
                        <h2 className="font-semibold text-gray-800 text-base">{item.title}</h2>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 text-center">
                        <p className="text-gray-600 font-medium text-sm/6">
                            {item.content}
                        </p>
                        <p className="text-gray-400 text-xs">
                            {item.subText}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactInformation;