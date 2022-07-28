function Page({ data }) {
    return (
        <ul>
          {data.map((post) => (
            <li key={post.id}>氏名：{post.lastname} {post.firstname} メール：{post.email} 年齢：{post.age} 有給残：{post.payedvacation}</li>
          ))}
        </ul>
      )
    }
  
  // This gets called on every request
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 59 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=59).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    // Fetch data from external API
    res = await fetch(`https://hello-world-1-6ccgk2l43a-an.a.run.app/users`)
    const data = await res.json()
    console.log(data)
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page