export const translations = {
    en: {
        citizens: "For the Public",
        business: "For Organizations",
        insights: "Insights",
        verify: "Verify Certificate",
        hero_title: "South Africa's Standard for AI Integrity.",
        hero_desc: "We certify the humans accountable for algorithmic outcomes.",
        take_assessment: "Take Self-Assessment",
        join_alpha: "Join Alpha Program"
    },
    af: {
        citizens: "Vir die Publiek",
        business: "Vir Organisasies",
        insights: "Insigte",
        verify: "Verifieer Sertifikaat",
        hero_title: "Suid-Afrika se Standaard vir KI-Integriteit.",
        hero_desc: "Ons sertifiseer die mense wat verantwoordelik is vir algoritmiese uitkomste.",
        take_assessment: "Neem Self-Assessering",
        join_alpha: "Sluit aan by Alpha"
    },
    zu: {
        citizens: "Okomphakathi",
        business: "Okwezinhlangano",
        insights: "Ulwazi",
        verify: "Qinisekisa Isitifiketi",
        hero_title: "Izinga laseNingizimu Afrika le-AI Integrity.",
        hero_desc: "Siqinisekisa abantu ababhekele imiphumela ye-algorithm.",
        take_assessment: "Thatha Ukuzihlola",
        join_alpha: "Joyina i-Alpha"
    }
} as const;

export type Language = keyof typeof translations;
