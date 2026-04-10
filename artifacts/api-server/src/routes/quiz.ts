import { Router } from "express";
import { GenerateQuizBody } from "@workspace/api-zod";
import { generateQuiz } from "../services/quizService.js";

export const quizRouter = Router();

quizRouter.post("/generate", (req, res, next) => {
  try {
    const body = GenerateQuizBody.parse(req.body);
    const questions = generateQuiz(body.topic, body.language, body.difficulty ?? "medium");
    res.json({
      questions,
      topic: body.topic,
      language: body.language,
    });
  } catch (err) {
    next(err);
  }
});
