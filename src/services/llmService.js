const dotenv = require("dotenv");
dotenv.config();

async function generateTagsAndSummary(description) {
  // Simple tags and summary for demo
  const prompt =
    `Analyze the following campaign description:${description.toLowerCase()}` +
    `\nGenerate relevant tags and a concise summary of the description.` +
    `\nReturn only the result in JSON format without any additional text, code fences, or formatting.` +
    `\nFormat:`+
    `\n{ "tags": ["tag1", "tag2", "tag3"], "summary": "A one-sentence summary of the campaign}`;
  const tagsAndSummary = await generateText(prompt);
  return JSON.parse(tagsAndSummary.text());
}

async function generateText(prompt) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response;
}

module.exports = { generateTagsAndSummary };
