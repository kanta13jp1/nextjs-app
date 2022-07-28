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
    console.log('getStaticProps() called')
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
}

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// export async function getStaticPaths() {
//     const res = await fetch(`https://hello-world-1-6ccgk2l43a-an.a.run.app/users`)
//     const posts = await res.json()
  
//     // Get the paths we want to pre-render based on posts
//     const paths = posts.map((post) => ({
//       params: { id: post.id },
//     }))
  
//     // We'll pre-render only these paths at build time.
//     // { fallback: blocking } will server-render pages
//     // on-demand if the path doesn't exist.
//     return { paths, fallback: 'blocking' }
// }

export default Blog
  