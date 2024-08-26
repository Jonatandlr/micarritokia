import { NextApiRequest, NextApiResponse } from "next";

export function POST(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
