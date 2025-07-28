const dotenv = require("dotenv");
dotenv.config();

async function generateTagsAndSummary(description) {
  let tagsAndSummary;
  
  try {
    // Simple tags and summary for demo
    const prompt =
      `Analyze the following campaign description: ${description.toLowerCase()}` +
      `\nGenerate relevant tags and a concise summary of the description.` +
      `\nReturn ONLY valid JSON without any markdown formatting, code fences, or additional text.` +
      `\nThe response must be parseable JSON in this exact format:` +
      `\n{"tags": ["tag1", "tag2", "tag3"], "summary": "A one-sentence summary of the campaign"}`
    
    tagsAndSummary = await generateText(prompt);
    const responseText = tagsAndSummary.text();
    
    // Clean the response to remove markdown formatting
    let cleanedResponse = responseText.trim();
    
    // Remove markdown code blocks if present
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Remove any leading/trailing backticks
    cleanedResponse = cleanedResponse.replace(/^`+|`+$/g, '');
    
    // Try to parse the cleaned JSON
    const parsed = JSON.parse(cleanedResponse);
    
    // Validate the expected structure
    if (!parsed.tags || !Array.isArray(parsed.tags) || !parsed.summary || typeof parsed.summary !== 'string') {
      throw new Error('Invalid response structure');
    }
    
    return parsed;
  } catch (error) {
    console.error('Error generating tags and summary:', error.message);
    if (tagsAndSummary) {
      console.error('Raw response:', tagsAndSummary.text());
    }
    
    // Fallback to default values if LLM fails
    return {
      tags: ['default', 'fallback'],
      summary: `Subscription for campaign: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`
    };
  }
}

async function generateText(prompt) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response;
}

module.exports = { generateTagsAndSummary, generateText };
