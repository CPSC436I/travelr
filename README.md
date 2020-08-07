
# CPSC436I Project
[Frontend Repo](https://github.com/CPSC436I/travelr)

[Backend Repo](https://github.com/CPSC436I/CPSC436I-Project-API)

[Previous Repo](https://github.com/janet-chen/CPSC436I-project)

# Travelr
Stuck at home? Use Travelr to plan your next adventure to literally _anywhere_. Travelr lets you organize exciting outings easily by aggregating beautiful photos, thrilling travel vlogs, and highly-rated attractions. 


### Teamteam
Janet Chen, Christine Vu, Stevens Qiu, Kevin Yang

## Project Description

Our project facilitates vacation planning by aggregating travel related content from various sources, providing a preview of the experience for people interested in or planning a vacation. Users can save images and videos for individual destinations, which is saved as links in the database. We save login data as well so that any content that the user saves can be associated with that user. They can then revisit, categorize, and organize their saved content.

## Project Task Requirements
### Minimal
 - User Login &#9989;
	1. Create “Register” and “Login” forms in ReactJS &#9989;
    2. Integrate User Authentication library (eg. Passport JS) with Node JS backend and MongoDB &#9989;
    3. Have frontend ReactJS application query NodeJS server for user authentication &#9989;
 -  Search functionality for vacation destinations &#9989;
    1. Gather search APIs from media sources (ie. Google Search, Instagram, Pinterest) &#9989;
    2. Create search bar which sends query string to search APIs &#9989;
    3. Naively present search results to page (eg. present media from alternating sources side by side) &#9989;&#x270D;
	    - *Altered to separate results by content type* 
 - Allow users to save media from their search results &#9989;
 - Provide scheduling functionality for vacation destinations &#9989;
### Standard
 - Organize saved content by country to help users narrow down which destination they’re viewing most frequently &#9989;&#x270D;
	 - *Modified to filter saved content by tags*
 - Organize content using Pinterest layout or folder metaphor &#9989;
 - Display flight data for desired destination (price, schedule(?)) &#10060;
 - Display additional information on destination displayed in photo/video/article &#9989;&#x270D;
	 - Via a dropdown menu or hovering over the content &#9989;
	 - Additional info may include address, pricing, reviews &#10060;
 - Allow users to add notes to videos that they’ve saved &#10060;
 - Provide a vision board/collage area of the content they’ve save that users can interact with &#9989;&#x270D;
	 - *Integrated with trip scheduler*
### Stretch
- Drag and drop media into schedule &#9989;
- Having a price estimator of different portions of the trip (e.g. restaurants, hotels, flights, tickets) &#10060;
- Save clips of video (trimming functionality) &#10060;
- Recommendations for places to visit &#9989;&#x270D;
	- *Landing page and surprise me button*
- Enable users to upload their own content &#10060;
- Enable users to share their plan or collaborate with others &#10060;

## Technologies - MERN stack

**HTML/JS/CSS**
We used HTML to render all of our components and CSS functions for styling Material UI (MUI) components instead of global stylesheets. The CSS Flexbox was important to creating a responsive layout as MUI Grid is built upon Flexbox. We followed JS6 standards, such as immutable variables and arrow functions.

**React/Redux**
We transitioned from class components to using React Hooks syntax for local state control, and we use Redux for managing the application-wide state. Most of the application (except for ‘favourited’ content) relies on Redux and users can use the app even if the database is down, which was a conscious design decision to modularize functionality. We created a component hierarchy to adhere to the same information architecture as the UI. 

**MongoDB**
MongoDB serves two important purposes: saving user data upon Google login and saving their ‘favourited’ items. We secure access to the database by keeping the MongoDB URI in a local .env file. MongoDB allows for multiple users to quickly and easily access their saved favourites upon logging in.

**NodeJS/Express**
The back end Express API provides endpoints for the front end to communicate with the MongoDB database. The main app.js file is organized into sections for imports, middleware, user auth and database config, and serving routes/handling errors. Structure of files/folders allows for us to scale the types of media we store (models and routes folders) and even the user authentication strategies we employ (i.e. Google, Facebook, GitHub, etc.).

**Release Engineering**
We separated our front end and back end projects into two repositories to allow for simple, automatic deployments to Heroku from GitHub. We implemented Continuous Deployment as it was important for us since it allowed us to quickly see our locally tested code in production on every merged Pull Request to the main branch.
## Above & Beyond
Our team went above and beyond on several fronts: interweaving of four external APIs, incorporating Google authentication to enhance security, iterating through multiple designs to achieve a beautiful UI and a smooth user experience when using the app, and refactoring our codebase in sprint 3.

**Interweaving of four external APIs**
We incorporated a total of four separate APIs in our project to provide users with as much variety and choice as possible for browsing through media on our app. Each API required unique specifications for accessing their endpoints; each integration introduced a new set of challenges regarding the authentication process. We strove to understand the contract and pitfalls of the endpoints, manage the asynchronicity of the responses, and ensure that all of the complexity was hidden so that the user experience is consistent regardless of which API they choose to interact with.

**Focus on User Experience research and design**
We brainstormed and prototyped multiple designs to create an intuitive, trustworthy, and beautiful UI. In particular, we invested time to improve and iterate on designs for the scheduler because the scheduling integrates with the ‘search’ and ‘favourite’ functions. Although this was a stretch goal with numerous failed attempts, we succeeded in building a trip organizer with natural drag-and-drop functionality that could be connected to the user’s ‘favourited’ media.

**Flexible user flows**
Users are able to use parts of the application without signing up or logging in. When logging in, we specifically chose to only allow users to create an account with our app via Google login. This improves security as we're not storing or hashing passwords in our database. Through this, we have created a more straightforward UX as well since the user does not have to spend time signing up. 

**Refactoring the codebase**
We started with class components, as that was what the course was taught with. However, most of the resources we found were written for functional components, including Material-UI and modern solutions found on Stack Overflow. This led to our code being a mixture of the two. In sprint 3, we decided to invest time into refactoring the backend and Redux to be cohesive and extensible. We chose to use React Hooks for local state, and Redux for global state. Given the "extended hackathon" nature of the course, this was a risk that ended up paying off. It boosted our productivity, enabling us to more efficiently add new features and contributed to standardizing our code.

## Next Steps
We have several future goals that could improve our app. We spent considerable effort trying to propagate data from the scheduler to the database, beyond storing it in Redux, but unfortunately, we ran out of time. We also want to show additional information when users click on search results, such as flight data and ratings. We already added this, but the information displayed is currently “fake” data (with an Easter egg!). Finally, we would like to extend our app to accommodate mobile users by being more responsive.

## Contributions
**Janet Chen**
Led the design and user experience research for the app. She contributed to the implementation and design of the landing page, results display, and the navigation bar. She also worked on user authentication flow with Google.

**Christine Vu**
Integrated all 4 of the external APIs and customized the results from each API to fit the required fields that the team needed in order to display the results in a cohesive manner in the UI. She also implemented the ability for the user to infinitely scroll through every type of media and have more results being fetched for the user to explore, which requires even more complex interactions with the external APIs.

**Stevens Qiu**
Implemented the ‘favourite’ functionality, from the front end heart icons and favourites view to handling the storage of personalized favourites to MongoDB. Worked on other basic website functionality such as routing, user sessions, and handling project deployment to Heroku.

**Kevin Yang**
Designed and implemented two iterations of the trip scheduler (1: calendar with mini calendar popover, 2: drag and drop board) in React/Redux. He also contributed to the implementation of the search bar.
## Prototypes
### Main search page
**![](https://lh4.googleusercontent.com/RRfc9FHMz9QtffcbATUEh84SBxeqOfARhj_sykS8B_ueJoiedWk1CaFNPvXe6Jct_C2h39I8OOz3Sq8lv9dwTDpBKdVZnLLIkxtWfkcQx0d837secTjCFm8PpYKfkKC0-QwIgf1C)**
### Travel scheduler
**![](https://lh5.googleusercontent.com/qt8ZCdjwkhHGtQdqMu3LYYV9IgeSIibEkVJM1DADwsxB6ID6IYBIgUwCwkxHSrDTn1-X6WTaWJDuoz3raRI-2ei18-VXBu26gg-6JqVNvnE0Xp5dbx-EINdDtC41tLy-W_FOsza4)**
