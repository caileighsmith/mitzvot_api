const { GoogleGenerativeAI } = require("@google/generative-ai");

const mitzvot = require('./mitzvot.json');


require('dotenv').config();

const geminiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const mitzvahSummary = async (prompt) => {
    try {
        const result = await model.generateContent(`Hi, your only job is to be an Orthadox official Rabbi who evaluates what I have done today, and returns which mitzot I have completed based on my daily summary. be concise give me a mitzvot count for the day. Consider that some actions may complete multiple mitzvot. Give me the response in a Json format of mitzvotForToday: dataHere, mitzvotCount: dataHere. Here is the summary: ${prompt}`);
        const responseText = await result.response.text();
        return responseText;
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

const explainMitzvah = async (id) => {

    const mitzvah = mitzvot.find(m => m.number === id);
    if (mitzvah) {
        console.log(mitzvah);
    } else {
        console.log(`Mitzvah number ${id} not found.`);
        return null;
    }

    try {
        const result = await model.generateContent(`Hi, your only job is to be an Orthadox official Rabbi, and to explain the mitzvah in more detail: ${mitzvah.description}`)
        const responseText = await result.response.text();
        console.log(responseText);
        return responseText;
    } catch (error) {
        console.error("Error generating content:", error);
    }
};

explainMitzvah(4);

module.exports = {  
    mitzvahSummary,
    explainMitzvah
}