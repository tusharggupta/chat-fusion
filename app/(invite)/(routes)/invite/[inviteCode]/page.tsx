import React from "react";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodPageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodPage({
  params: { inviteCode },
}: InviteCodPageProps) {
  const profile = await currentProfile();

  // ✅ Fix: Ensure returnBackUrl is an absolute path
  if (!profile) {
    return redirectToSignIn({ returnBackUrl: `/invite/${inviteCode}` });
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  try {
    const server = await db.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [{ profileId: profile.id }],
        },
      },
    });

    if (server) {
      return redirect(`/servers/${server.id}`);
    }
  } catch (error) {
    console.error("Error updating server:", error);
    return redirect("/error"); // Redirect to an error page if needed
  }

  return null;
}
