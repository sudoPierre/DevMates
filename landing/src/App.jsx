import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  X, 
  Code, 
  Rocket, 
  Zap, 
  Users, 
  MessageCircle, 
  CheckCircle2, 
  Github, 
  Twitter,
  Linkedin,
  Cpu
} from 'lucide-react';

const DevMateLanding = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  // Simulation of auto-swiping cards for the hero animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would send the email to your backend/firebase
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg">
              <Cpu size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Dev Mate
            </span>
          </div>
          <button className="hidden md:block px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
            Connexion
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Bientôt disponible
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Ne codez plus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                jamais seul.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Le Tinder des projets Tech. Swipez pour rencontrer votre futur co-fondateur, développeur ou designer. 
              Un match, une discussion, un projet lancé.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-white placeholder:text-slate-500"
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 whitespace-nowrap"
              >
                {isSubmitted ? 'Inscrit !' : 'Rejoindre la liste'}
              </button>
            </form>
            <p className="text-sm text-slate-500">
              Rejoignez les +2000 devs en attente.
            </p>
          </div>

          {/* Right Visual - Phone Animation */}
          <div className="relative flex justify-center lg:justify-end z-10">
            <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
              
              {/* App UI Header */}
              <div className="absolute top-8 left-0 w-full px-6 flex justify-between items-center text-slate-400 z-10">
                <Code size={20} />
                <span className="font-semibold text-white">Dev Mate</span>
                <Users size={20} />
              </div>

              {/* Cards Container */}
              <div className="absolute inset-0 flex items-center justify-center top-10">
                {[
                  { name: "Sarah", role: "UX/UI Designer", tech: ["Figma", "React"], color: "bg-pink-500" },
                  { name: "Marc", role: "Backend Dev", tech: ["Node", "Python"], color: "bg-blue-500" },
                  { name: "Alex", role: "Fullstack", tech: ["Vue", "Laravel"], color: "bg-emerald-500" }
                ].map((card, index) => {
                  // Logic to simulate card stack
                  const isTop = index === activeCard;
                  const isBehind = index === (activeCard + 1) % 3;
                  const isHidden = index !== activeCard && !isBehind;

                  return (
                    <div 
                      key={index}
                      className={`absolute w-64 h-96 rounded-2xl bg-slate-800 border border-white/10 shadow-xl overflow-hidden transition-all duration-700 ease-in-out transform origin-bottom
                        ${isHidden ? 'opacity-0 scale-90 translate-y-10' : ''}
                        ${isBehind ? 'opacity-50 scale-95 translate-y-4 -z-10' : 'opacity-100 z-10'}
                        ${isTop ? 'translate-x-0 rotate-0' : ''}
                      `}
                      // Simulating the "Swipe Right" animation exit for the previous card would be complex without library, 
                      // so we use a simple fade/scale loop for this visual.
                      style={
                        isTop ? { animation: 'none' } : {}
                      }
                    >
                      {/* Fake Profile Image Area */}
                      <div className={`h-3/5 ${card.color} opacity-80 relative flex items-end p-4`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white">{card.name}</h3>
                          <p className="text-white/80">{card.role}</p>
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-4 space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {card.tech.map(t => (
                            <span key={t} className="px-2 py-1 bg-slate-700 rounded-md text-xs text-slate-300">{t}</span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-3">
                          Je cherche un dev pour lancer un SaaS dans la FinTech. J'ai déjà le design system prêt.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-8 left-0 w-full px-8 flex justify-center items-center gap-6">
                <button className="w-14 h-14 rounded-full bg-slate-800 border border-red-500/30 text-red-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <X size={24} />
                </button>
                <button className="w-14 h-14 rounded-full bg-slate-800 border border-green-500/30 text-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Heart size={24} fill="currentColor" className="opacity-50" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Comment ça marche ?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Fini les forums obscurs et les groupes LinkedIn inactifs.
              Dev Mate simplifie la rencontre professionnelle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} className="text-yellow-400" />,
                title: "Créez votre profil",
                desc: "Mettez en avant vos compétences (Stack), vos idées de projets ou votre portfolio."
              },
              {
                icon: <Users size={32} className="text-indigo-400" />,
                title: "Swipez les talents",
                desc: "Découvrez des profils pertinents. À droite si ça match, à gauche si ce n'est pas le bon fit."
              },
              {
                icon: <MessageCircle size={32} className="text-green-400" />,
                title: "Matchez & Discutez",
                desc: "C'est un match ? La messagerie se débloque. Commencez à construire ensemble."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Un modèle simple</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Commencez gratuitement. Passez au niveau supérieur quand votre projet devient sérieux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Card */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
                <div className="text-4xl font-bold text-slate-200">Gratuit</div>
                <p className="text-slate-500 mt-2">Pour découvrir la plateforme.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  <span>50 Swipes par jour</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  <span>Profils proposés aléatoirement</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 size={20} className="text-indigo-500" />
                  <span>Messagerie basique</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-all">
                Commencer
              </button>
            </div>

            {/* Pro Card */}
            <div className="p-8 rounded-3xl bg-slate-800 border border-indigo-500/30 relative flex flex-col shadow-2xl shadow-indigo-900/20">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                POPULAIRE
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro Founder</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">9,99€</span>
                  <span className="text-slate-400">/mois</span>
                </div>
                <p className="text-indigo-300 mt-2">Pour trouver la perle rare rapidement.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-white">
                  <Rocket size={20} className="text-indigo-400" />
                  <span className="font-medium">Swipes Illimités</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Users size={20} className="text-indigo-400" />
                  <span className="font-medium">Filtrage Avancé (Stack, Exp)</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <Zap size={20} className="text-indigo-400" />
                  <span className="font-medium">Profil mis en avant (Boost)</span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 size={20} className="text-indigo-400" />
                  <span>Badge "Vérifié"</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg">
                Devenir Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Dev Mate</span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © 2024 Dev Mate. Tous droits réservés.
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevMateLanding;
