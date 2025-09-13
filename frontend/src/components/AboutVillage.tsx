import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, TreePine, Wheat } from "lucide-react";

interface AboutVillageProps {
  language: string;
}

const content = {
  en: {
    title: "About Our Village",
    description: "Nestled in the heart of Maharashtra, our village represents the perfect blend of traditional values and modern progress. With a rich agricultural heritage and strong community bonds, we continue to thrive while preserving our cultural identity.",
    location: {
      title: "Location",
      details: "District: Pune, Taluka: Maval, Pin: 410506",
    },
    established: {
      title: "Established",
      details: "Founded in 1847, our village has 175+ years of history",
    },
    agriculture: {
      title: "Agriculture",
      details: "Primary crops: Rice, Wheat, Sugarcane, Vegetables",
    },
    culture: {
      title: "Culture",
      details: "Festivals: Ganesh Chaturthi, Diwali, Gudi Padwa, Harvest Festival",
    },
  },
  mr: {
    title: "आमच्या गावाबद्दल",
    description: "महाराष्ट्राच्या हृदयात वसलेले, आमचे गाव पारंपारिक मूल्ये आणि आधुनिक प्रगतीचे परिपूर्ण मिश्रण दर्शवते. समृद्ध कृषी वारसा आणि मजबूत सामुदायिक बंधनांसह, आम्ही आमची सांस्कृतिक ओळख जपत भरभराट करत आहोत.",
    location: {
      title: "स्थान",
      details: "जिल्हा: पुणे, तालुका: मावळ, पिन: ४१०५०६",
    },
    established: {
      title: "स्थापना",
      details: "१८४७ मध्ये स्थापित, आमच्या गावाला १७५+ वर्षांचा इतिहास आहे",
    },
    agriculture: {
      title: "शेती",
      details: "मुख्य पिके: तांदूळ, गहू, ऊस, भाजीपाला",
    },
    culture: {
      title: "संस्कृती",
      details: "सण: गणेश चतुर्थी, दिवाळी, गुढी पाडवा, कापणी उत्सव",
    },
  },
};

export const AboutVillage = ({ language }: AboutVillageProps) => {
  const t = content[language as keyof typeof content];

  const features = [
    {
      title: t.location.title,
      details: t.location.details,
      icon: MapPin,
      color: "text-govt-orange",
    },
    {
      title: t.established.title,
      details: t.established.details,
      icon: Calendar,
      color: "text-govt-blue",
    },
    {
      title: t.agriculture.title,
      details: t.agriculture.details,
      icon: Wheat,
      color: "text-govt-orange",
    },
    {
      title: t.culture.title,
      details: t.culture.details,
      icon: TreePine,
      color: "text-govt-blue",
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-govt-dark-blue mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            {t.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-govt-orange/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <span className="text-govt-dark-blue">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};