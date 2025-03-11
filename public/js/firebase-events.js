// Firebase configuration (replace with your actual config values)
const firebaseConfig = {
    apiKey: "AIzaSyAuVztItdIh-TUM3oBG7bwPlI9CeS-3hq0",
    authDomain: "high-school-music-dept-website.firebaseapp.com",
    projectId: "high-school-music-dept-website",
    storageBucket: "high-school-music-dept-website.firebasestorage.app",
  messagingSenderId: "1066905779361",
  appId: "1:1066905779361:web:c4f1516e94e703b620c4e0"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  
  /**
   * Sets up a real-time listener for the 'events' collection.
   * @param {function(Error|null, Array)} callback - Called with (error, events array)
   */
  function listenToEvents(callback) {
    db.collection("events").orderBy("date").onSnapshot((snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        events.push(doc.data());
      });
      callback(null, events);
    }, (error) => {
      callback(error, null);
    });
  }
  
  /**
 * Fetch all events (for the events/calendar page).
 * @param {function(Error|null, Array)} callback - Called with (error, events)
 */
function fetchAllEvents(callback) {
  db.collection("events")
    .orderBy("date")
    .onSnapshot(
      (snapshot) => {
        const events = [];
        snapshot.forEach((doc) => {
          events.push(doc.data());
        });
        callback(null, events);
      },
      (error) => {
        callback(error, null);
      }
    );
}