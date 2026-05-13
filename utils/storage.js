const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/points.json');

function ensureDataFile() {
  const dataDir = path.dirname(dataPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({}));
  }
}

function loadData() {
  ensureDataFile();
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);
}

function saveData(data) {
  ensureDataFile();
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

function getPoints(userId) {
  const data = loadData();
  return data[userId] || 0;
}

function addPoints(userId, amount) {
  const data = loadData();
  data[userId] = (data[userId] || 0) + amount;
  saveData(data);
  return data[userId];
}

function removePoints(userId, amount) {
  const data = loadData();
  data[userId] = Math.max(0, (data[userId] || 0) - amount);
  saveData(data);
  return data[userId];
}

module.exports = {
  getPoints,
  addPoints,
  removePoints
};
