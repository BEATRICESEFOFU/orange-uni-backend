app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server & tools like Postman
    if (!origin) return callback(null, true);

    // Allow localhost
    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }

    // Allow ALL Vercel deployments
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Block everything else
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));