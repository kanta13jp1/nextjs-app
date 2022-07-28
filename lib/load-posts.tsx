// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://hello-world-1-6ccgk2l43a-an.a.run.app/users')
    const data = await res.json()
  
    return data
}