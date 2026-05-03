import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import "./App.css";

const heroImage = "/images/heffy-hero..JPEG";
const unitedMastersLink = "https://unitedmasters.com/a/h3ffy98";

type Stats = {
  allTimeStreams: string;
  topPlatform: string;
  topCity: string;
  topCityStreams: string;
  topTrack: string;
  topTrackStreams: string;
  trendingTrack: string;
  trendingTrackStreams: string;
  trendChange: string;
  topCities: AudienceStat[];
  topCountries: AudienceStat[];
  platforms: AudienceStat[];
  sources: AudienceStat[];
};

type AudienceStat = {
  name: string;
  streams: string;
};

const fallbackStats: Stats = {
  allTimeStreams: "157.9k",
  topPlatform: "Spotify",
  topCity: "Chicago",
  topCityStreams: "63",
  topTrack: "Lose Sum",
  topTrackStreams: "992",
  trendingTrack: "Flights Over Feelins",
  trendingTrackStreams: "7",
  trendChange: "+133.3%",
  topCities: [
    { name: "Los Angeles", streams: "9,339" },
    { name: "Chicago", streams: "8,251" },
    { name: "New York", streams: "5,772" },
    { name: "Dallas-Ft. Worth", streams: "4,648" },
    { name: "Atlanta", streams: "3,392" },
  ],
  topCountries: [
    { name: "United States", streams: "131.9k" },
    { name: "Canada", streams: "6,327" },
    { name: "United Kingdom", streams: "3,893" },
    { name: "Poland", streams: "1,379" },
    { name: "Germany", streams: "1,296" },
  ],
  platforms: [
    { name: "Spotify", streams: "138.4k" },
    { name: "Apple Music", streams: "16.5k" },
    { name: "YouTube", streams: "2,958" },
  ],
  sources: [
    { name: "Album", streams: "2,515" },
    { name: "Library", streams: "92.5k" },
    { name: "Playlist", streams: "38.4k" },
    { name: "Radio", streams: "7,032" },
  ],
};

function withFallbackStats(stats: Partial<Stats>): Stats {
  return {
    ...fallbackStats,
    ...stats,
    topCities: Array.isArray(stats.topCities)
      ? stats.topCities
      : fallbackStats.topCities,
    topCountries: Array.isArray(stats.topCountries)
      ? stats.topCountries
      : fallbackStats.topCountries,
    platforms: Array.isArray(stats.platforms)
      ? stats.platforms
      : fallbackStats.platforms,
    sources: Array.isArray(stats.sources) ? stats.sources : fallbackStats.sources,
  };
}

