import { Card, CardContent } from '@/components/ui/card';

const sarpanchImg =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';
const upsarpanchImg =
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';
const secretaryImg =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80';

interface OfficialsSectionProps {
  language: string;
}

const content = {
  en: {
    title: 'Village Officials',
    sarpanch: {
      name: 'Shri Rajesh Kumar',
      designation: 'Sarpanch',
      contact: '+91 9876543210',
      email: 'sarpanch@village.gov.in',
    },
    upsarpanch: {
      name: 'Smt. Priya Sharma',
      designation: 'Upsarpanch',
      contact: '+91 9876543211',
      email: 'upsarpanch@village.gov.in',
    },
    secretary: {
      name: 'Shri Amit Patil',
      designation: 'Village Secretary',
      contact: '+91 9876543212',
      email: 'secretary@village.gov.in',
    },
  },
  mr: {
    title: 'गाव अधिकारी',
    sarpanch: {
      name: 'श्री राजेश कुमार',
      designation: 'सरपंच',
      contact: '+91 9876543210',
      email: 'sarpanch@village.gov.in',
    },
    upsarpanch: {
      name: 'श्रीमती प्रिया शर्मा',
      designation: 'उपसरपंच',
      contact: '+91 9876543211',
      email: 'upsarpanch@village.gov.in',
    },
    secretary: {
      name: 'श्री अमित पाटील',
      designation: 'गाव सचिव',
      contact: '+91 9876543212',
      email: 'secretary@village.gov.in',
    },
  },
};

export const OfficialsSection = ({ language }: OfficialsSectionProps) => {
  const t = content[language as keyof typeof content];

  const officials = [
    { ...t.sarpanch, image: sarpanchImg },
    { ...t.upsarpanch, image: upsarpanchImg },
    { ...t.secretary, image: secretaryImg },
  ];

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-govt-dark-blue mb-8">
          {t.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officials.map((official, index) => (
            <Card
              key={index}
              className="text-center border-govt-orange/20 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <img
                    src={official.image}
                    alt={official.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-govt-orange/20"
                  />
                </div>
                <h3 className="text-xl font-semibold text-govt-dark-blue mb-2">
                  {official.name}
                </h3>
                <p className="text-govt-orange font-medium mb-3">
                  {official.designation}
                </p>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>{official.contact}</p>
                  <p>{official.email}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
