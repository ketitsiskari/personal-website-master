import SectionCreator from './join-us-section.js';
import emailValidations from './email-validator.js';
import './styles/style.css';
import sendEmail from './subscribe.js';
import { displayData } from './bigCommunity.js';
import unsubscribe from './unsubscribe.js';
import AnalyticsWorker from './analyticsWorker.worker.js';
import { capturePerformanceMetrics } from './performanceUtils.js';
import { sendPerformanceMetricsToServer } from './api.js';
const { validate } = emailValidations;

document.addEventListener('DOMContentLoaded', async () => {
  const sectionCreator = new SectionCreator();
  const realSection = sectionCreator.create('standard');

  const mainContainer = document.getElementById('app-container');
  const communitySection = await displayData();
  const appSection = document.querySelector('.app-section');
  appSection.insertAdjacentElement('afterend', communitySection);

  const performanceData = capturePerformanceMetrics();
  sendPerformanceMetricsToServer(performanceData);

  const footer = document.querySelector('footer');

  mainContainer.insertBefore(realSection, footer);

  const form = realSection.querySelector('form');
  const emailInput = realSection.querySelector('.email-input');
  const subscribeButton = realSection.querySelector('.subscribe-button');

  // subscribeButton.style.opacity = '1';
  subscribeButton.style.transition = 'opacity 0.5s ease-in-out';

  const analyticsWorker = new AnalyticsWorker();

  const sendEventToWorker = (event) => {
    analyticsWorker.postMessage({
      type: 'click',
      target: event.target.tagName,
      id: event.target.id,
      className: event.target.className,
      timeStamp: event.timeStamp,
    });
  };

  document.addEventListener('click', (event) => {
    if (event.target.matches('button, .email-input')) {
      sendEventToWorker(event);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (validate(emailInput.value)) {
      emailInput.style.display = 'none';
      subscribeButton.textContent = 'Unsubscribe';
      localStorage.setItem('subscribed', 'true');
      localStorage.setItem('email', emailInput.value);
      subscribeButton.style.opacity = '0.7';
      try {
        await sendEmail(emailInput.value);
        emailInput.value = '';
      } catch (error) {
        console.error('Error sending email:', error);
      }
    } else if (subscribeButton.textContent === 'Unsubscribe') {
      emailInput.style.display = 'inline-block';
      emailInput.value = '';
      subscribeButton.textContent = 'Subscribe';
      subscribeButton.style.opacity = '1';
      localStorage.removeItem('subscribed');
      localStorage.removeItem('email');
      try {
        await unsubscribe();
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    } else {
      alert('Not valid email');
    }
  });
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    emailInput.value = storedEmail;
  }

  const pageLoadTime = performance.now();
  console.log(`Page loaded in ${pageLoadTime} milliseconds.`);

  if (window.performance && window.performance.memory) {
    console.log('Memory Stats:', window.performance.memory);
  }
});
