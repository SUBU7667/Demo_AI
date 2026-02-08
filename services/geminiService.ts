
import { GoogleGenAI, Type } from "@google/genai";
import { WATCHES } from "../constants";

export const getAIStylistResponse = async (userPrompt: string, history: { role: 'user' | 'model', content: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const watchDataString = WATCHES.map(w => 
    `${w.brand} ${w.name} ($${w.price}): ${w.description}`
  ).join('\n');

  const systemInstruction = `
    You are a professional horology consultant and personal stylist for "Horology Elite". 
    Your goal is to help users find the perfect watch from our collection based on their lifestyle, occasion, or style preferences.
    
    Collection context:
    ${watchDataString}

    Rules:
    1. Be sophisticated, knowledgeable, and elegant in tone.
    2. Always recommend 1-2 specific watches from the collection if they match the user's needs.
    3. If the user asks for something we don't have, politely explain and suggest the closest alternative.
    4. Keep responses concise but helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "I apologize, I'm having trouble connecting to my knowledge base. How else can I assist you with our collection?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The clock seems to have stopped momentarily. Please try again in a few seconds.";
  }
};
