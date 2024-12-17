import { IncomingForm } from "formidable";
import fs from "fs";
import FormData from "form-data"; // Use form-data to construct the request
import { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/services/api";

// Disable the default body parser to allow formidable to handle the file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export type ResponseData = {
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  if (req.method === "GET") {
    try {
      const response = await api.get("/config/background", {
        responseType: "stream",
      });

      res.setHeader("Content-Type", response.headers["content-type"]);

      response.data.pipe(res);
    } catch (error) {
      console.error("Error fetching background image:", error);
      res.status(500).json({ message: "Failed to retrieve background image" });
    }
  }

  if (req.method === "POST") {
    const form = new IncomingForm();

    form.parse(req, async (err, _, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(400).json({ message: "Error parsing form data" });
        return;
      }

      if (!files.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const file = files.file[0];

      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream(file.filepath),
        file.originalFilename ?? "background.png"
      );

      try {
        const response = await api.post<ResponseData>(
          "/config/background",
          formData,
          {
            headers: formData.getHeaders(),
          }
        );

        res.status(200).json(response.data);
      } catch (error: any) {
        console.error("Error during API call to FastAPI:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  }
}
