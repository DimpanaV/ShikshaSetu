import { Router } from "express";
import { GenerateLessonBody } from "@workspace/api-zod";
import { generateLesson } from "../services/lessonService.js";

export const lessonsRouter = Router();

lessonsRouter.post("/generate", (req, res, next) => {
  try {
    const body = GenerateLessonBody.parse(req.body);
    const lesson = generateLesson(
      body.subject,
      body.topic,
      body.grade,
      body.language,
      body.mode
    );
    res.json(lesson);
  } catch (err) {
    next(err);
  }
});
