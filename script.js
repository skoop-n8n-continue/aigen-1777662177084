async function loadAppData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load app data:', error);
    return null;
  }
}

async function init() {
  const data = await loadAppData();
  if (!data) return;

  // Apply styles from data
  const settings = data.sections.app_settings;
  document.documentElement.style.setProperty('--primary-color', settings.primary_color.value);
  document.documentElement.style.setProperty('--background-color', settings.background_color.value);
  document.documentElement.style.setProperty('--text-color', settings.text_color.value);
  document.documentElement.style.setProperty('--font-size', settings.font_size.value);
  document.documentElement.style.setProperty('--font-style', settings.font_style.value);

  // Apply content
  const content = data.sections.content;
  document.querySelector('.message').textContent = content.message.value;

  // Reveal the app
  document.getElementById('app-container').classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', init);
