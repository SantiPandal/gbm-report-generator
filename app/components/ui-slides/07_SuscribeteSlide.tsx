'use client';

import { Mail, TrendingUp, BarChart3, Globe } from 'lucide-react';

export const SuscribeteSlide = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#2c5282] to-[#4a90e2] flex flex-col" style={{ padding: '50px' }}>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          SUSCRÍBETE A NUESTROS REPORTES
        </h1>
        <p className="text-xl text-[#a7c7e7]">Análisis exclusivos del mercado M&A mexicano</p>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-2 gap-16">
            {/* Left side - Benefits */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                ¿Qué obtienes?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Análisis de Tendencias
                    </h3>
                    <p className="text-[#a7c7e7] text-sm leading-relaxed">
                      Reportes mensuales con las últimas tendencias del mercado M&A, 
                      sectores emergentes y oportunidades de inversión.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Data Exclusiva
                    </h3>
                    <p className="text-[#a7c7e7] text-sm leading-relaxed">
                      Acceso a bases de datos propietarias con más de 5,000 
                      transacciones analizadas desde 2020.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Perspectiva Global
                    </h3>
                    <p className="text-[#a7c7e7] text-sm leading-relaxed">
                      Comparativas internacionales y análisis de la posición 
                      competitiva de México en el mercado global.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - CTA */}
            <div className="flex flex-col justify-center">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="bg-[#2c5282] p-4 rounded-full inline-block mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3748] mb-2">
                    Contáctanos
                  </h3>
                  <p className="text-[#718096]">
                    Para recibir nuestros reportes exclusivos
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-[#2c5282] mb-1">
                      contact@gbmreports.com
                    </div>
                    <div className="text-sm text-[#718096]">
                      Respuesta en menos de 24 horas
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="text-center">
                      <div className="text-sm text-[#718096] mb-2">
                        O llámanos directamente:
                      </div>
                      <div className="text-lg font-semibold text-[#2c5282]">
                        +52 55 1234 5678
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-center space-x-6 text-xs text-[#718096]">
                    <span>• Reportes mensuales</span>
                    <span>• Data en tiempo real</span>
                    <span>• Consultoría especializada</span>
                  </div>
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-8 text-center">
                <div className="text-white/80 text-sm mb-2">
                  Confían en nosotros:
                </div>
                <div className="flex justify-center space-x-8 text-white/60 text-xs">
                  <span>Fortune 500</span>
                  <span>Fondos de PE</span>
                  <span>Bancos de Inversión</span>
                  <span>Family Offices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-white/20 pt-5 mt-8 flex justify-between items-center">
        <span className="text-[9px] text-white/60 italic tracking-wide">
          CONFIDENCIAL Y PROPIETARIO
        </span>
        <div className="flex items-center">
          <div className="w-5 h-px bg-white/40 mr-2" />
          <span className="text-[10px] text-white/60">6</span>
        </div>
      </div>
    </div>
  );
};