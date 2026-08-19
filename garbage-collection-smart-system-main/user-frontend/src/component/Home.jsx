'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, Zap, Globe, Clock, CheckCircle,
    ArrowRight, Leaf, BarChart2, Calendar, AlertCircle,
    ChevronRight
} from 'lucide-react';
import { committeeMembers as defaultCommittee } from '../config';
import Footer from './shared/Footer';
import { usePanchayat } from '../context/PanchayatContext';
import api from '../api/axios';

const slides = [
    { image: '/assets/imgg1.png', title: 'Smart Waste Collection', sub: 'Powered by technology, driven by community.' },
    { image: '/assets/imgg.png', title: 'Real-Time Tracking', sub: 'Know exactly when the vehicle arrives.' },
    { image: '/assets/img3.png', title: 'Clean Tomorrow', sub: 'A greener future starts with you.' },
];

const features = [
    { icon: Globe, title: 'Easy Scheduling', desc: 'Book pickups at your convenience', color: 'bg-blue-50 text-blue-600' },
    { icon: Zap, title: 'Real-time Tracking', desc: 'Live updates on collection status', color: 'bg-amber-50 text-amber-600' },
    { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance', color: 'bg-purple-50 text-purple-600' },
    { icon: CheckCircle, title: 'Quality Assured', desc: 'Certified eco-friendly processes', color: 'bg-green-50 text-green-600' },
];

const quickActions = [
    { icon: AlertCircle, label: 'Submit Complaint', view: 'complaint', color: 'from-red-500 to-rose-400' },
    { icon: Calendar, label: 'Schedule Pickup', view: 'schedule-booking', color: 'from-blue-500 to-cyan-400' },
    { icon: BarChart2, label: 'View Statistics', view: 'statisticsReports', color: 'from-purple-500 to-violet-400' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' } })
};

const HomePage = ({ navigate }) => {
    const { selectedPanchayat } = usePanchayat();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [panchayatDetails, setPanchayatDetails] = useState(null);
    const [committeeMembers, setCommitteeMembers] = useState(defaultCommittee);
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;

    useEffect(() => {
        const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!selectedPanchayat?._id) {
            setCommitteeMembers(defaultCommittee);
            return;
        }
        // Fetch panchayat details
        api.get(`/panchayat/${selectedPanchayat._id}`).then((res) => {
            setPanchayatDetails(res.data);
            if (res.data.inchargeName) {
                setCommitteeMembers([
                    { name: res.data.inchargeName, designation: 'Panchayat Incharge', contact: res.data.contactPhone },
                    ...defaultCommittee.slice(1)
                ]);
            }
        }).catch(() => {});

        // Fetch leadership content from CMS if published
        api.get(`/content/public/${selectedPanchayat._id}?type=leadership`)
            .then((res) => {
                const members = res.data?.leadershipMembers;
                if (members && members.length > 0) {
                    setCommitteeMembers(members.map(m => ({
                        name: m.name,
                        designation: m.designation,
                        contact: m.contact,
                        phone: m.contact,
                    })));
                }
            })
            .catch(() => {});
    }, [selectedPanchayat]);

    return (
        <div className="overflow-x-hidden w-full">

            {/* ═══════════ HERO CAROUSEL ═══════════ */}
            <section className="relative w-full h-[450px] sm:h-[520px] md:h-[580px] bg-slate-900 overflow-hidden">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                    >
                        {/* Slide Background Image */}
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-full object-cover brightness-[0.8]"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 sm:pb-16 px-4 text-center z-20">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white drop-shadow-lg mb-3 tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="text-base sm:text-xl text-white/90 drop-shadow max-w-2xl mb-6 font-medium">
                                {slide.sub}
                            </p>
                            {!user && (
                                <button
                                    onClick={() => navigate('login-household')}
                                    className="btn-primary px-8 py-3.5 text-base font-bold shadow-2xl shadow-green-600/40 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Slide dots */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2.5 z-30">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            aria-label={`Slide ${i + 1}`}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                i === currentSlide 
                                    ? 'w-8 h-2.5 bg-green-500 shadow-md shadow-green-500/50' 
                                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                            }`}
                        />
                    ))}
                </div>

                {/* Prev/Next Navigation Controls */}
                <button
                    onClick={() => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length)}
                    aria-label="Previous Slide"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-md z-30 border border-white/10 text-lg cursor-pointer"
                >
                    ❮
                </button>
                <button
                    onClick={() => setCurrentSlide((p) => (p + 1) % slides.length)}
                    aria-label="Next Slide"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-md z-30 border border-white/10 text-lg cursor-pointer"
                >
                    ❯
                </button>
            </section>

            {/* ═══════════ QUICK ACTIONS (only if logged in) ═══════════ */}
            {user && (
                <section className="py-8 px-4 bg-white border-b border-gray-100">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-3 gap-4">
                            {quickActions.map(({ icon: Icon, label, view, color }) => (
                                <button
                                    key={view}
                                    onClick={() => navigate(view)}
                                    className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-center leading-tight">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════ FEATURES ═══════════ */}
            <section className="py-20 px-4 section-hero">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3 shadow-sm">Why EcoSyz?</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 mb-3 tracking-tight">
                            Smart. Simple. <span className="gradient-text">Sustainable.</span>
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto text-base">
                            We provide a complete waste management experience for households and communities.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="card p-7 hover:-translate-y-1 transition-all"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-4`}>
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                                <p className="text-sm text-gray-500">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ STATS ═══════════ */}
            <section className="py-16 px-4 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 shadow-inner">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: panchayatDetails?.estHouseholds || '10K+', label: 'Households Served' },
                        { num: '100%', label: 'Eco-Friendly' },
                        { num: '24/7', label: 'Support' },
                        { num: panchayatDetails?.estLabours ? `${panchayatDetails.estLabours}+` : '200+', label: 'Active Workers' },
                    ].map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <p className="text-3xl sm:text-4xl font-display font-black text-white mb-1 tracking-tight">{s.num}</p>
                            <p className="text-green-100 text-sm font-semibold">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ LEADERSHIP / COMMITTEE ═══════════ */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-3 shadow-sm">Team</span>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-900 tracking-tight">
                            {selectedPanchayat ? `${selectedPanchayat.name} Leadership` : 'Our Leadership'}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {committeeMembers.map((m, i) => (
                            <div
                                key={i}
                                className="card-premium p-6 flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4 border border-green-200 shadow-sm">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="font-bold text-gray-900 truncate w-full px-2 mb-0.5">{m.name}</p>
                                <p className="text-xs font-semibold text-green-600 mb-3">{m.designation}</p>
                                <div className="text-xs font-medium text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100 w-full">
                                    📞 {m.contact || m.phone}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA ═══════════ */}
            {!user && (
                <section className="py-20 px-4 section-alt">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="card-premium p-10 sm:p-12">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-300/40">
                                <Leaf className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900 mb-3 tracking-tight">Join the Clean Revolution</h2>
                            <p className="text-gray-500 mb-8 text-sm sm:text-base">Log in to manage pickups, track complaints, and contribute to a cleaner Panchayat.</p>
                            <button
                                onClick={() => navigate('login-household')}
                                className="btn-primary px-10 py-3.5 text-base font-bold mx-auto cursor-pointer shadow-xl shadow-green-600/30"
                            >
                                Login Now <ArrowRight className="w-5 h-5 ml-1" />
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomePage;
