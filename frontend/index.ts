import { serve } from "bun";

const server = serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    
    // API routes
    if (url.pathname.startsWith('/api/')) {
      return await handleApiRequest(req);
    }
    
    // Static files
    if (url.pathname === '/') {
      const indexFile = Bun.file("./public/index.html");
      return new Response(indexFile, {
        headers: { "Content-Type": "text/html" },
      });
    }
    
    // Serve static files
    const file = Bun.file(`./public${url.pathname}`);
    if (await file.exists()) {
      return new Response(file);
    }
    
    return new Response("Not Found", { status: 404 });
  },
  development: {
    hmr: true,
    console: true,
  }
});

async function handleApiRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  // Proxy API requests to backend
  if (url.pathname.startsWith('/api/')) {
    // Forward to Spring Boot backend
    return await fetch(`http://localhost:8080${url.pathname.replace('/api', '')}`, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });
  }
  
  return new Response("API Not Found", { status: 404 });
}

console.log(`🚀 Server running at http://localhost:${server.port}`); 