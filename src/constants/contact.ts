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