"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("name");
    const password = formData.get("password");

    console.log(password, username, "=========");

    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login success");
      router.push("/article"); // arahkan ke dashboard kalau perlu
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 items-stretch">
        {/* Card Gambar */}
        <Card className="w-[350px] p-0 overflow-hidden relative">
          <div className="relative w-full h-full">
            <Image
              src="https://ik.imagekit.io/q7pvfvakd/WIN_20250322_14_40_50_Pro.jpg"
              alt="background-login"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Card>

        {/* Card Form */}
        <Card className="w-[350px] flex flex-col justify-between">
          <CardHeader>
            <CardTitle>AFM Dashboard</CardTitle>
            <CardDescription>Dashboard for all PPM peeps.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <form onSubmit={handleSubmit} className="h-full">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="ex: Attar komtol"
                    className="w-full"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    id="password"
                    placeholder="ex: 123456"
                    className="w-full"
                    type="password"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Role">Role</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="Role" className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="pamong">Pamong</SelectItem>
                      <SelectItem value="humas">Humas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Button moved inside form for submit trigger */}
              <CardFooter className="flex justify-between pt-6">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#A2D812] text-black hover:bg-[#91c50f]"
                >
                  Submit
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
