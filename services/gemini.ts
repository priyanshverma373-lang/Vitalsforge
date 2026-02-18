import { GoogleGenAI, Type } from "@google/genai";
import { EmergencyType, EmergencyGuide } from "../types";

const SYSTEM_INSTRUCTION = `
You are a critical emergency response assistant.
Your goal is to provide immediate, calm, and concise safety actionable steps based on the user's situation and location.
Prioritize brevity. Use simple language.
Output MUST be structured JSON.
`;

export const getEmergencyGuidance = async (
  lat: number,
  lng: number,
  type: EmergencyType
): Promise<EmergencyGuide> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Fallback if no API key is present (for development safety/demo purposes)
    if (!process.env.API_KEY) {
        console.warn("No API Key found. Returning mock data.");
        throw new Error("API Key missing");
    }

    const prompt = `
      User Location: Latitude ${lat}, Longitude ${lng}.
      Emergency Type: ${type}.
      
      Provide a safety checklist.
      Determine the likely emergency number for this region (default to 911 if unknown).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            immediateActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            safetyTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            emergencyServicesNumber: { type: Type.STRING }
          },
          required: ["title", "immediateActions", "safetyTips", "emergencyServicesNumber"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as EmergencyGuide;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a safe fallback in case of API failure - Critical for emergency apps
    return {
      title: "Connection Failed - Protocol",
      immediateActions: [
        "Dial emergency services immediately (911/112).",
        "Move to a safe location.",
        "Stay on the line with dispatchers."
      ],
      safetyTips: [
        "Do not rely on this app when offline.",
        "Keep phone battery preserved."
      ],
      emergencyServicesNumber: "911"
    };
  }
};