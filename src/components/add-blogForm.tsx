"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddBlog() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("author", form.author);
    if (form.image) {
      formData.append("image", form.image);
    }

    console.log("test weiii");
    const res = await fetch("/api/article", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Article created successfully");
      setForm({
        title: "",
        content: "",
        author: "",
        image: null,
      });
    } else {
      alert(data.message || "Failed to create article");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-xl p-6 space-y-4">
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter article title"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="content">Content</Label>
              <Textarea
                name="content"
                id="content"
                value={form.content}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write your article content..."
                rows={6}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="author">Author</Label>
              <Input
                name="author"
                id="author"
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setForm((prev) => ({ ...prev, image: file || null }));
                }}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#A2D812] text-black hover:bg-[#91c50f] mt-4"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
