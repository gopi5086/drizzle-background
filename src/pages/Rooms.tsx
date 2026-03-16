import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wifi, Tv, BedDouble, Car, Coffee, Wind, Droplets } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

// ── Rooms Images from asset_images ──────────────────────────────────────────
import roomStandard from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (1).jpeg";
import roomTriple from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (2).jpeg";
import roomFamily from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (44).jpeg";
import roomDeluxe from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (46).jpeg";
import heroImg from "@/asset_images/WhatsApp Image 2026-03-16 at 3.46.33 PM (52).jpeg";

interface Room {
  name: string;
  desc: string;
  price: string;
  image: string;
  amenities: string[];
}

const chennaiRooms: Room[] = [
  { name: "Standard Room", desc: "Well-furnished room ideal for business travelers, featuring smart Google TV and ergonomic work space.", price: "₹2,999", image: roomStandard, amenities: ["WiFi", "Google TV", "Work Desk", "Toiletries"] },
  { name: "Triple Room", desc: "Perfect for small groups or families, offering comfortable bedding for three with modern amenities.", price: "₹3,999", image: roomTriple, amenities: ["WiFi", "Google TV", "Extra Bed", "Toiletries"] },
  { name: "Family Room", desc: "Spacious accommodation designed for families, featuring multiple beds and extra space to relax.", price: "₹4,999", image: roomFamily, amenities: ["WiFi", "Google TV", "Spacious", "24h Hot Water"] },
  { name: "Deluxe Room", desc: "Spacious and sophisticated accommodation with upscale furnishings and prodigious hospitality.", price: "₹4,499", image: roomDeluxe, amenities: ["WiFi", "Google TV", "Mini Bar", "Laundry"] },
];

const ootyRooms: Room[] = [
  { name: "Standard Room", desc: "Individual apartment-type room with private balcony offering excellent panoramic views of the hills.", price: "₹3,499", image: roomStandard, amenities: ["Balcony", "WiFi", "Google TV", "Scenic View"] },
  { name: "Deluxe Room", desc: "Enchanting hill-view room with premium furnishings and a private balcony to enjoy the Nilgiris.", price: "₹4,999", image: roomDeluxe, amenities: ["Hill View", "Private Balcony", "Heater", "WiFi"] },
  { name: "Triple Room", desc: "Cozy mountain retreat for three, perfectly located to view the famous Nilgiris toy train.", price: "₹4,499", image: roomTriple, amenities: ["Mountain View", "Extra Bed", "Heater", "WiFi"] },
  { name: "Family Room", desc: "Large hill-station getaway for the whole family, featuring multiple beds and breathtaking views.", price: "₹5,999", image: roomFamily, amenities: ["Panoramic View", "Private Balcony", "Spacious", "WiFi"] },
];

function RoomCard({ room, location }: { room: Room; location: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={room.image} alt={`${room.name} - ${location}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 right-4 px-4 py-2 bg-background/95 backdrop-blur-sm rounded-full shadow-lg border border-border/50">
          <span className="font-serif text-xl font-bold text-primary">{room.price}</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground"> / night</span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-serif text-2xl font-bold mb-3">{room.name}</h3>
        <p className="body-text text-sm mb-6 leading-relaxed text-muted-foreground/80">{room.desc}</p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {room.amenities.map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-foreground/70">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
              {a}
            </div>
          ))}
        </div>
        <Link
          to="/rooms"
          className="block w-full text-center px-6 py-4 bg-primary text-white text-sm font-bold tracking-[0.15em] uppercase hover:bg-primary/90 transition-all duration-300 hover:shadow-lg rounded-xl"
        >
          Check Availability
        </Link>
      </div>
    </motion.div>
  );
}

export default function Rooms() {
  return (
    <div className="pt-24 min-h-screen bg-secondary/5">
      {/* ── Parallax Hero ── */}
      <section className="relative h-[45vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src={heroImg} alt="DrizzleDrop Accommodations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-5xl md:text-7xl text-white mb-4"
          >
            Our Accommodations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/90 text-lg"
          >
            Hassle-free stays with curated rooms in Chennai and Ooty.
          </motion.p>
        </div>
      </section>

      {/* Chennai */}
      <section className="py-24">
        <div className="container-luxury px-4">
          <SectionHeading label="Chennai, Tamil Nadu" title="Urban Sophistication" subtitle="3-star hospitality at Rajiv Gandhi Salai OMR IT Corridor" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {chennaiRooms.map((room) => (
              <RoomCard key={room.name + "chennai"} room={room} location="Chennai" />
            ))}
          </div>
        </div>
      </section>

      {/* Ooty */}
      <section className="py-24 bg-background">
        <div className="container-luxury px-4">
          <SectionHeading label="Udhagamandalam" title="Mountain Sanctuaries" subtitle="Hill-view apartments on the lap of mother nature" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {ootyRooms.map((room) => (
              <RoomCard key={room.name + "ooty"} room={room} location="Ooty" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
