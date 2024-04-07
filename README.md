# SMARTomato
## How to run this project
Download Requirement: npm ,Gradle 8.3, JAVA 20, Android Debug Bridge (adb)

Backend:
1. Open the backend folder and open in terminal
2. Run ```npm start``` (You might want to run ```npm install --force``` if something not install correctly)
3. Wait for a sec, if it show ```connected to mongo``` you are good here

Frontend:   

1. Open the backend folder and open in terminal
2. If you are running on your device following this link: https://reactnative.dev/docs/running-on-device
3. If you are runing the project on an Android Virtual Device, run ```npx react-native run-android```
4. Now you will be able to view the signin and signup (Network Error)

If you are facing the Network Error type the below step

Connecting the Frontend Server to the Backend Server:
1. Open a new terminal and run ```adb devices```
2. Make sure to have only one device/emulator connected
3. Run ```adb reverse tcp:4000 tcp:4000```
