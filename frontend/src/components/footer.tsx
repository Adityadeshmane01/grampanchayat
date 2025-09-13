import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterProps {
  language: string;
}

const content = {
  en: {
    contact: "Contact Information",
    address: "Village Panchayat Office, Main Road, Village Name, Taluka Maval, District Pune - 410506",
    phone: "+91 9876543210",
    email: "info@village.gov.in",
    rights: "© 2024 Village Panchayat. All rights reserved.",
    govtIndia: "Government of India",
  },
  mr: {
    contact: "संपर्क माहिती",
    address: "ग्राम पंचायत कार्यालय, मुख्य रस्ता, गावाचे नाव, तालुका मावळ, जिल्हा पुणे - ४१०५०६",
    phone: "+91 9876543210", 
    email: "info@village.gov.in",
    rights: "© २०२४ ग्राम पंचायत. सर्व हक्क राखीव.",
    govtIndia: "भारत सरकार",
  },
};

export const Footer = ({ language }: FooterProps) => {
  const t = content[language as keyof typeof content];

  return (
    <footer className="bg-govt-dark-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-govt-light-orange">
              {t.contact}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-govt-light-orange mt-1 flex-shrink-0" />
                <p className="text-sm">{t.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-govt-light-orange" />
                <p className="text-sm">{t.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-govt-light-orange" />
                <p className="text-sm">{t.email}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="text-center md:text-right">
              <div className="text-lg font-semibold text-govt-light-orange mb-2">
                {t.govtIndia}
              </div>
              <div className="flex justify-center md:justify-end mb-4">
                <div className="w-16 h-12 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded border-2 border-white"></div>
              </div>
            </div>
            
            <div className="text-center md:text-right text-sm text-gray-300">
              {t.rights}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};