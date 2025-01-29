import { getGreeting } from "./greetings/get-greetings.action";
import { getPostLikes } from "./posts/get-post-likes.actions";
import { updatePostLikes } from "./posts/update-likes.action";

export const server = {
  getGreeting,

  // posts
  getPostLikes,
  updatePostLikes,
};