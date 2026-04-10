import { Router } from "express";
import { SaveProgressBody } from "@workspace/api-zod";
import { db, progressTable } from "@workspace/db";
import { desc } from "drizzle-orm";

export const progressRouter = Router();

progressRouter.get("/", async (req, res, next) => {
  try {
    const records = await db
      .select()
      .from(progressTable)
      .orderBy(desc(progressTable.createdAt))
      .limit(50);
    
    res.json(
      records.map((r) => ({
        id: r.id,
        topic: r.topic,
        subject: r.subject,
        score: r.score,
        total: r.total,
        percent: r.percent,
        language: r.language,
        createdAt: r.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    next(err);
  }
});

progressRouter.post("/", async (req, res, next) => {
  try {
    const body = SaveProgressBody.parse(req.body);
    const percent = Math.round((body.score / body.total) * 100);
    
    const [record] = await db
      .insert(progressTable)
      .values({
        topic: body.topic,
        subject: body.subject,
        score: body.score,
        total: body.total,
        percent,
        language: body.language,
      })
      .returning();
    
    res.status(201).json({
      id: record.id,
      topic: record.topic,
      subject: record.subject,
      score: record.score,
      total: record.total,
      percent: record.percent,
      language: record.language,
      createdAt: record.createdAt.toISOString(),
    });
  } catch (err) {
    next(err);
  }
});
