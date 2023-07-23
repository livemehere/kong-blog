import { Post } from '@src/server-functions/getCategoricalPosts';

type GroupedPosts = { [category: string]: Post[] };

export function groupByCategory(posts: Post[]): GroupedPosts {
  return posts.reduce((acc, post) => {
    const category = post.meta.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as GroupedPosts);
}
