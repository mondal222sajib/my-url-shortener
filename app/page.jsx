
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function shortenUrl(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed");

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      fontFamily: "Arial"
    }}>
      <section style={{
        background: "white",
        padding: 35,
        borderRadius: 16,
        width: "100%",
        maxWidth: 520,
        boxShadow: "0 8px 30px #0001"
      }}>
        <h1 style={{textAlign:"center", color:"#2563eb"}}>
          My URL Shortener
        </h1>
        <p style={{textAlign:"center",color:"#64748b"}}>
          Make your long links short and easy to share.
        </p>

        <form onSubmit={shortenUrl}>
          <input
            type="url"
            required
            placeholder="Paste your long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width:"100%",
              padding:15,
              boxSizing:"border-box",
              border:"1px solid #cbd5e1",
              borderRadius:8,
              marginTop:20
            }}
          />

          <button
            disabled={loading}
            style={{
              width:"100%",
              padding:15,
              marginTop:15,
              background:"#2563eb",
              color:"white",
              border:0,
              borderRadius:8,
              cursor:"pointer"
            }}
          >
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>

        {error && <p style={{color:"red"}}>{error}</p>}

        {shortUrl && (
          <div style={{marginTop:20}}>
            <p>Your Short Link:</p>
            <a href={shortUrl} target="_blank">
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              style={{marginLeft:10,padding:8}}
            >
              Copy
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
