import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import {
  Wifi, Car, Utensils, Flame, Droplets, Globe, Trophy, Baby,
  Stethoscope, Key, Shirt, Sparkles, Zap, Coffee, Wind, Tv
} from "lucide-react";

const facilities = [
  { title: "CAR PARKING", icon: Car, desc: "Ample private car parking" },
  { title: "WIFI CONNECTIVITY", icon: Wifi, desc: "High-speed wireless internet" },
  { title: "RESTAURANT", icon: Utensils, desc: "In-house rooftop dining" },
  { title: "BARBEQUE", icon: Utensils, desc: "Barbeque with music on request" },
  { title: "BONFIRE", icon: Flame, desc: "Campfire at the lawn" },
  { title: "HOT WATER", icon: Droplets, desc: "24 hours hot water supply" },
  { title: "TRAVEL DESK", icon: Globe, desc: "Travel and tour assistance" },
  { title: "BASKETBALL", icon: Trophy, desc: "On-site basketball court" },
  { title: "PLAY AREA", icon: Baby, desc: "Dedicated children's play area" },
  { title: "DOCTOR ON-CALL", icon: Stethoscope, desc: "Emergency medical assistance" },
  { title: "CAR RENTAL", icon: Key, desc: "Hassle-free vehicle hire" },
  { title: "LAUNDRY", icon: Shirt, desc: "Professional cleaning services" },
  { title: "TOILETRIES", icon: Sparkles, desc: "Premium bath amenities" },
  { title: "ROOM HEATER", icon: Zap, desc: "Available on request" },
  { title: "KETTLE", icon: Coffee, desc: "In-room tea/coffee maker" },
  { title: "HAIR DRYER", icon: Wind, desc: "Available on request" },
  { title: "GOOGLE TV", icon: Tv, desc: "Smart flat screen entertainment" },
  { title: "POWER BACKUP", icon: Zap, desc: "Full electricity backup" },
];

export default function Facilities() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="container-luxury">
          <SectionHeading
            label="Amenities"
            title="Premium Hospitality Facilities"
            subtitle="DrizzleDrop Inn combines the art of tradition with modern international facilities to ensure a comfortable stay."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border/20 border border-border/20">
            {facilities.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="bg-background p-8 flex flex-col items-center justify-center text-center group hover:bg-secondary/10 transition-all duration-500 cursor-default"
              >
                <f.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-4 transition-colors duration-300 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-foreground/80 group-hover:text-primary transition-colors duration-300">{f.title}</span>
                <span className="text-xs text-muted-foreground mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{f.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Section */}
      <section className="section-padding bg-secondary/5">
        <div className="container-luxury text-center max-w-3xl">
          <h2 className="heading-section mb-6">Cleanliness & Safety</h2>
          <p className="body-text mb-8 italic">
          "We have formulated and enhanced our cleaning Operating Procedures at all our resorts which encompasses cleaning, sanitizing and checking, as a set of comprehensive procedures."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div className="bg-background p-6 rounded-lg border border-border/50 shadow-sm flex-1">
                <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Sanitized</h3>
                <p className="text-sm text-muted-foreground">Comprehensive sanitization of all high-touch points.</p>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border/50 shadow-sm flex-1">
                <UserCheck className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Checked</h3>
                <p className="text-sm text-muted-foreground">Multi-point hygiene inspections before guest arrival.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper to avoid build error
const UserCheck = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
