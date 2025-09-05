import { Code } from "lucide-react";
import { Skill } from "../types/interface";

export const skills: Skill[] = [
  {
    id: '1',
    category: 'Programming & Frameworks',
    icon: Code,
    items: ['Python', 'Django', 'FastAPI', 'Golang']
  },
  {
    id: '2',
    category: 'Languages',
    icon: Code,
    items: ['Python', 'JavaScript', 'Node.js', 'SQL']
  },
  {
    id: '3',
    category: 'Frameworks',
    icon: Code,
    items: ['Django', 'FastAPI', 'Flask', 'Django REST Framework', 'React']
  },
  // Add other skill categories...
];