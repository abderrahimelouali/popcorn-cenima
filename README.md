🍿 Popcorn Cinema App
The Popcorn Cinema app is a movie search and tracking app where users can:

Search Movies using the OMDB API.
View Detailed Movie Info by selecting a movie from the search results.
Add Movies to the Watched List to keep track of what they’ve watched.
Delete Movies from the Watched List if they change their mind.
🎬 App Features:
Movie Search: Users can search for movies by title, and the app fetches results from OMDB API.
Error Handling: If there's an issue (e.g., no movie found or API error), an error message is shown.
Loader: While fetching data, a loader animation is displayed to inform the user.
Watched List: After selecting a movie, users can add it to their watched list, which is shown below the search results.
Remove Watched Movies: Users can remove movies from the watched list by clicking a delete button.
👨‍💻 App Components:
Nav: Displays the app's navigation bar with a logo and search input.
FilmList: Displays the list of movies fetched from OMDB API.
SelectedMovie: Displays detailed information about the selected movie.
WatchedList: Shows a list of movies the user has watched, with the ability to delete them.
Loader: Displays a loading animation while data is being fetched.
💡 Learning Points:
State Management: The app uses useState to manage the state for movies, search queries, and watched movies.
Effect Hook: The useEffect hook is used to fetch data from the API when the search query changes.
Error Handling: The app uses error handling to display a message if the API returns an error or no results.
Conditionals: The app conditionally displays either the movie details or the watched list depending on whether a movie is selected.
🎉 Wrap-up
This simple Popcorn Cinema app is a great project to understand the use of hooks in React, including useEffect for handling side effects like API calls, and useState for managing state within a component.

Feel free to explore and modify the app, and use these notes to revise key concepts in React!
📚 useEffect Notes for Revision
useEffect is one of the most commonly used hooks in React. It lets you run side effects in function components, such as data fetching, subscriptions, or manually modifying the DOM.

🔄 Basic Usage
The useEffect hook takes two arguments: a function that runs the side effect, and an optional dependency array.
The side effect function runs after every render, but only when the dependencies in the array change.

useEffect(() => {
// Side effect code here
}, [dependency]); // Optional dependency array
⚡ Common Use Cases
Fetching Data from APIs: You can use useEffect to fetch data from an API and update the state accordingly. This ensures data is fetched once when the component mounts.

Example:

useEffect(() => {
fetch("https://api.example.com")
.then(response => response.json())
.then(data => setState(data));
}, []); // Empty dependency array means it runs once on mount
Event Listeners or Subscriptions: Adding and cleaning up event listeners (or other subscriptions) can be done inside useEffect to avoid memory leaks.

Example:

useEffect(() => {
const handleResize = () => {
console.log("Window resized");
};
window.addEventListener("resize", handleResize);

return () => {
window.removeEventListener("resize", handleResize);
};
}, []); // Runs once when the component is mounted
Effect Cleanup: Cleanup is crucial to avoid potential issues, like memory leaks. You can do this by returning a cleanup function from useEffect.

Example:

useEffect(() => {
const timer = setTimeout(() => {
console.log("Timeout reached");
}, 1000);

return () => clearTimeout(timer); // Clean up on unmount
}, []);
🔍 Dependencies:
If you pass a dependency array (e.g., [someState]), the effect will run when that specific state changes.

useEffect(() => {
// Runs when someState changes
}, [someState]);
If you omit the dependency array (useEffect(() => {...})), the effect runs after every render.
🚪 Unsubscribe or Cleanup on Component Unmount:
The cleanup function (return) allows you to clean up side effects when the component unmounts. This is useful for things like removing event listeners or clearing timers.
🌐 Asynchronous Code:
You can't directly use async functions inside useEffect, but you can define an async function within the effect:

useEffect(() => {
const fetchData = async () => {
const response = await fetch('https://api.example.com');
const data = await response.json();
setState(data);
};

fetchData();
}, []);
