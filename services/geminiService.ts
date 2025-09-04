import type { AnimalInfo } from '../types';

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

    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image,
        mimeType: imageFile.type,
        location,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from server.' }));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const parsedData = await response.json();
    
    // Basic validation for required fields. `nearbyStores`, `vetHospitals`, and `localWelfare` are optional.
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
