document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscriptionForm');
  const subscriptionsDiv = document.getElementById('subscriptions');

  // Render backend URL
  const backendUrl = 'https://subscription-marketplace.onrender.com';

  // Fetch and display subscriptions
  async function fetchSubscriptions() {
    try {
      const response = await fetch(`${backendUrl}/subscriptions`);
      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }

      const data = await response.json();
      console.log('Fetched subscriptions:', data); // Debugging: Log fetched data

      subscriptionsDiv.innerHTML = ''; // Clear the container before adding new content

      // Loop through the fetched data and create elements
      data.forEach(sub => {
        const subDiv = document.createElement('div');
        subDiv.className = 'subscription'; // Add a class for styling
        subDiv.innerHTML = `
          <h3>${sub.title}</h3>
          <p>${sub.description}</p>
          <p><strong>Price:</strong> ${sub.price}</p>
          <a href="${sub.whatsapp_link}" target="_blank">Contact Seller</a>
        `;
        subscriptionsDiv.appendChild(subDiv); // Add the new subscription to the container
      });

      if (data.length === 0) {
        subscriptionsDiv.innerHTML = '<p>No subscriptions available.</p>';
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      subscriptionsDiv.innerHTML = '<p>Failed to load subscriptions. Please try again later.</p>';
    }
  }

  // Add new subscription
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const whatsappLink = document.getElementById('whatsappLink').value;

    try {
      const response = await fetch(`${backendUrl}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price, whatsapp_link: whatsappLink }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit data');
      }

      const data = await response.json();
      console.log('Data submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }

    form.reset();
    fetchSubscriptions(); // Refresh the list after adding a new subscription
  });

  // Initial fetch
  fetchSubscriptions();
});