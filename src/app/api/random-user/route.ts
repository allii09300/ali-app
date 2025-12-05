import { UserType } from "@/types/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    if (!res.ok) throw new Error("Failed to fetch user");

    const data = await res.json();

    const user = data.results[0];

    const formattedUser: UserType = {
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.thumbnail,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch user" },
      { status: 500 }
    );
  }
}
