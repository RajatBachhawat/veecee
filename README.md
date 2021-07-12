# veecee

## Table of Contents

1. [Introduction](#introduction)
2. [How To Operate](#how-to-operate)
3. [Features](#features)
4. [Tools and Technology used](#tools-and-technology-used)
5. [Platforms](#platforms)

## Introduction

**veecee** is a video conferencing web-app, built using the [lib-jitsi-meet](https://github.com/jitsi/lib-jitsi-meet) API. It offers basic video/audio calling features along with many more functionalities, a beautiful user interface and a seamless user experience. The app is served by a Node.js + Express server and the frontend is written in vanilla JavaScript, along with HTML, CSS and EJS.

Check out **veecee** @ [https://veecee-video.herokuapp.com](https://veecee-video.herokuapp.com). It's free and it's awesome.

## How To Operate

#### Creating a Room

Go to [veecee](https://veecee-video.herokuapp.com). Choose `Create Room`. Click on the `Copy Invite` button, and then click on `Go` to join the room. Share the copied invite with others.^

> **veecee** generates a random room ID using [uuid](https://github.com/uuidjs/uuid#uuid--), so that adversaries are unable to brute force your room ID and sabotage your meeting. Only people who you trust with the meeting URL / room ID can join.

#### Joining a Room

Go to [veecee](https://veecee-video.herokuapp.com). Choose `Join Room`. Enter the `Room ID` that you received in your invite, and click on `Go`.^

#### Joining a Meeting directly

Use the `URL` in the invite to directly open the meeting on your browser and join the Meeting (and not go the Room first). This is offered to give users a **convenient** one-click option to join meetings.

#### Inside a Room/Meeting

- **Inside Room**:
    - Chat with other Room participants.
    - Join the Meeting.
    - Exit the Room. 

- **Inside Meeting**:
    - Video/audio call with other Meeting participants
    - Chat with other Room participants
    - Use the other features (like screen sharing, change background)
    - Exit the Meeting (Takes you to the Room by default)

> ^ If you are a guest user, you will be asked to enter your name (to be displayed in the room).

## Features

### Basic Features

##### 1. Video Conference among Multiple Users

Multiple users can join the conference and have a video/audio call (Tested with upto 10 participants)

##### 2. Audio Mute/Unmute

User can mute/unmute your audio at the press of a button. Button also indicates the current mute/unmute state.

##### 3. Video On/Off

User can turn on/off your video at the press of a button. Button also indicates the current on/off state.

##### 4. Leave Video Conference

Leave the meeting at the press of a button

### Additional Features

##### 1. Meetings and Rooms

**veecee** provides users with two environments, for interacting with other users - **Meetings** and **Rooms**

- **Meeting:** A place where users can join and see other participants that are in the Meeting (video call), talk with them (audio call) and share their screen. A multi user chat is available too. All Meeting participants are considered as Room participants.
- **Room:** A place where users can join and start a conversation (through the multi user char) **before** joining the Meeting and **after** leaving it as well. They don't have to be a part of Meeting, and can still chat with all the Room participants (which includes Meeting participants). Room has the option to proceed to Meeting.

##### 2. Multiple Joining Options

User can join in the following ways :

- **Join the Room** - `Join Room` @ **veecee** => paste the Room ID in invite
- **Join the Meeting directly** - use the URL in invite to directly reach the meeting

##### 3. Waiting Room

User gets the option to mute/unmute audio and turn on/off video before joining a Meeting

##### 4. Screen Sharing

User can share their screen with other participants at the press of a button. Button also indicates whether user is sharing their screen.

##### 5. Participants' List

User can view the list of participants in the Room at the press of a button.

##### 6. Multi User Chat

User can chat with all the participants of the Room through a chat window.

##### 7. Login/Signup

User can sign up to **veecee**, creating their account with us. They can login or logout whenever they like.

##### 8. User Profile

User can view their profile, and change their Name (which is used by default as their name in Rooms*)

##### 9. Use As Guest

Guest user can also create and join Rooms* on **veecee**. They just have to go through an extra step of setting their nickname before entering.

##### 10. Chat Before/After Meeting

User can make use of the Room feature of **veecee**, to drop in **convey a quick message** or **converse** with other participants of the Room, without actually having to be a part of the Meeting. This feature lets a user converse with Meeting participants **before** joining the Meeting and **after** leaving it as well.

##### 11. Change Room Theme

User can choose from a diverse collection of themes, and change the look and mood of their view of the Room accordingly.

We believe this feature makes the whole experience of **veecee** more personalised and sets us apart from other video conferencing apps.


> *Rooms here means both Rooms and Meetings

## Tools and Technology used

| Purpose                                | Technologies/Tools/Libraries used          |
| -------------------------------------- | ------------------------------------------ |
| Markup                                 | HTML5                                      |
| Styling                                | CSS3, Bootstrap, Animate.css, Google Fonts |
| Frontend Behaviour                     | JavaScript ES6, jQuery                     |
| Templating Engine                      | EJS                                        |
| Server Runtime Environment + Framework | Node.js + Express                          |
| Video Conferencing API                 | Jitsi API: lib-jitsi-meet                  |
| User Authentication                    | Firebase                                   |
| Random Room IDs                        | uuid                                       |

## Platforms

- **veecee** has been tested thoroughly and works without any issues on the latest version of **Chrome** on **Windows 10**.
- We advise you to use it on **Chrome** or any other **Chromium-based** browser to get the best results.
- We advise you to use it on a **PC** to get the best results.
- **veecee** should work on other browsers (like Edge, Safari) and other devices (like mobile devices), however the layouts and styling might get skewed.
