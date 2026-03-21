import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://www.aprntcshp.co.uk/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.aprntcshp.co.uk/organisations",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.aprntcshp.co.uk/communities",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.aprntcshp.co.uk/cv-resources",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.aprntcshp.co.uk/find-apprenticeships",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
