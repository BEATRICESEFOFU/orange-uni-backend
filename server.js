app.use(cors({
  origin: (origin, callback) => {
    // Allow requests without origin (Postman, server-to-server)
    if (!origin) return callback(null, true);

    // Allow localhost for development
    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }

    // Allow ALL Vercel deployments (production + preview)
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Block all other origins, WITHOUT throwing
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));