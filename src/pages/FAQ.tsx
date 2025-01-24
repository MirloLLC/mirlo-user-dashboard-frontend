import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Header from '../components/Header';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    // Agente Personal
    {
      category: "Agente Personal",
      question: "¿Qué es el Agente Personal?",
      answer: "El Agente Personal es un asistente virtual con IA que recibe todas tus llamadas. Transfiere automáticamente las llamadas de tus contactos prioritarios y evalúa inteligentemente todas las demás llamadas según tus reglas configuradas. Mantiene conversaciones naturales, toma decisiones basadas en tus preferencias y te envía resúmenes detallados de cada interacción."
    },
    {
      category: "Agente Personal",
      question: "¿Cómo configuro mi Agente Personal?",
      answer: "Puedes configurar tu Agente Personal en la sección 'Agente Personal'. Allí podrás definir el nombre, voz, contactos prioritarios, reglas de transferencia y preferencias de notificación."
    },
    {
      category: "Agente Personal",
      question: "¿Cuántos minutos de Agente Personal tengo disponibles?",
      answer: "Los minutos disponibles dependen de tu plan. Puedes ver tu consumo actual en la sección 'Eventos del Agente' o en el detalle de tu línea."
    },
    
    // Llamadas y Transferencias
    {
      category: "Llamadas y Transferencias",
      question: "¿Cómo funciona la transferencia de llamadas?",
      answer: "El Agente gestiona todas tus llamadas entrantes. Las llamadas de contactos prioritarios son transferidas automáticamente. Para las demás llamadas, el Agente evalúa cada una según tus reglas configuradas y decide si transferirla o gestionarla él mismo."
    },
    {
      category: "Llamadas y Transferencias",
      question: "¿Puedo escuchar las grabaciones de las llamadas?",
      answer: "Sí, todas las llamadas gestionadas por el Agente son grabadas. Puedes acceder a las grabaciones y transcripciones desde la sección 'Eventos del Agente'."
    },
    {
      category: "Llamadas y Transferencias",
      question: "¿Cómo configuro contactos prioritarios?",
      answer: "En la sección 'Agente Personal', encuentra 'Contactos Prioritarios'. Agrega los números que siempre quieres que sean transferidos directamente a ti."
    },

    // Notificaciones
    {
      category: "Notificaciones",
      question: "¿Cómo recibo los resúmenes de las llamadas?",
      answer: "Puedes recibir resúmenes por SMS, email o Slack. Configura tus preferencias de notificación en la sección 'Agente Personal'."
    },
    {
      category: "Notificaciones",
      question: "¿Qué información incluye el resumen de una llamada?",
      answer: "El resumen incluye el número de teléfono, duración de la llamada, motivo principal, acciones tomadas y cualquier información relevante compartida durante la conversación."
    },

    // Privacidad y Seguridad
    {
      category: "Privacidad y Seguridad",
      question: "¿Las llamadas son seguras y privadas?",
      answer: "Sí, todas las llamadas son encriptadas y manejadas con los más altos estándares de seguridad. Solo tú tienes acceso a las grabaciones y transcripciones."
    },
    {
      category: "Privacidad y Seguridad",
      question: "¿Por cuánto tiempo se guardan las grabaciones?",
      answer: "Las grabaciones se mantienen por 30 días, después de los cuales son automáticamente eliminadas por razones de privacidad."
    }
  ];

  const filteredFAQs = useMemo(() => {
    if (!searchTerm.trim()) return faqs;
    
    const searchTermLower = searchTerm.toLowerCase().trim();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTermLower) ||
      faq.answer.toLowerCase().includes(searchTermLower) ||
      faq.category.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm]);

  const categories = useMemo(() => 
    Array.from(new Set(filteredFAQs.map(faq => faq.category)))
  , [filteredFAQs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpenItem(null); // Reset open items when searching
  };

  return (
    <div className="lg:ml-64 p-4 md:p-8">
      <Header 
        title="Preguntas frecuentes" 
        subtitle="Encuentra respuestas a las preguntas más comunes sobre tu Agente Personal"
      />

      <div className="max-w-3xl mx-auto">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar en preguntas, respuestas o categorías..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map(category => {
              const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">{category}</h2>
                  <div className="space-y-4">
                    {categoryFAQs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                      >
                        <button
                          className="w-full flex justify-between items-start text-left group"
                          onClick={() => setOpenItem(openItem === `${category}-${index}` ? null : `${category}-${index}`)}
                        >
                          <span className="font-medium text-gray-900 group-hover:text-brand transition-colors">
                            {faq.question}
                          </span>
                          {openItem === `${category}-${index}` ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 mt-1 group-hover:text-brand transition-colors" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 mt-1 group-hover:text-brand transition-colors" />
                          )}
                        </button>
                        {openItem === `${category}-${index}` && (
                          <p className="mt-4 text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;