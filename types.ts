export interface WelfareContact {
  organizationName: string;
  contactInfo: string; // e.g., "1-800-XXX-XXXX" or "www.example.com"
  description: string;
}

export interface Store {
  name: string;
  address: string;
  rating: number; // e.g., 4.5
}

export interface VetHospital {
  name: string;
  address: string;
  hours: string; // e.g., "Mon-Fri 9am-6pm"
}

export interface AnimalInfo {
  breed: string;
  confidence: number;
  description: string;
  temperament: string[];
  funFact: string;
  lifespan: string;
  size: {
    height: string;
    weight: string;
  };
  origin: string;
  diet: string;
  careAndNeeds: string;
  commonHealthIssues: string;
  estimatedAge: string;
  hygieneSchedule: {
    task: string;
    frequency: string;
  }[];
  nearbyStores: Store[];
  vetHospitals: VetHospital[];
  localWelfare?: WelfareContact[];
}
