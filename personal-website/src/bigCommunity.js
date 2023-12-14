import { createCommunityCard } from './communityCard';

const fetchData = async () => {
  const startTime = performance.now();
  try {
    const response = await fetch('http://localhost:3000/community');
    const endTime = performance.now();
    console.log(`Fetching community data took ${endTime - startTime} milliseconds.`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to retrieve community data');
    }
  } catch (error) {
    console.error('An error occurred while fetching community data', error);
  }
};

const displayData = async () => {
  try {
    const data = await fetchData();

    const section = document.createElement('section');
    section.classList.add('community-section');

    const divHeading = document.createElement('div');
    divHeading.classList.add('section-heading');

    const h2 = document.createElement('h2');
    h2.innerHTML = 'Big Community of <br />People Like You';

    const p = document.createElement('p');
    p.innerHTML =
      'We’re proud of our products, and we’re <br />really excited when we get feedback from our users.';

    divHeading.appendChild(h2);
    divHeading.appendChild(p);

    section.appendChild(divHeading);

    const communityGrid = document.createElement('div');
    communityGrid.classList.add('community-grid');

    const communityCards = data.map((itemData) =>
      createCommunityCard(itemData),
    );

    communityCards.forEach((item) => {
      communityGrid.appendChild(item);
    });

    section.appendChild(communityGrid);

    document.body.appendChild(section);
    return section;
  } catch (error) {
    console.error('An error occurred while displaying community data', error);
  }
};

export { fetchData, displayData };
