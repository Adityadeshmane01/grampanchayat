import { NavigationHeader } from "@/components/NavigationHeader"
interface LanguageProps {
  language: string;
  setLanguage: (s: "en" | "mr") => void;
}


export const Officers=({ language, setLanguage }: LanguageProps)=>{


    return(
        <div>
            <NavigationHeader onLanguageChange={setLanguage} language={language}/>
        </div>
    )
}