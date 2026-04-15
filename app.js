const { useEffect, useMemo, useRef, useState } = React;

const RESUME = {
  name: "Brian Lee",
  tagline: "Software Developer | Computer Science | Toronto, ON",
  email: "junebrianhj@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/june-brian-lee/",
    github: "https://github.com/junebrian",
    website: "https://junebrian.github.io",
  },
  about: [
    "I’m a Computer Science student and software developer focused on building reliable, accessible web experiences.",
    "Outside of software, I love photography—this site doubles as a simple gallery of my work.",
  ],
};

function useHashRoute() {
  const getRoute = () => {
    const raw = window.location.hash || "#/";
    const cleaned = raw.replace(/^#/, "");
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  };
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function useHeroPast(enabled) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setPast(false);
      return undefined;
    }
    const el = document.getElementById("home");
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => setPast(!e.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);
  return past;
}

const NAV = [
  { label: "About", to: "/" },
  { label: "Photos", to: "/photos" },
];

function SocialIconGitHub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function SocialIconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function SocialIconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function HeroSplash() {
  const scrollToContent = () => {
    document.getElementById("page-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-splash" aria-label="Introduction">
      <div className="hero-splash-inner">
        <h1 className="hero-name">{RESUME.name}</h1>
        <p className="hero-tagline">{RESUME.tagline}</p>
        <div className="hero-social">
          <a
            href={RESUME.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <SocialIconGitHub />
          </a>
          <a
            href={RESUME.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <SocialIconLinkedIn />
          </a>
          <a href={`mailto:${RESUME.email}`} aria-label="Email">
            <SocialIconMail />
          </a>
        </div>
      </div>
      <button
        type="button"
        className="hero-scroll"
        aria-label="Scroll to about"
        onClick={scrollToContent}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>
      </button>
    </section>
  );
}

function NavOverlay({ route }) {
  const isPhotos = route === "/photos";
  const heroPast = useHeroPast(!isPhotos);
  const solid = heroPast || isPhotos;

  const current = isPhotos ? "/photos" : "/";
  return (
    <header className={`nav-overlay${isPhotos ? " is-photos" : ""}${solid ? " is-solid" : ""}`} role="banner">
      <nav className="nav-overlay-links" aria-label="Primary">
        {NAV.map((n) => (
          <a
            key={n.to}
            href={`#${n.to}`}
            aria-current={current === n.to ? "true" : undefined}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function About() {
  return (
    <section className="section">
      <h2>About</h2>
      <div className="grid">
        <div className="card span-7">
          <h3>Hi — I’m {RESUME.name}</h3>
          <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
            {RESUME.about[0]}
          </p>
          <p className="muted" style={{ margin: "10px 0 0", lineHeight: 1.7 }}>
            {RESUME.about[1]}
          </p>
          <div className="hero-actions" style={{ marginTop: 14 }}>
            <a className="button primary" href="#/photos">
              View photos
            </a>
            <a className="button" href={RESUME.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button" href={RESUME.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="button" href={`mailto:${RESUME.email}`}>
              Email
            </a>
          </div>
        </div>
        <div className="card small span-5">
          <h3>Now</h3>
          <p>
            Working on projects, learning, and documenting what I build. If you want to collaborate, reach out.
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <HeroSplash />
      <div id="page-content" className="page-body container">
        <About />
      </div>
    </>
  );
}

function normalize(s) {
  return (s || "").toLowerCase().trim();
}

async function loadPhotos() {
  const res = await fetch("./photos/photos.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load photos.json");
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data
    .filter((p) => p && p.src)
    .map((p) => ({
      src: String(p.src),
      title: p.title ? String(p.title) : "",
      date: p.date ? String(p.date) : "",
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    }));
}

function PhotoModal({ photo, onClose }) {
  const closeBtnRef = useRef(null);
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Photo preview"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal">
        <img src={photo.src} alt={photo.title || "Photo"} />
        <div className="modal-bar">
          <div className="modal-title">
            <strong>{photo.title || "Untitled"}</strong>
            <span>
              {photo.date || "—"} {photo.tags?.length ? `· ${photo.tags.join(" · ")}` : ""}
            </span>
          </div>
          <div className="modal-actions">
            <a className="button" href={photo.src} target="_blank" rel="noreferrer">
              Open
            </a>
            <button ref={closeBtnRef} className="button primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotosPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    loadPhotos()
      .then((p) => {
        if (!alive) return;
        setPhotos(p);
      })
      .catch((e) => {
        if (!alive) return;
        setError("Couldn’t load your catalogue. Add photos to /photos and update photos/photos.json.");
        console.error(e);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return photos;
    return photos.filter((p) => {
      const hay = [p.title, p.date, ...(p.tags || []), p.src]
        .filter(Boolean)
        .map(normalize)
        .join(" ");
      return hay.includes(q);
    });
  }, [photos, query]);

  return (
    <div id="page-content" className="container">
      <section className="hero">
        <p className="kicker">Photo catalogue</p>
        <h2 className="headline">Photos I have taken through the years. Just a passion of mine!</h2>
      </section>

      <section className="section">
        <div className="gallery-top">
          <div>
            <h2 style={{ margin: 0 }}>Gallery</h2>
            <div className="meta">
              {loading ? "Loading…" : `${filtered.length} photo${filtered.length === 1 ? "" : "s"}`}
            </div>
          </div>
          <div className="search">
            <label className="muted" htmlFor="q">
              Search
            </label>
            <input
              id="q"
              type="search"
              value={query}
              placeholder="title, tag, date…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="card">
            <h3>Setup needed</h3>
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div className="card">
            <h3>Loading</h3>
            <p>Fetching your catalogue…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card">
            <h3>No matches</h3>
            <p>Try a different search, or add more photos.</p>
          </div>
        ) : (
          <div className="masonry" aria-label="Photo grid">
            {filtered.map((p) => (
              <div
                key={p.src}
                className="thumb"
                role="button"
                tabIndex={0}
                onClick={() => setActive(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(p);
                }}
              >
                <img src={p.src} alt={p.title || "Photo"} loading="lazy" />
                <div className="cap">
                  <div
                    style={{
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.title || "Untitled"}
                  </div>
                  <span>{p.date || ""}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {active ? <PhotoModal photo={active} onClose={() => setActive(null)} /> : null}
    </div>
  );
}

function App() {
  const route = useHashRoute();
  const isPhotos = route === "/photos";
  const page = isPhotos ? <PhotosPage /> : <AboutPage />;
  return (
    <div className="shell">
      <NavOverlay route={route} />
      <main id="main" className="main">
        {page}
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            © {new Date().getFullYear()} {RESUME.name}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={RESUME.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={RESUME.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${RESUME.email}`}>Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

