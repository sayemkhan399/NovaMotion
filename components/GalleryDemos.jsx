'use client';

import Link from 'next/link';
import {
  DuoFlip,
  ImageCompare,
  MasonryGallery,
  ThumbnailCarousel,
} from 'novamotion-ui';

function ComparePreview({ images }) {
  return (
    <ImageCompare
      beforeSrc={images[0].src}
      afterSrc={images[1].src}
      beforeLabel={images[0].label}
      afterLabel={images[1].label}
      className="w-full"
    />
  );
}

const galleryOptions = [
  {
    name: 'DuoFlip',
    description: 'A glassy page-fold carousel with autoplay and drag controls.',
    Preview: DuoFlip,
    props: { aspect: 1.65, radius: 16, interval: 3.8 },
    details: '/components/duo-flip',
  },
  {
    name: 'MasonryGallery',
    description: 'An editorial image mosaic with a click-to-enlarge lightbox.',
    Preview: MasonryGallery,
    props: { className: 'max-w-[390px]' },
    details: '/components/masonry-gallery',
  },
  {
    name: 'ThumbnailCarousel',
    description: 'A featured image with working arrows and selectable thumbnails.',
    Preview: ThumbnailCarousel,
    props: { className: 'max-w-[390px]' },
    details: '/components/thumbnail-carousel',
  },
  {
    name: 'Image Compare',
    description: 'Reveal two photos with a draggable before-and-after slider.',
    Preview: ComparePreview,
    props: {},
    details: '/components/image-compare',
  },
];

export default function GalleryDemos({ images }) {
  return (
    <>
      {galleryOptions.map(({ name, description, Preview, props, details }) => (
        <article
          key={name}
          className="min-h-[390px] rounded-[24px] border border-black/[0.03] bg-[#F6F6F6] p-5"
        >
          <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#52525B]">
            Gallery
          </span>
          <div className="flex min-h-[250px] items-center justify-center py-4">
            <Preview images={images} {...props} />
          </div>
          <h3 className="text-sm font-semibold text-[#18181B]">{name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-[#71717A]">{description}</p>
          {details && (
            <Link
              href={details}
              className="mt-3 inline-flex text-xs font-semibold text-[#52525B] hover:text-[#18181B]"
            >
              View details <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          )}
        </article>
      ))}
    </>
  );
}
