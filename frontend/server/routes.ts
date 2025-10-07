import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Proxy all /api requests to the backend
  app.use("/api", async (req, res) => {
    try {
      const backendUrl = `http://localhost:8000${req.originalUrl.replace('/api', '')}`;
      console.log(`Proxying ${req.method} ${req.originalUrl} to ${backendUrl}`);
      
      const fetchOptions: RequestInit = {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      // Add body for non-GET requests
      if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
        fetchOptions.body = JSON.stringify(req.body);
      }

      const response = await fetch(backendUrl, fetchOptions);
      const data = await response.text();
      
      res.status(response.status);
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Proxy error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
