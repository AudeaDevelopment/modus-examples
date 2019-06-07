const superagent = require('superagent');
require('dotenv').config();

const {
  API_1_URL, API_2_KEY, API_2_URL,
} = process.env;

const coordsToMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6378.137;
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos((lat1 * Math.PI) / 180)
      * Math.cos((lat2 * Math.PI) / 180)
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000;
};

// returns an array of books
export const getBooks = API_KEY => new Promise((resolve, reject) => {
  superagent
    .get(`${API_1_URL}/books`)
    .set('X-Api_Key', API_KEY)
    .set('Accept', 'application/json')
    .then(({ body }) => resolve(
      body.map(
        ({ id, title, counts: { rows: count, giaScored: scored } }) => ({
          id,
          title,
          count,
          scored,
        }),
      ),
    ))
    .catch(reject);
});

// returns saturation array in a radius at lat lon
export const getSaturationByLLR = (API_KEY, bookId, lat, lon, rad) => new Promise((resolve, reject) => {
  const url = `${API_1_URL}/books/${bookId}`;
  superagent
    .get(url)
    .set('X-Api_Key', API_KEY)
    .set('Accept', 'application/json')
    .then(data => {
      if (!data.body) {
        reject(4002);
      }

      const filteredData = data.body.features.filter(item => {
        const fLon = item.geometry.coordinates[0];
        const fLat = item.geometry.coordinates[1];
        const meters = coordsToMeters(fLat, fLon, lat, lon);
        return meters < rad;
      });
      resolve(
        filteredData.reduce(
          (acc, { properties: { Policy_Limit: amount } }) => {
            acc.count++;
            acc.total += parseInt(amount, 10);
            return acc;
          },
          { count: 0, total: 0 },
        ),
      );
    })
    .catch(() => reject(4011));
});

// returns array of risk score objects from a bounding box
export const getGisScoresByBB = (sw_lat, sw_lon, ne_lat, ne_lon) => new Promise((resolve, reject) => {
  const url = `${API_2_URL}?bounds=${sw_lat}%2C+${sw_lon}%2C+${ne_lat}%2C+${ne_lon}&api_key=${API_2_KEY}`;
  superagent
    .get(url)
    .set('Accept', 'application/json')
    .then(resolve)
    .catch(reject);
});

// returns a single risk score object from a 0 dimensional bounding box
export const getGisScoreByLL = (lat, lon) => new Promise((resolve, reject) => {
  const url = `${API_2_URL}?bounds=${lon}%2C+${lat}%2C+${lon}%2C+${lat}&api_key=${API_2_KEY}`;
  superagent
    .get(url)
    .set('Accept', 'application/json')
    .then(resolve)
    .catch(reject);
});
