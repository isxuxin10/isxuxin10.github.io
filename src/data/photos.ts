export type Photo = {
  id: string
  src: string
  alt: string
  layout?: 'portrait' | 'landscape' | 'square' | 'panoramic' | 'featured'
}

export type PhotoCollection = {
  id: 'landscapes' | 'botanical' | 'urban'
  title: string
  intro: string
  photos: Photo[]
}

// Replace the demo image paths below with your own files in //images/.
// Example: src: '/images/landscapes/my-mountain.jpg'
export const photoCollections: PhotoCollection[] = [
  {
    id: 'landscapes',
    title: 'Of Mountains, Streams, Rivers & Seas',
    intro: 'A study of distance, movement, and the quiet force of the natural world.',
    photos: [
      { id: 'landscape3', src: '/images/landscapes/landscape3.JPG', alt: 'sea', layout: 'featured' },
      { id: 'landscape6', src: '/images/landscapes/landscape6.JPG', alt: 'A quiet river among distant buildings', layout: 'portrait' },
      { id: 'landscape8', src: '/images/landscapes/landscape8.JPG', alt: 'stunning water', layout: 'landscape' },
      { id: 'landscape13', src: '/images/landscapes/landscape13.JPG', alt: 'Mountain lake and layered ridgelines', layout: 'panoramic' },
    ],
  },
  {
    id: 'botanical',
    title: 'Of Trees, Leaves, Blossoms & Grass',
    intro: 'Small details, changing light, and the textures of living things.',
    photos: [
      { id: 'botanical18', src: '/images/botanical/botanical18.jpeg', alt: 'Sunlight filtering through a forest', layout: 'featured' },
      { id: 'botanical6', src: '/images/botanical/botanical6.JPG', alt: 'A close study of green leaves', layout: 'portrait' },
      { id: 'botanical24', src: '/images/botanical/botanical24.jpg', alt: 'Botanical forms in soft natural light', layout: 'square' },
      { id: 'botanical21', src: '/images/botanical/botanical21.JPG', alt: 'A quiet field at the edge of morning light', layout: 'landscape' },
    ],
  },
  {
    id: 'urban',
    title: 'Of Towers, Terraces, Shops, Streets',
    intro: 'Lines, corners, and fleeting encounters in the built environment.',
    photos: [
      { id: 'urban1', src: '/images/urban/urban1.JPG', alt: 'Sculptural modern architecture', layout: 'featured' },
      { id: 'urban9', src: '/images/urban/urban9.JPG', alt: 'Urban buildings gathered along a street', layout: 'landscape' },
      { id: 'urban2', src: '/images/urban/urban2.JPG', alt: 'City architecture against the evening sky', layout: 'portrait' },
      { id: 'urban4', src: '/images/urban/urban4.JPG', alt: 'A city street seen from a quiet corner', layout: 'panoramic' },
    ],
  },
]
