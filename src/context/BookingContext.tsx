import React, { createContext, useContext, useState } from "react";

interface BookingContextType {
    isModalOpen: boolean;
    openBooking: () => void;
    closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openBooking = () => setIsModalOpen(true);
    const closeBooking = () => setIsModalOpen(false);

    return (
        <BookingContext.Provider value={{ isModalOpen, openBooking, closeBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
