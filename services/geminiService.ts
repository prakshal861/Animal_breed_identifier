import { GoogleGenAI, Type } from "@google/genai";
import type { AnimalInfo } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const getAnimalInfo = async (
    imageFile: File,
    location: { latitude: number; longitude: number } | null
): Promise<AnimalInfo> => {
  try {
    const base64Image = await fileToBase64(imageFile);

    const imagePart = {
      inlineData: {
        mimeType: imageFile.type,
        data: base64Image,
      },
    };
    
    let locationPrompt: string;
    if (location) {
        locationPrompt = `The user is approximately at latitude ${location.latitude} and longitude ${location.longitude}. Based on this, generate a list of 3-4 hypothetical but realistic-sounding nearby pet supply stores with addresses and star ratings (out of 5). Also, generate a list of 2-3 hypothetical nearby veterinary hospitals with addresses and operating hours. Ensure the generated names and addresses sound plausible for a general area. IMPORTANTLY, also identify the user's likely country and region to provide contact information for 1-2 major, real national or regional animal welfare organizations or official animal control resources (e.g., ASPCA for the US, RSPCA for the UK). For each, include the organization's name, a valid contact number or website, and a brief description of what they do.`;
    } else {
        locationPrompt = "The user has not provided their location. Please generate generic, illustrative examples for nearby pet stores and vets instead of a location-specific list. Omit the local welfare section.";
    }

    const textPart = {
      text: `Analyze this image to identify the animal's breed or species. Be comprehensive; this includes common pets like cats and dogs, but also birds, reptiles, farm animals, and other wildlife. If it's a mixed breed, please state that. Provide a full profile including its history, temperament, physical characteristics (lifespan, height, weight), origin, and diet. Also, estimate the animal's age based on visual evidence (e.g., 'Kitten, 3-6 months', 'Adult, 5-7 years'). Provide detailed care requirements, including diet, exercise, and grooming. Describe common health issues. Finally, provide a typical hygiene/grooming schedule with tasks (like bathing, brushing) and their frequencies. ${locationPrompt} IMPORTANT: Do not provide specific medical advice. Instead, describe potential health concerns and strongly recommend consulting a qualified veterinarian. Provide your analysis in the required JSON format. The confidence score should be your estimated certainty from 0.0 to 1.0.`,
    };

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        breed: { type: Type.STRING, description: "The identified breed or species of the animal." },
        confidence: { type: Type.NUMBER, description: "A confidence score between 0.0 and 1.0." },
        description: { type: Type.STRING, description: "A brief, one-paragraph description of the animal's breed or species, its history, and key characteristics." },
        temperament: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 3-5 keywords describing the typical temperament." },
        funFact: { type: Type.STRING, description: "A single, interesting, and fun fact about the breed or species." },
        lifespan: { type: Type.STRING, description: "The average lifespan, e.g., '10-12 years'." },
        size: {
            type: Type.OBJECT,
            properties: {
                height: { type: Type.STRING, description: "Typical height range, e.g., '22-24 inches'." },
                weight: { type: Type.STRING, description: "Typical weight range, e.g., '65-75 lbs'." }
            },
            required: ["height", "weight"]
        },
        origin: { type: Type.STRING, description: "The country or region of origin." },
        diet: { type: Type.STRING, description: "The primary diet of the animal." },
        careAndNeeds: { type: Type.STRING, description: "A paragraph describing general care, including diet, exercise, and grooming needs." },
        commonHealthIssues: { type: Type.STRING, description: "A paragraph describing common health problems. Must include a recommendation to see a vet." },
        estimatedAge: { type: Type.STRING, description: "An estimated age range for the animal based on the image." },
        hygieneSchedule: {
            type: Type.ARRAY,
            description: "A schedule of common hygiene tasks and their frequencies.",
            items: {
                type: Type.OBJECT,
                properties: {
                    task: { type: Type.STRING },
                    frequency: { type: Type.STRING }
                },
                required: ["task", "frequency"]
            }
        },
        nearbyStores: {
            type: Type.ARRAY,
            description: "An optional list of hypothetical nearby pet supply stores.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    address: { type: Type.STRING },
                    rating: { type: Type.NUMBER, description: "A rating out of 5, e.g. 4.5" }
                },
                required: ["name", "address", "rating"]
            }
        },
        vetHospitals: {
            type: Type.ARRAY,
            description: "An optional list of hypothetical nearby veterinary hospitals.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    address: { type: Type.STRING },
                    hours: { type: Type.STRING, description: "Operating hours, e.g., 'Mon-Fri 9am-6pm'" }
                },
                required: ["name", "address", "hours"]
            }
        },
        localWelfare: {
            type: Type.ARRAY,
            description: "An optional list of real, major animal welfare organizations or official resources relevant to the user's location.",
            items: {
                type: Type.OBJECT,
                properties: {
                    organizationName: { type: Type.STRING },
                    contactInfo: { type: Type.STRING, description: "A valid phone number or website." },
                    description: { type: Type.STRING, description: "A brief description of the organization." }
                },
                required: ["organizationName", "contactInfo", "description"]
            }
        }
      },
      required: ["breed", "confidence", "description", "temperament", "funFact", "lifespan", "size", "origin", "diet", "careAndNeeds", "commonHealthIssues", "estimatedAge", "hygieneSchedule"],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Basic validation for required fields. `nearbyStores`, `vetHospitals`, and `localWelfare` are now optional.
    if (
      typeof parsedData.breed === 'string' &&
      typeof parsedData.confidence === 'number' &&
      typeof parsedData.description === 'string' &&
      Array.isArray(parsedData.temperament) &&
      typeof parsedData.funFact === 'string' &&
      typeof parsedData.lifespan === 'string' &&
      typeof parsedData.size === 'object' &&
      parsedData.size !== null &&
      typeof parsedData.size.height === 'string' &&
      typeof parsedData.size.weight === 'string' &&
      typeof parsedData.origin === 'string' &&
      typeof parsedData.diet === 'string' &&
      typeof parsedData.careAndNeeds === 'string' &&
      typeof parsedData.commonHealthIssues === 'string' &&
      typeof parsedData.estimatedAge === 'string' &&
      Array.isArray(parsedData.hygieneSchedule) &&
      // Optional fields: check if they are arrays if they exist, but don't fail if they don't.
      (parsedData.nearbyStores === undefined || Array.isArray(parsedData.nearbyStores)) &&
      (parsedData.vetHospitals === undefined || Array.isArray(parsedData.vetHospitals)) &&
      (parsedData.localWelfare === undefined || Array.isArray(parsedData.localWelfare))
    ) {
      return parsedData as AnimalInfo;
    } else {
      throw new Error("API response does not match the expected format.");
    }

  } catch (error) {
    console.error("Error identifying animal breed:", error);
    if (error instanceof Error) {
       throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image analysis.");
  }
};