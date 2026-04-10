import { Router } from "express";
import { MentorAskBody } from "@workspace/api-zod";
import { generateMentorResponse } from "../services/mentorService.js";

export const mentorRouter = Router();

mentorRouter.post("/ask", (req, res, next) => {
  try {
    const body = MentorAskBody.parse(req.body);
    const response = generateMentorResponse(body.question, body.contextTopic, body.language);
    res.json({ response });
  } catch (err) {
    next(err);
  }
});
