export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    responsibilities: string[];
  }
  
  export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    year: string;
    details: string[];
  }
  
  export interface Skill {
    id: string;
    category: string;
    icon: React.ElementType;
    items: string[];
  }
  
  export interface ContactMethod {
    id: string;
    type: 'email' | 'phone' | 'linkedin' | 'github';
    value: string;
    icon: React.ElementType;
    href: string;
  }