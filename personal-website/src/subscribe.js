const sendEmail = async (email) => {
  try {
    const response = await fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log('Email subscribed successfully!');
    } else if (email === 'forbidden@gmail.com') {
      alert('Error: forbidden@gmail.com mail not allowed');
      return response.status === 422;
    } else {
      throw new Error('Something wrong');
    }
  } catch (error) {
    console.log(error);
    alert('An error occurred while subscribing.');
  }
};

export default sendEmail;
