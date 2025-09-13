import { Card } from "@/components/ui/card";

interface VillageGalleryProps {
  language: string;
}

const content = {
  en: {
    title: "Village Gallery",
    subtitle: "Glimpses of our beautiful village and community life",
  },
  mr: {
    title: "गाव गॅलरी",
    subtitle: "आमच्या सुंदर गावाची आणि सामुदायिक जीवनाची झलक",
  },
};

// Placeholder images for the gallery
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    alt: "Village Market",
    title: "Village Market",
  },
  {
    src: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop",
    alt: "Traditional Houses",
    title: "Traditional Houses",
  },
  {
    src: "https://images.unsplash.com/photo-1578328388761-aa4f35026c25?w=600&h=400&fit=crop",
    alt: "Agricultural Fields",
    title: "Agricultural Fields",
  },
  {
    src: "https://images.unsplash.com/photo-1570197577705-99cdc4cc0b50?w=600&h=400&fit=crop",
    alt: "Community Center",
    title: "Community Center",
  },
  {
    src: "https://images.unsplash.com/photo-1583824347051-0ded66e5af23?w=600&h=400&fit=crop",
    alt: "Village Temple",
    title: "Village Temple",
  },
  {
    src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&h=400&fit=crop",
    alt: "School Building",
    title: "School Building",
  },
];

export const VillageGallery = ({ language }: VillageGalleryProps) => {
  const t = content[language as keyof typeof content];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-govt-dark-blue mb-4">{t.title}</h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card key={index} className="overflow-hidden border-govt-orange/20 hover:shadow-lg transition-shadow group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};