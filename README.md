# Welcome to Pic-Note-App

This project is with React Native, Typescript, Expo Router, expo-sqlite, etc. for a simple local app that allows users to take a picture, to add note of that picture, and to view the notes in the application.


### User Flow
There are 2 tabs on the default home screen, the left tab shows a list of notes (and if there is no note, it will have a brief hint), and the right tab is an entry for the user to take a picture. When pressed the "picture-taking" button, the user can view the taken picture, and decide whether to retake or continue. If the user press "next", then it goes to the note-creation screen, where the user can add title and note to this picture. After "save", the user will go back to "home screen" and see the new note among the node list. Then the user can scroll and choose a note to see the details.

### Picture and data-saving
When the user take one picture, the device keep the temporal link of the photo, and if not retaking, then when the user create an actual note with that picture, the permernant URI (path of the device's in-app storage) to the picture is stored together with title and notes into sqlite database. When the user browse the note list, the screen fetches a list of items from the databse once, and then each element fetches the actual picture via it's URI.

### Issues ran into and solved
1. When working on picture-taking step and as the camera was indeed open, there was nothing on the screen where the camera view should show what's aimed by camera, later the problem was that camera view element requires "flex: 1" to display correctly; this inspired me in debugging in later step, I kept in mind that camera/picture-related issues might be about the styles even though the uri is fine, and later solved a similar issue
2. There were warning inside the <Image> element, and it turns out that I should keep in mind that both "expo-image" and "react-native" have this element


### Extra feature
I added a "sort" option that allows user to check notes by "the earliest note first" or "the latest note first" to customize users' needs.












## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

