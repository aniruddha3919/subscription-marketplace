const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Initialize Supabase
const supabaseUrl = 'https://bnuscbrzgmwxgxjftgww.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJudXNjYnJ6Z213eGd4amZ0Z3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NTg3MzEsImV4cCI6MjA1MzIzNDczMX0.xoxgI2KFNa5fX-klAKmO4F1WwumDGZP6z1Swl9IiwBc';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to parse JSON
app.use(express.json());

// Route to get all subscriptions
app.get('/subscriptions', async (req, res) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Route to add a new subscription
app.post('/subscriptions', async (req, res) => {
    const { title, description, price, whatsapp_link } = req.body;
    console.log('Received data:', { title, description, price, whatsapp_link });
  
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{ title, description, price, whatsapp_link }]);
  
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }
  
      console.log('Data inserted successfully:', data);
      res.json(data);
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(express.static('public'));