export default function App() {
  const quotes = useMemo(
    () => [
      "Me, I want what's coming to me: the world.",
      "Life is 5% what happens, and 95% how you react.",
      "I just want to be the best version of myself.",
    ],
    []
  );

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState<Stats>(fallbackStats);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [quotes.length]);

  useEffect(() => {
    fetch("/stats.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load stats");
        }

        return response.json() as Promise<Partial<Stats>>;
      })
      .then((loadedStats) => setStats(withFallbackStats(loadedStats)))
      .catch(() => setStats(fallbackStats));
  }, []);

  return (
    <main className="heffy-page">
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-mark">
            <motion.div
              className="outline-h"
              aria-hidden="true"
              initial={{ opacity: 0, y: -18 }}
              animate={{
                opacity: 1,
                y: [0, -12, 0],
                textShadow: [
                  "0 0 12px rgba(205, 191, 158, 0.35)",
                  "0 0 28px rgba(205, 191, 158, 0.78)",
                  "0 0 12px rgba(205, 191, 158, 0.35)",
                ],
              }}
              transition={{
                opacity: { duration: 0.7, ease: "easeOut" },
                y: { duration: 5.8, repeat: Infinity, ease: "easeInOut" },
                textShadow: {
                  duration: 5.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              H
            </motion.div>

            <motion.div
              className="mini-globe"
              aria-label="Rotating HEFFY globe"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <span className="mini-globe-ring mini-globe-ring-one" />
              <span className="mini-globe-ring mini-globe-ring-two" />
              <span className="mini-globe-line mini-globe-line-v" />
              <span className="mini-globe-line mini-globe-line-h" />
              <span className="mini-globe-text">HEFFY</span>
            </motion.div>
          </div>

          <div className="left-content">
            <motion.p
              className="artist-tag"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            >
              Trap <span>/</span> Alternative <span>/</span> Artist
            </motion.p>

            <motion.h1
              className="big-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
            >
              HEFFY
            </motion.h1>

            <motion.p
              key={quoteIndex}
              className="name-quote"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {quotes[quoteIndex]}
            </motion.p>

            <div className="quote-globe-wrap" aria-live="polite">
              <motion.div
                className="globe"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 54, repeat: Infinity, ease: "linear" }}
              >
                <span className="globe-ring ring-one" />
                <span className="globe-ring ring-two" />
                <span className="globe-ring ring-three" />
                <span className="globe-line vertical-one" />
                <span className="globe-line vertical-two" />
                <span className="globe-line vertical-three" />
                <span className="globe-line vertical-four" />
                <span className="globe-line vertical-five" />
                <span className="globe-line horizontal-one" />
                <span className="globe-line horizontal-two" />
                <span className="globe-line horizontal-three" />
                <span className="globe-line horizontal-four" />
                <span className="globe-line horizontal-five" />
              </motion.div>

              <motion.div
                className="orbit"
                aria-hidden="true"
                animate={{ rotate: -360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              >
                <span className="star star-left">*</span>
                <span className="star star-right">*</span>
                <span className="orbit-text orbit-text-top">
                  Believe in you
                </span>
                <span className="orbit-text orbit-text-bottom">
                  The world is yours
                </span>
              </motion.div>
            </div>
          </div>

          <div className="hero-actions">
            <a className="listen-btn" href="#music">
              Listen Now
              <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a className="explore-link" href="#story">
              Explore
            </a>
          </div>
        </div>

        <div className="hero-right">
          <button
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className="hamburger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          {menuOpen && (
            <motion.nav
              className="menu-panel"
              aria-label="Main menu"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="#story" onClick={() => setMenuOpen(false)}>
                Story
              </a>
              <a href="#stats" onClick={() => setMenuOpen(false)}>
                Stats
              </a>
              <a
                href={unitedMastersLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Music
                <ArrowUpRight size={24} strokeWidth={1.4} aria-hidden="true" />
              </a>
            </motion.nav>
          )}

          <img className="hero-img" src={heroImage} alt="Heffy portrait" />
        </div>
      </section>

      <section className="music-section" id="music">
        <p className="section-tag">Popular songs</p>
        <h2>Music from the tapes.</h2>

        <div className="card-grid">
          <article className="music-card">
            <img
              className="music-cover"
              src="/images/black-swan-cover.jpg"
              alt="Black Swan cover"
            />
            <p>Black Swan</p>
            <h3>Blow My High</h3>
            <a
              className="music-video-link"
              href="https://youtu.be/tqGkqM5J6bs"
              target="_blank"
              rel="noreferrer"
              aria-label="Play Blow My High on YouTube"
            >
              <img
                className="music-video-thumb"
                src="https://i.ytimg.com/vi/tqGkqM5J6bs/hqdefault.jpg"
                alt=""
              />
              <span className="play-button" aria-hidden="true" />
            </a>
            <a
              href="https://youtu.be/tqGkqM5J6bs"
              target="_blank"
              rel="noreferrer"
            >
              Listen
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </article>

          <article className="music-card">
            <img
              className="music-cover"
              src="/images/ukyio-cover.jpg"
              alt="UKYIO cover"
            />
            <p>UKYIO</p>
            <h3>Die 4 Me/Ride 4 Me</h3>
            <a
              className="music-video-link"
              href="https://youtu.be/WTwskcN9CDg"
              target="_blank"
              rel="noreferrer"
              aria-label="Play Die 4 Me/Ride 4 Me on YouTube"
            >
              <img
                className="music-video-thumb"
                src="https://i.ytimg.com/vi/WTwskcN9CDg/hqdefault.jpg"
                alt=""
              />
              <span className="play-button" aria-hidden="true" />
            </a>
            <a
              href="https://youtu.be/WTwskcN9CDg"
              target="_blank"
              rel="noreferrer"
            >
              Listen
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </article>

          <article className="music-card">
            <img
              className="music-cover"
              src="/images/brazy-cover.webp"
              alt="BRAZY cover"
            />
            <p>BRAZY</p>
            <h3>Lock IN</h3>
            <a
              className="music-video-link"
              href="https://youtu.be/1CFELjSiFGA"
              target="_blank"
              rel="noreferrer"
              aria-label="Play Lock IN on YouTube"
            >
              <img
                className="music-video-thumb"
                src="https://i.ytimg.com/vi/1CFELjSiFGA/hqdefault.jpg"
                alt=""
              />
              <span className="play-button" aria-hidden="true" />
            </a>
            <a
              href="https://youtu.be/1CFELjSiFGA"
              target="_blank"
              rel="noreferrer"
            >
              Listen
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </article>

          <article className="music-card">
            <img
              className="music-cover"
              src="/images/brazy-cover.webp"
              alt="Lose Sum cover"
            />
            <p>Top streamed song</p>
            <h3>Lose Sum</h3>
            <a
              className="music-video-link"
              href="https://youtu.be/8CHwrEWHfkQ"
              target="_blank"
              rel="noreferrer"
              aria-label="Play Lose Sum on YouTube"
            >
              <img
                className="music-video-thumb"
                src="https://i.ytimg.com/vi/8CHwrEWHfkQ/hqdefault.jpg"
                alt=""
              />
              <span className="play-button" aria-hidden="true" />
            </a>
            <a
              href="https://youtu.be/8CHwrEWHfkQ"
              target="_blank"
              rel="noreferrer"
            >
              Listen
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="stats-section" id="stats">
        <div className="stats-globe-tags" aria-hidden="true">
          <span>HEFFY</span>
          <span>11</span>
          <span>HEFFY</span>
          <span>11</span>
          <span>HEFFY</span>
          <span>11</span>
          <span>HEFFY</span>
          <span>11</span>
        </div>

        <p className="section-tag dark">UnitedMasters stats</p>
        <h2>Numbers behind the music.</h2>

        <div className="stats-grid">
          <article className="stat-card">
            <p>All-time streams</p>
            <strong>{stats.allTimeStreams}</strong>
            <span>Most streams coming from {stats.topPlatform}</span>
          </article>

          <article className="stat-card">
            <p>Top city</p>
            <strong>{stats.topCity}</strong>
            <span>{stats.topCityStreams} streams in the last 7 days</span>
          </article>

          <article className="stat-card">
            <p>Top track</p>
            <strong>{stats.topTrack}</strong>
            <span>{stats.topTrackStreams} streams in the last 7 days</span>
          </article>

          <article className="stat-card">
            <p>Track trend</p>
            <strong>{stats.trendingTrack}</strong>
            <span>
              {stats.trendingTrackStreams} streams in the last 7 days (
              {stats.trendChange})
            </span>
          </article>
        </div>

        <div className="audience-grid">
          <article className="audience-card">
            <p className="audience-label">Top U.S. cities</p>
            <ol>
              {stats.topCities.map((city) => (
                <li key={city.name}>
                  <span>{city.name}</span>
                  <strong>{city.streams}</strong>
                </li>
              ))}
            </ol>
          </article>

          <article className="audience-card">
            <p className="audience-label">Top countries</p>
            <ol>
              {stats.topCountries.map((country) => (
                <li key={country.name}>
                  <span>{country.name}</span>
                  <strong>{country.streams}</strong>
                </li>
              ))}
            </ol>
          </article>
        </div>

        <div className="platform-breakdown">
          <p className="breakdown-heading">
            Your top platform is {stats.topPlatform} with{" "}
            {stats.platforms[0]?.streams ?? "138.4k"} all-time streams
          </p>

          <div className="platform-grid">
            {stats.platforms.map((platform) => (
              <article className="platform-card" key={platform.name}>
                <span
                  className={`platform-icon ${platform.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  aria-hidden="true"
                >
                  {platform.name === "Spotify"
                    ? "S"
                    : platform.name === "Apple Music"
                      ? "A"
                      : "Y"}
                </span>
                <p>{platform.name}</p>
                <strong>{platform.streams}</strong>
              </article>
            ))}
          </div>

          <p className="stats-source">
            Source: Spotify, Apple Music, YouTube - As of Thu, Apr 30
          </p>

          <div className="source-grid">
            {stats.sources.map((source) => (
              <article className="source-card" key={source.name}>
                <p>{source.name}</p>
                <strong>{source.streams}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div>
          <p className="section-tag dark">Story</p>
          <h2>Just keep going.</h2>
        </div>

        <p>
          Born in October 1998, Quentin Glover, better known as Heffy, moved
          around a lot between Chicago and Minnesota while growing up. Music is
          his life, and every release is part of the mission to upgrade his
          sound, sharpen his voice, and keep pushing forward.
        </p>
      </section>
    </main>
  );
}
