"use client";

import React, { useEffect, useState } from "react";
import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { RoomOptions, TrackPublishDefaults } from "livekit-client";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}

export function MediaRoom({ chatId, video, audio }: MediaRoomProps) {
  const { user } = useUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user?.firstName) return;

    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${user.firstName}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching LiveKit token:", error);
      }
    })();
  }, [user?.firstName, chatId]);

  if (!token)
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      connect={true}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      options={{
        publishDefaults: {
          videoCodec: "vp8", // ✅ Force VP8 to avoid H264 issues
        } as TrackPublishDefaults,
      } as RoomOptions}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
