const resultConfig = [
  {
    min: 81,
    category: "Excellent",
    summary: "Your resume is highly competitive!",
    strengths: ["Strong technical alignment", "Relevant experience", "Good structure"],
    improvements: ["Add more metrics to quantify impact", "Include 2-3 more industry keywords"],
    recommendation: "Minor tweaks needed - you're ready to apply!"
  },
  {
    min: 66,
    category: "Good",
    summary: "Solid foundation with room for improvement",
    strengths: ["Relevant work history", "Clear project descriptions"],
    improvements: ["Add quantifiable achievements", "Strengthen with more keywords", "Improve leadership examples"],
    recommendation: "Some optimization needed - apply after making these changes"
  },
  {
    min: 50,
    category: "Needs Work",
    summary: "Your resume needs significant improvements",
    strengths: ["Some relevant experience"],
    improvements: ["Add specific metrics and numbers", "Include missing critical keywords", "Restructure for better impact"],
    recommendation: "Major revisions required before applying"
  },
  {
    min: 0,
    category: "Poor",
    summary: "Complete resume overhaul needed",
    strengths: ["Education background is a foundation to build on"], // less harsh than empty
    improvements: ["Redo entire structure and content", "Add quantifiable achievements", "Include all missing keywords", "Focus on relevant experience only"],
    recommendation: "Start from scratch with professional guidance"
  }
];

export const aiMockResult = (score) => {
  const result = resultConfig.find(r => score >= r.min);
  return { score, ...result };
};
