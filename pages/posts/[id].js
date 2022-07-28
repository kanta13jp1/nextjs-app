import { loadPosts } from '../../lib/load-posts'

// function Post({ post }) {
//     // Render post...
//   }
  
  // TODO: Need to fetch `posts` (by calling some API endpoint)
//       before this page can be pre-rendered.
function Post({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.lastname}{post.firstname}</li>
        ))}
      </ul>
    )
  }
//   // Generates `/posts/1` and `/posts/2`
//   export async function getStaticPaths() {
//     return {
//       paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//       fallback: false, // can also be true or 'blocking'
//     }
//   }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    console.log('getStaticPaths() called')
    const res = await fetch(`https://hello-world-1-6ccgk2l43a-an.a.run.app/users`)
    const posts = await res.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
      params: { id: post.id },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}

//   // This also gets called at build time
//   export async function getStaticProps({ params }) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     const res = await fetch(`https://hello-world-1-6ccgk2l43a-an.a.run.app/users/`)
//     const post = await res.json()
  
//     // Pass post data to the page via props
//     return { props: { post } }
//   }
  
// This function gets called at build time
export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts
    const posts = await loadPosts()
    console.log('getStaticProps() called')
    console.log(params)
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

  export default Post