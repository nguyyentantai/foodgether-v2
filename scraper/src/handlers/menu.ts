import { Request, Response } from "express";
import { z } from "zod";

const getMenuSchema = z.object({
  url: z.string().url(),
});

const getMenuHandler = (req: Request, res: Response) => {
  try {
    const { url } = getMenuSchema.parse(req.body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.issues });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export default getMenuHandler;
