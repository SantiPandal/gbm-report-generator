'use client';

import { Users, Award, Target, TrendingUp } from 'lucide-react';

export const EquipoSlide = () => {
  const teamMembers = [
    {
      name: 'Carlos Mendoza',
      role: 'Managing Director',
      experience: '15+ años en M&A',
      background: 'Ex-Goldman Sachs, Wharton MBA',
      specialization: 'Transacciones cross-border'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Senior Vice President',
      experience: '12+ años en banca de inversión',
      background: 'Ex-JPMorgan, ITAM CPA',
      specialization: 'Sectores industriales'
    },
    {
      name: 'Roberto Silva',
      role: 'Director de Análisis',
      experience: '10+ años en research',
      background: 'Ex-McKinsey, MIT PhD',
      specialization: 'Modelaje financiero'
    },
    {
      name: 'María González',
      role: 'VP Desarrollo de Negocios',
      experience: '8+ años en corporate finance',
      background: 'Ex-BBVA, London Business School',
      specialization: 'Mercados emergentes'
    }
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2d3748] mb-2">
          NUESTRO EQUIPO
        </h1>
        <p className="text-base text-[#718096] italic">
          Expertos en M&A con trayectoria en las principales firmas globales
        </p>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Team Grid */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-[#f7fafc] p-6 rounded-lg border-l-4 border-[#4a90e2]">
              <div className="flex items-start space-x-4">
                <div className="bg-[#2c5282] p-3 rounded-full">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#2d3748] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-[#4a90e2] mb-2">
                    {member.role}
                  </p>
                  <div className="space-y-1 text-xs text-[#718096]">
                    <div>• {member.experience}</div>
                    <div>• {member.background}</div>
                    <div>• Especialidad: {member.specialization}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Capabilities */}
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#2c5282] p-4 rounded-full inline-block mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#2d3748] mb-2">
              Experiencia Comprobada
            </h3>
            <p className="text-sm text-[#718096] leading-relaxed">
              Más de 45 años de experiencia combinada en las principales 
              firmas de Wall Street y consultorías globales.
            </p>
            <div className="mt-3 text-2xl font-bold text-[#4a90e2]">
              $50B+
            </div>
            <div className="text-xs text-[#718096]">
              en transacciones ejecutadas
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-[#4a90e2] p-4 rounded-full inline-block mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#2d3748] mb-2">
              Enfoque Especializado
            </h3>
            <p className="text-sm text-[#718096] leading-relaxed">
              Conocimiento profundo del mercado mexicano con perspectiva 
              global y redes internacionales.
            </p>
            <div className="mt-3 text-2xl font-bold text-[#4a90e2]">
              200+
            </div>
            <div className="text-xs text-[#718096]">
              transacciones analizadas anualmente
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-[#a7c7e7] p-4 rounded-full inline-block mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#2d3748] mb-2">
              Innovación en Análisis
            </h3>
            <p className="text-sm text-[#718096] leading-relaxed">
              Metodologías propietarias y tecnología avanzada para 
              generar insights únicos del mercado.
            </p>
            <div className="mt-3 text-2xl font-bold text-[#4a90e2]">
              24h
            </div>
            <div className="text-xs text-[#718096]">
              tiempo de respuesta promedio
            </div>
          </div>
        </div>
        
        {/* Credentials Banner */}
        <div className="mt-10 bg-gradient-to-r from-[#2c5282] to-[#4a90e2] p-6 rounded-lg">
          <div className="text-center text-white">
            <h3 className="text-lg font-semibold mb-3">
              Credenciales Académicas y Profesionales
            </h3>
            <div className="flex justify-center space-x-12 text-sm">
              <div className="text-center">
                <div className="font-semibold mb-1">Universidades</div>
                <div className="text-[#a7c7e7]">Wharton • MIT • LBS • ITAM</div>
              </div>
              <div className="text-center">
                <div className="font-semibold mb-1">Experiencia Previa</div>
                <div className="text-[#a7c7e7]">Goldman Sachs • JPMorgan • McKinsey • BBVA</div>
              </div>
              <div className="text-center">
                <div className="font-semibold mb-1">Certificaciones</div>
                <div className="text-[#a7c7e7]">CFA • CPA • FRM • MBA</div>
              </div>
            </div>
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
          <span className="text-[10px] text-[#718096]">7</span>
        </div>
      </div>
    </div>
  );
};