import React, { useState } from 'react';
import emailjs from "emailjs-com";
import { User, Mail, SendHorizontal } from 'lucide-react';
import toast from "react-hot-toast";

function ContactForm() {
    const [isSending, setIsSending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(serviceId, templateId, e.target, publicKey)
            .then(() => {
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                console.error("EmailJS error:", error);
                toast.error("Oops! Something went wrong. Please try again.");
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm text-slate-800">
            <p className="text-xs bg-primary/20 text-primary-dull font-medium px-3 py-1 rounded-full">Contact Us</p>
            <h1 className="text-4xl font-bold py-4 text-center">Let’s Get In Touch.</h1>
            <p className="max-md:text-sm text-gray-500 pb-10 text-center">
                Or just reach out manually to us at <a href="mailto:naturix@gmail.com" className="text-primary-dull hover:underline">naturix@gmail.com</a>
            </p>

            <div className="max-w-96 w-full px-4">
                {/* Full Name Input */}
                <label htmlFor="name" className="font-medium text-slate-700">Full Name</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all overflow-hidden bg-white">
                    <User className="size-5 text-slate-400" />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-full px-2 w-full outline-none bg-transparent"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Email Address Input */}
                <label htmlFor="email" className="font-medium text-slate-700">Email Address</label>
                <div className="flex items-center mt-2 mb-4 h-11 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all overflow-hidden bg-white">
                    <Mail className="size-5 text-slate-400" />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-full px-2 w-full outline-none bg-transparent"
                        placeholder="Enter your email address"
                        required
                    />
                </div>

                {/* Message Textarea */}
                <label htmlFor="message" className="font-medium text-slate-700">Message</label>
                <textarea
                    rows="4"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full mt-2 p-3 bg-white border border-slate-300 rounded-2xl resize-none outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    placeholder="How can we help you?"
                    required
                ></textarea>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSending}
                    className={`flex items-center justify-center gap-2 mt-6 bg-primary text-white py-3 w-full rounded-full transition font-medium
                        ${isSending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dull active:scale-[0.98] cursor-pointer shadow-md shadow-primary/20'}`}
                >
                    {isSending ? "Sending..." : "Send Message"}
                    {!isSending && <SendHorizontal className="size-4" />}
                </button>
            </div>
        </form>
    );
}

export default ContactForm;