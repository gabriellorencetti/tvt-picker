import axios from 'axios';
import { load } from 'cheerio';
import he from 'he';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided.' });
  }

  const profileUrl = `https://www.tvtime.com/en/${username}`;

  try {
    const response = await axios.get(profileUrl);
    const $ = load(response.data);
    const scriptText = $('script:contains("tvst.page = \'profile\'")').html();

    if (!scriptText) {
      return res.status(404).json({ error: 'Profile data not found.' });
    }

    // Extract and clean the show data from the script
    const decodedScriptText = he.decode(scriptText);
    const cleanedScriptText = decodedScriptText
      .replace(/&quot;/g, '"') // Replace HTML entities for double quotes with actual double quotes
      .replace(/\\"/g, '"') // Replace escaped double quotes with actual double quotes
      .replace(/\\\\/g, '') // Replace double backslashes with single backslash '/'
      .replace(/'/g, '') // Remove single quotes
      .replace(/shows/g, '"$&"') // Replace all occurrences of 'shows' with '"shows"'
      .replace(/\\/g, ''); // Remove remaining backslashes '\'

    // Find the start and end positions of the JSON object containing show data
    const startIdx = cleanedScriptText.indexOf('"shows" :');
    const endIdx = cleanedScriptText.indexOf('profile :') - 4;

    if (startIdx === -1 || endIdx === -1) {
      return res.status(500).json({ error: 'Failed to extract show data.' });
    }

    const showDataJson = cleanedScriptText.slice(startIdx, endIdx);

    const showData = JSON.parse('{' + showDataJson + '}');

    if (!showData || !Array.isArray(showData.shows)) {
      return res.status(500).json({ error: 'Invalid data format.' });
    }

    // Parse the JSON and create an array with the shows, including only name and image
    const showsArray = showData.shows.map((show) => ({
      id: show.id,
      name: show.name,
      image:
        show.all_images.poster && show.all_images.poster[0]
          ? show.all_images.poster[0]
          : null
    }));

    res.status(200).json({ showsArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data.' });
  }
}
