import { loadPosts } from '../lib/load-posts'

// TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Blog({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.lastname}{post.firstname}</li>
        ))}
      </ul>
    )
  }
  
// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const posts = await loadPosts()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }

  export default Blog
  