import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VillageInfo from "./pages/VillageInfo"
import { useState } from "react";
import ImportantNumbers from "./pages/ImportantNumbers";
import { Officers } from "./pages/Officers";

const queryClient = new QueryClient();

const App = () => {
  const [language,setLanguage]=useState('en')
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index language={language} setLanguage={setLanguage}  />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />


          <Route path="/officers" element={
            <Officers language={language} setLanguage={setLanguage}/>
          } />


          <Route path="/villageinfo" element={<VillageInfo language={language} setLanguage={setLanguage}/>}/>
           <Route path="/importantnumbers" element={<ImportantNumbers language={language} setLanguage={setLanguage}/>}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  )
};

export default App;


