import StoryblokProvider from "../components/StoryblokProvider";
import VantaraPageClient from "../components/VantaraPageClient";

export const revalidate = 0; // Fetch fresh content on every request

async function getStoryblokContent() {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=draft`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.warn("Storyblok fetch returned status:", res.status);
      return null;
    }
    const data = await res.json();
    return data.story || null;
  } catch (err) {
    console.error("Storyblok fetch failed:", err);
    return null;
  }
}

export default async function Home() {
  const story = await getStoryblokContent();

  return (
    <StoryblokProvider>
      <VantaraPageClient story={story} />
    </StoryblokProvider>
  );
}
