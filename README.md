# FullStack Discord Clone: Next.js 13, React, Socket.io, Prisma, Tailwind, MySQL & TypeScript.

🚀 **Live Project:** [Chat Fusion](https://chat-fusion-production.up.railway.app/) 🔗

## 🌟 Features

- ✅ Client form validation and handling using react-hook-form
- ✅ POST, DELETE, and GET routes in route handlers (app/api & pages)
- ✅ Real-time messaging using Socket.io
- ✅ Send attachments as messages using UploadThing
- ✅ Delete & Edit messages in real time for all users
- ✅ Create Text, Audio, and Video call Channels
- ✅ 1:1 conversation between members
- ✅ 1:1 video calls between members
- ✅ Member management (Kick, Role change: Guest / Moderator)
- ✅ Unique invite link generation & fully working invite system
- ✅ Infinite loading for messages in batches of 10 (tanstack/query)
- ✅ Server creation and customization
- ✅ Beautiful UI using TailwindCSS and ShadcnUI
- ✅ Full responsiveness and mobile UI
- ✅ Light / Dark mode
- ✅ Websocket fallback: Polling with alerts
- ✅ ORM using Prisma
- ✅ MySQL database using NeonDb
- ✅ Authentication with Clerk


## 📌 Prerequisites

**Node version 18.x.x**


## 📦 Install Packages

```shell
npm install
```


### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

Add MySQL Database (neondb)

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `lint`  | Run lint check                           |
| `build` | Start building app for deployment        |
| `start` | Run build version of app                 |
