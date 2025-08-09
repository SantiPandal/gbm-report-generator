'use client';

import { Heart, Mail, Phone, Globe, Linkedin, Twitter } from 'lucide-react';

export const EndSlide = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#2c5282] via-[#4a90e2] to-[#a7c7e7] flex flex-col" style={{ padding: '50px' }}>
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          {/* Main Thank You */}
          <div className="mb-12">
            <div className="bg-white/10 p-6 rounded-full inline-block mb-8">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6">
              GRACIAS
            </h1>
            <p className="text-2xl text-[#a7c7e7] mb-4">
              Por su confianza en nuestros análisis
            </p>
            <p className="text-lg text-white/80">
              Continuamos comprometidos con la excelencia en research M&A
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">
                ¿Tienes preguntas?
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-white">
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-[#a7c7e7]">contact@gbmreports.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white">
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Teléfono</div>
                    <div className="text-sm text-[#a7c7e7]">+52 55 1234 5678</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white">
                  <Globe className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Web</div>
                    <div className="text-sm text-[#a7c7e7]">www.gbmreports.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">
                Síguenos
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 text-white">
                  <Linkedin className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-sm text-[#a7c7e7]">@GBMReports</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white">
                  <Twitter className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Twitter</div>
                    <div className="text-sm text-[#a7c7e7]">@GBM_Research</div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-[#a7c7e7] leading-relaxed">
                Mantente al día con las últimas noticias y análisis del mercado M&A mexicano.
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-white mb-4">
              ¿Listo para el próximo reporte?
            </h3>
            <p className="text-[#a7c7e7] mb-6">
              Contáctanos para discutir tus necesidades específicas de research y 
              cómo podemos agregar valor a tus decisiones de inversión.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-white/80">
              <span>• Reports personalizados</span>
              <span>• Análisis sectorial</span>
              <span>• Due diligence support</span>
              <span>• Market intelligence</span>
            </div>
          </div>
          
          {/* Bottom Message */}
          <div className="mt-12">
            <p className="text-lg text-white/90 font-medium">
              Construyendo el futuro del M&A en México, una transacción a la vez.
            </p>
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
          <span className="text-[10px] text-white/60">9</span>
        </div>
      </div>
    </div>
  );
};