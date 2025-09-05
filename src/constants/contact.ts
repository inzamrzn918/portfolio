import { Mail } from "lucide-react";
import { ContactMethod } from "../types/interface";
// Adjust the path as necessary

export const CONTACT_METHODS: ContactMethod[] = [
    {
      id: '1',
      type: 'email',
      value: 'inzamol@gmail.com',
      icon: Mail,
      href: 'mailto:inzamol@gmail.com'
    },
    // ... other contact methods
  ];

export const contact = {
  email: "inzamol@gmail.com",
  phone: "+918402098761",
  github: "https://github.com/inzamrzn918",
  linkedin: "https://linkedin.com/in/inzamol",
  location: "Bengaluru, Karnataka"
};