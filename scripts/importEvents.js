const admin = require('firebase-admin');
const fs = require('fs');

// Path to your service account key file
const serviceAccount = require('../serviceAccountKey.json');


// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Read your JSON file containing events
const events = JSON.parse(fs.readFileSync('./data/events.json', 'utf8'));

// Firestore limits batch writes to 500 operations per batch.
async function importEvents() {
  const batchSize = 500;
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = db.batch();
    const chunk = events.slice(i, i + batchSize);
    chunk.forEach(event => {
      // Create a new document reference with an auto-generated ID in the "events" collection
      const docRef = db.collection('events').doc();
      batch.set(docRef, event);
    });
    await batch.commit();
    console.log(`Imported events ${i + 1} to ${i + chunk.length}`);
  }
  console.log("All events imported successfully!");
}

importEvents().catch(err => {
  console.error("Error importing events:", err);
});
