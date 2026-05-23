import { getStoryblokApi } from "@storyblok/react";

/**
 * Helper to fetch a story page from Storyblok API
 * @param slug The page URL slug (e.g. 'home')
 * @param version 'draft' for local preview editing, 'published' for live users
 */
export async function getStoryPage(slug: string, version: "draft" | "published" = "draft") {
  try {
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/${slug}`, {
      version,
      cv: Date.now(), // Cache-busting for real-time visual editing
    });
    return response.data.story;
  } catch (error) {
    console.error(`Failed to load Storyblok content for slug: ${slug}`, error);
    return null;
  }
}
