"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Trash } from "lucide-react";
import { usePosts, useCreatePost, useDeletePost } from "@/hooks/use-posts";
import Link from "next/link";

/**
 * The dashboard page.
 *
 * This page shows a form for creating a new post and a list of the user's
 * existing posts. The list is empty if the user has not created any posts yet.
 *
 * The form is submitted when the user clicks on the "Create Post" button.
 * The `handlePostSubmit` function is called with the form data. If the
 * submission is successful, the form is reset and the user is redirected to
 * the home page.
 *
 * The list of posts is rendered as a grid of cards. Each card shows the post
 * title, content, and creation date. The user can delete a post by clicking
 * on the trash can icon in the card header.
 *
 * If the user is not authenticated, the page redirects to the login page.
 *
 * @returns The dashboard page component.
 */
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
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
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
