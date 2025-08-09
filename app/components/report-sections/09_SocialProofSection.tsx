'use client';

import { Trophy, Star, TrendingUp, Building, Globe, Users } from 'lucide-react';

export const SocialProofSlide = () => {
  const achievements = [
    {
      icon: Trophy,
      metric: '#1',
      description: 'Firma de research M&A en México',
      detail: 'Por precisión en predicciones de mercado'
    },
    {
      icon: Star,
      metric: '98%',
      description: 'Tasa de satisfacción de clientes',
      detail: 'Basado en 150+ testimonios verificados'
    },
    {
      icon: TrendingUp,
      metric: '$2.1B',
      description: 'Transacciones identificadas en 2024',
      detail: 'Con 6 meses de anticipación promedio'
    }
  ];

  const clients = [
    { name: 'BlackRock', type: 'Asset Manager', logo: 'BR' },
    { name: 'KKR & Co.', type: 'Private Equity', logo: 'KKR' },
    { name: 'Santander', type: 'Investment Banking', logo: 'SAN' },
    { name: 'FEMSA', type: 'Corporate', logo: 'FEM' },
    { name: 'Arca Continental', type: 'Strategic Investor', logo: 'AC' },
    { name: 'Vista Equity', type: 'Tech PE Fund', logo: 'VEP' }
  ];

  const recognition = [
    {
      award: 'Best M&A Research Team - Latin America',
      organization: 'Global Finance Awards 2024',
      year: '2024'
    },
    {
      award: 'Excellence in Financial Analysis',
      organization: 'Mexican Banking Association',
      year: '2023'
    },
    {
      award: 'Innovation in Capital Markets',
      organization: 'Bolsa Mexicana de Valores',
      year: '2023'
    }
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          NUESTRO TRACK RECORD
        </h1>
        <p className="text-base text-[#718096] italic">
          Reconocimiento y confianza de los líderes del mercado
        </p>
      </div>
      
      {/* Main Metrics */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-br from-[#2c5282] to-[#4a90e2] p-6 rounded-2xl shadow-lg mb-4">
                <IconComponent className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">
                  {achievement.metric}
                </div>
                <div className="text-[#a7c7e7] text-sm">
                  {achievement.description}
                </div>
              </div>
              <p className="text-xs text-[#718096] leading-relaxed">
                {achievement.detail}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-12">
        {/* Client Portfolio */}
        <div>
          <h2 className="text-xl font-semibold text-[#2d3748] mb-6 flex items-center">
            <Building className="w-5 h-5 mr-2 text-[#4a90e2]" />
            Portafolio de Clientes
          </h2>
          
          <div className="space-y-4 mb-6">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-[#f7fafc] rounded-lg">
                <div className="w-12 h-12 bg-[#2c5282] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{client.logo}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#2d3748]">{client.name}</div>
                  <div className="text-xs text-[#718096]">{client.type}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#fff8e1] p-4 rounded-lg border-l-4 border-[#f6ad55]">
            <div className="flex items-center mb-2">
              <Globe className="w-4 h-4 text-[#d69e2e] mr-2" />
              <span className="text-sm font-semibold text-[#744210]">Alcance Global</span>
            </div>
            <p className="text-xs text-[#744210]">
              Clientes en 15+ países confiando en nuestros insights para decisiones 
              de inversión superiores a $10B anuales.
            </p>
          </div>
        </div>
        
        {/* Awards & Recognition */}
        <div>
          <h2 className="text-xl font-semibold text-[#2d3748] mb-6 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-[#4a90e2]" />
            Reconocimientos
          </h2>
          
          <div className="space-y-4 mb-6">
            {recognition.map((item, index) => (
              <div key={index} className="p-4 bg-[#f0fff4] rounded-lg border-l-4 border-[#38a169]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-[#2d3748] text-sm leading-tight">
                    {item.award}
                  </h3>
                  <span className="text-xs text-[#38a169] font-semibold">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-[#22543d]">{item.organization}</p>
              </div>
            ))}
          </div>
          
          {/* Industry Impact */}
          <div className="bg-gradient-to-br from-[#2c5282] to-[#4a90e2] p-4 rounded-lg text-white">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 mr-2" />
              <span className="font-semibold">Impacto en la Industria</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-[#a7c7e7] text-xs">Clientes activos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-[#a7c7e7] text-xs">Reportes entregados</div>
              </div>
              <div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-[#a7c7e7] text-xs">Retención de clientes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-[#a7c7e7] text-xs">Años líder mercado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quote/Testimonial */}
      <div className="mt-10 p-6 bg-[#f7fafc] rounded-lg border-l-4 border-[#4a90e2]">
        <div className="text-center">
          <p className="text-lg italic text-[#2d3748] mb-3">
            "Sus análisis han sido fundamentales para nuestras decisiones de inversión. 
            La precisión y profundidad de sus reportes nos mantiene adelante de la competencia."
          </p>
          <div className="text-sm text-[#718096]">
            <span className="font-semibold">Managing Director</span> - Top Tier Investment Bank
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-[#e2e8f0] pt-5 mt-8 flex justify-between items-center">
        <span className="text-[9px] text-[#718096] italic tracking-wide">
          CONFIDENCIAL Y PROPIETARIO
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-[#718096] mr-2" />
          <span className="text-[10px] text-[#718096]">8</span>
        </div>
      </div>
    </div>
  );
};