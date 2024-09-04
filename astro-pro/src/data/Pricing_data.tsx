interface PricingOption {
    title: string;
    description: string;
    price: string;
    features: string[];
  }
  
  export const pricingData: PricingOption[] = [
    {
      title: "Make Your Kundali",
      description: "Get a personalized Kundali report based on your birth details.",
      price: "$49",
      features: ["Detailed Kundali report ✅", "Personalized insights ✅", "PDF format ✅"],
    },
    {
      title: "Make Fortune Report",
      description: "Unlock your fortune with this comprehensive report.",
      price: "$49",
      features: ["Yearly predictions ✅", "Astrological advice ✅", "PDF format ✅"],
    },
    {
      title: "Make Vastu for Your Home",
      description: "Ensure positive energy in your home with a Vastu consultation.",
      price: "$49",
      features: ["Home Vastu analysis ✅", "Customized suggestions ✅", "PDF format ✅"],
    },
    {
      title: "All-in-One Pack - (Most Popular)",
      description: "Get all the services in one package for a special price.",
      price: "$99",
      features: ["Kundali report ✅", "Fortune report ✅", "Home Vastu consultation ✅"],
    },
  ];
  