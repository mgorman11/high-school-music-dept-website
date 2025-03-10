// Firebase configuration (replace with your actual config values)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    // ... add other config values as needed
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
  