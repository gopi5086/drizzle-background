import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Facilities from "@/pages/Facilities";
import Rooms from "@/pages/Rooms";
import Gallery from "@/pages/Gallery";
import Dining from "@/pages/Dining";
import Deals from "@/pages/Deals";
import Overview from "@/pages/Overview";
import NotFound from "@/pages/NotFound";
import SocialFloatingIcons from "@/components/SocialFloatingIcons";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/BookingModal";
import { useBooking } from "@/context/BookingContext";

const queryClient = new QueryClient();

// Helper component to show the global booking modal
const GlobalBookingModal = () => {
  const { isModalOpen, closeBooking, initialData } = useBooking();

  return (
    <BookingModal
      isOpen={isModalOpen}
      onClose={closeBooking}
      bookingData={{
        location: initialData?.location || "DrizzleDrop Inn, Chennai",
        adults: Number(initialData?.guests) || 1,
        children: 0,
        rooms: 1,
        checkIn: initialData?.checkIn || new Date(),
        checkOut: initialData?.checkOut || new Date(new Date().setDate(new Date().getDate() + 1)),
        roomType: initialData?.roomType || "Deluxe Room"
      }}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BookingProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <SocialFloatingIcons />
          <GlobalBookingModal />
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
