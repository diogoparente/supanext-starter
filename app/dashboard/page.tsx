"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/providers/auth";
import { Loader2, Trash } from "lucide-react";
import { usePosts, useCreatePost, useDeletePost } from "@/hooks/use-posts";
import { LoadingSpinner } from "@/components/layout/loading";

export default function Dashboard() {
  const { user } = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const { data: userPosts, isLoading } = usePosts(user?.id || "");
  const createPost = useCreatePost();
  const deletePost = useDeletePost();

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createPost.mutate(
      { title: postTitle, content: postContent, userId: user?.id || "" },
      {
        onSuccess: () => {
          setPostTitle("");
          setPostContent("");
        },
      }
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Content"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              required
            />
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Posts</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : userPosts?.length === 0 ? (
          <p className="text-center text-muted-foreground">
            You haven't created any posts yet.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userPosts?.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{post.title}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deletePost.mutate(post.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.content}</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
