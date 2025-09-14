import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "./LanguageToggle";
import { useNavigate } from "react-router-dom";

interface NavigationHeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const content = {
  en: {
    heading1:"Bramhangaon Vanas",
    heading2:"Gram Panchayat",
    officers: "Officers",
    villageInfo: "Village Information",
    importantNumbers: "Important Numbers",
    govtSchemes: "Government Schemes",
    jalJivan: "Jal Jivan Mission",
    ayog15: "15th Finance Commission",
    pmAwas: "PM Awas Yojana",
    mgnrega: "MGNREGA",
    home: "Home",
  },
  mr: {
    heading1:"ब्राह्मणगाव वनस",
    heading2:'ग्राम पंचायत',
    officers: "अधिकारी",
    villageInfo: "गाव माहिती",
    importantNumbers: "महत्वाचे नंबर",
    govtSchemes: "सरकारी योजना",
    jalJivan: "जल जीवन मिशन",
    ayog15: "१५ वा आयोग",
    pmAwas: "पंतप्रधान आवास योजना",
    mgnrega: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार",
    home: "मुख्यपृष्ठ",
  },
};

export const NavigationHeader = ({ language, onLanguageChange }: NavigationHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = content[language as keyof typeof content];
  const navigate =useNavigate();
  return (
    <header className="bg-white shadow-md border-b border-govt-orange/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="text-base font-bold text-govt-dark-blue cursor-pointer">
              <span  onClick={()=>{
                  navigate('/');
                }} className="">
                <span>
                {t.heading2}
                </span>
                <br />
                <span className='text-xl'>
                {t.heading1}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-govt-dark-blue hover:text-govt-orange">
                  {t.officers}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-govt-orange/20">
                <DropdownMenuItem>Sarpanch</DropdownMenuItem>
                <DropdownMenuItem>Upsarpanch</DropdownMenuItem>
                <DropdownMenuItem>Secretary</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              
                <Button variant="ghost" onClick={()=>{
                  navigate('/villageinfo')
                }}className="flex items-center gap-1 text-govt-dark-blue hover:text-govt-orange">
                  {t.villageInfo}
                 
                </Button>

             
            </DropdownMenu>

            <DropdownMenu>
                <Button variant="ghost" className="flex items-center gap-1 text-govt-dark-blue hover:text-govt-orange">
                  {t.importantNumbers}
                 
                </Button>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-govt-dark-blue hover:text-govt-orange">
                  {t.govtSchemes}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-govt-orange/20">
                <DropdownMenuItem>{t.jalJivan}</DropdownMenuItem>
                <DropdownMenuItem>{t.ayog15}</DropdownMenuItem>
                <DropdownMenuItem>{t.pmAwas}</DropdownMenuItem>
                <DropdownMenuItem>{t.mgnrega}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-govt-dark-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-govt-orange/20 py-4">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-govt-dark-blue">
                {t.officers}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-govt-dark-blue">
                {t.villageInfo}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-govt-dark-blue">
                {t.importantNumbers}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-govt-dark-blue">
                {t.govtSchemes}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};