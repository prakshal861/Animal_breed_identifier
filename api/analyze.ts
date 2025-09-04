import { GoogleGenAI, Type } from "@google/genai";
import type { AnimalInfo } from '../types';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
    }

    try {
        const { base64Image, mimeType, location } = await req.json();

        if (!base64Image || !mimeType) {
            return new Response(JSON.stringify({ error: 'Missing image data' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
            console.error("API_KEY environment variable not set on server");
            return new Response(JSON.stringify({ error: 'Server configuration error: API key not found.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const imagePart = {
            inlineData: {
                mimeType: mimeType,
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
                breed: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                description: { type: Type.STRING },
                temperament: { type: Type.ARRAY, items: { type: Type.STRING } },
                funFact: { type: Type.STRING },
                lifespan: { type: Type.STRING },
                size: { type: Type.OBJECT, properties: { height: { type: Type.STRING }, weight: { type: Type.STRING } }, required: ["height", "weight"] },
                origin: { type: Type.STRING },
                diet: { type: Type.STRING },
                careAndNeeds: { type: Type.STRING },
                commonHealthIssues: { type: Type.STRING },
                estimatedAge: { type: Type.STRING },
                hygieneSchedule: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { task: { type: Type.STRING }, frequency: { type: Type.STRING } }, required: ["task", "frequency"] } },
                nearbyStores: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, address: { type: Type.STRING }, rating: { type: Type.NUMBER } }, required: ["name", "address", "rating"] } },
                vetHospitals: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, address: { type: Type.STRING }, hours: { type: Type.STRING } }, required: ["name", "address", "hours"] } },
                localWelfare: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { organizationName: { type: Type.STRING }, contactInfo: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["organizationName", "contactInfo", "description"] } }
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
        
        // Return the valid JSON response from Gemini directly to the client
        return new Response(jsonText, { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Error in /api/analyze:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return new Response(JSON.stringify({ error: `Server error during analysis: ${errorMessage}` }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
