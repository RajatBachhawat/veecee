# veecee

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [How To Operate](#how-to-operate)
5. [Platforms](#platforms)
4. [Demo Video](#demo)

## Introduction

**veecee** is a video conferencing web-app, built using the [lib-jitsi-meet](https://github.com/jitsi/lib-jitsi-meet) API. The app is served by a Node + Express server and the frontend is written in vanilla JavaScript, along with HTML, CSS and EJS.

Check out **veecee** @ [https://veecee-video.herokuapp.com](https://veecee-video.herokuapp.com). It's free and it's awesome.

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

- Join the Room - `Join Room` @ **veecee** => paste the Room ID in invite)
- Join the Meeting directly - paste the URL in invite on your browser search bar

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

User can make use of the Room feature of **veecee**, to drop in **convey a quick message** or **converse** with other participants of the Room, without actually having to be a part of the Meeting. This feature lets a user converse with Meeting participants**before** joining the Meeting and **after** leaving it as well.

##### 11. Change Room Theme

User can choose from a diverse collection of themes, and change the look and mood of their view of the Room accordingly.

We believe this feature makes the whole experience of **veecee** more personalised and sets us apart from other video conferencing apps.

## How To Operate

#### Creating a Room

#### Joining a Room

#### Inside a Room/Meeting

## Platforms

- **veecee** has been tested thoroughly and works without any issues on the latest version of **Chrome Desktop**.
- We advise you to use it on **Chrome Desktop** or any other **Chromium-based** browser to get the best results.

- **veecee** should work on other browsers (like Edge, Safari) and other devices (like mobile devices), however the layouts and formatting might get messed.

##  Demo

<link to the demo video>
