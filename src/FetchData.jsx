import { useState, useEffect } from "react";

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [halaman, setHalaman] = useState(1);

  useEffect(() => {
    console.log("effect jalan, halaman:", halaman);
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${halaman}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [halaman]); // effect jalan lagi setiap halaman berubah

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Data dari API</h2>
      <button onClick={() => setHalaman(halaman + 1)}>Halaman berikutnya</button>
      <p>Halaman: {halaman}</p>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;