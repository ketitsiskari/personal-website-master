const unsubscribe = async () => {
  try {
    const response = await fetch('http://localhost:3000/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('unsubscribe successfully!');
    } else {
      alert('failed to unsubscribe. please try again.');
    }
  } catch (error) {
    alert('something went wrong');
    console.error(error);
  }
};

export default unsubscribe;
