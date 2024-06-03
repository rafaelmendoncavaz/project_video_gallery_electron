# :tada: **YouTube Personal Gallery**

## ___A personal project required by my wife to store unlisted/private videos of a :muscle: workout program about to expire___

### :writing_hand: **Notes**

- The whole code is built using *JavaScript* and designed to run with ___Electron___ so it can run in any device
- Data is stored and fetched at an in-built API interacting with the following features:
  - Instantly adding YouTube videos by providing the URL in the input
  - Live Search mechanism by Title and Category
  - Updating Title and Category
  - Deleting and Confirmation
 
### :arrow_forward: ___Installation Guide___

1. Clone this repository

 ![Cloning](https://i.imgur.com/QQ7ADxs.jpg)
 
2. Install Electron
   
  ```vim
  $ npm install electron --save-dev
  ```
  
3. Setup package.json and electron-builder.json

  package.json
   ```json
   {
      "name": "project",
      "version": "1.0.0",
      "description": "",
      "main": "./src/scripts/main.js",
      "scripts": {
        "start": "electron .",
        "build": "electron-builder"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "electron": "^30.0.2",
        "electron-builder": "^24.13.3"
      },
      "dependencies": {
        "express": "^4.19.2"
      }
    }
```
electron-builder.json
```json
  {
  "appId": "proj.file.folder",
  "productName": "Project FileFolder",
  "directories": {
    "output": "Project FileFolder"
  },
  "win": {
    "target": "portable",
    "icon": "src/assets/favicon.ico"
  },
  "mac": {
    "target": "dmg",
    "icon": "src/assets/favicon.ico"
  },
  "linux": {
    "target": "AppImage",
    "icon": "src/assets/favicon.ico"
  }
}
```
4. Install Electron Builder

  ```vim
  $ npm install electron-builder --save-dev
  ```

6. Start the App before building to make sure everything is working!

  ```vim
  $ npm run start
  ```

  ![App](https://i.imgur.com/vJS02vi.jpg)

7. Run the Electron builder to create a portable *.exe of the application

   ```vim
    $ npm run build
    ```

### :partying_face: **Thats It**

*Now you can add your :star: favorite videos in a personal library without having the need to actually go to YouTube, create your own categories and watch it all inside the app*

![Final Result](https://i.imgur.com/pFYHBZZ.jpg)

### ___Footer Notes___

-  The Default Language is set at Brazilian Portuguese :brazil:. I did not created another language support button but you can manually translate it by changing the HTML innerText
-  You can also :paintbrush: re-style at your own taste by changing it's colors and sizes at the *.css files. To change icons, download the ones you like and replace them at **./src/assets/** using the same name and file extension.
-  Maybe I'll add other features such as :spiral_notepad: Personal Notes or even a :calendar: Calendar to be used as an Agenda. Feel free to add those changes and commit them.

-  This was my :1st_place_medal: First Actual Project, so I expect it's not all perfect or clean, but props for trying lol! :chart_with_upwards_trend: Rep me up! :smile:
