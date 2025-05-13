import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebinarList from "./pages/WebinarList";
import WebinarDetail from "./pages/WebinarDetail";
import CalendarPage from "./pages/Calendar";
import PrivateRoute from "./keycloak/PrivateRoute";
import Unhauthorized from "./pages/Unhauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute roles={["apprenant", "admin"]}>
                  <Index />
                </PrivateRoute>
              }
            />
            <Route
              path="/webinaires"
              element={
                <PrivateRoute roles={["apprenant", "admin"]}>
                  <WebinarList />
                </PrivateRoute>
              }
            />
            <Route
              path="/webinaire/:webinaireId"
              element={
                <PrivateRoute roles={["apprenant", "admin"]}>
                  <WebinarDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendrier"
              element={
                <PrivateRoute roles={["apprenant", "admin"]}>
                  <CalendarPage />
                </PrivateRoute>
              }
            />
            <Route path="/unauthorized" element={<Unhauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
