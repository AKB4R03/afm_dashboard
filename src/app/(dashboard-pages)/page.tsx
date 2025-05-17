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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const password = formData.get("password");

    console.log(name, password, role, "======== Form Data");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login success");
        router.push("/article"); // arahkan ke dashboard setelah login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-6 items-stretch overflow-hidden">
        {/* Card Gambar */}
        <Card className="w-[400px] p-0 overflow-hidden relative">
          <div className="relative w-full h-full min-h-[500px]">
            <Image
              src="https://ik.imagekit.io/q7pvfvakd/WIN_20250322_14_40_50_Pro.jpg"
              alt="background-login"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </Card>

        {/* Card Form */}
        <Card className="w-[400px] flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800">
              AFM Dashboard
            </CardTitle>
            <CardDescription className="text-gray-600">
              Dashboard for all PPM peeps.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <form onSubmit={handleSubmit} className="h-full space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Role" className="text-sm font-medium">
                    Role
                  </Label>
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
              <div className="flex justify-between pt-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#A2D812] text-black hover:bg-[#91c50f] px-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
