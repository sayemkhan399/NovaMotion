'use client';

import Link from 'next/link';
import {
  DuoFlip,
  GsapInteractive,
  ImageCompare,
  MasonryGallery,
  ThumbnailCarousel,
} from 'novamotion-ui';
import { useState } from 'react';

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
    Preview: DuoFlip,
    props: { aspect: 1.65, radius: 16, interval: 3.8 },
    details: '/components/duo-flip',
  },
  {
    name: 'MasonryGallery',
    Preview: MasonryGallery,
    props: { className: 'max-w-[390px]' },
    details: '/components/masonry-gallery',
  },
  {
    name: 'ThumbnailCarousel',
    Preview: ThumbnailCarousel,
    props: { className: 'max-w-[390px]' },
    details: '/components/thumbnail-carousel',
  },
  {
    name: 'Image Compare',
    Preview: ComparePreview,
    props: {},
    details: '/components/image-compare',
  },
];

export default function GalleryDemos({ images }) {
  const [previewRevisions, setPreviewRevisions] = useState({});

  return (
    <>
      {galleryOptions.map(({ name, Preview, props, details }) => (
        <GsapInteractive
          as="article"
          key={name}
          className="min-h-[390px] rounded-[24px] border border-black/[0.03] bg-[#F6F6F6] p-5"
        >
          <div>
            <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#52525B]">
              Gallery
            </span>
            <h3 className="mt-2 text-sm font-semibold text-[#18181B]">{name}</h3>
          </div>
          <div
            key={`${name}-${previewRevisions[name] ?? 0}`}
            className="flex min-h-[250px] items-center justify-center py-4"
          >
            <Preview images={images} {...props} />
          </div>
          <div className="mt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label={`Restart ${name} preview`}
              title="Restart preview"
              onClick={() =>
                setPreviewRevisions((current) => ({
                  ...current,
                  [name]: (current[name] ?? 0) + 1,
                }))
              }
              className="grid size-9 place-items-center rounded-full border border-[#E4E4E7] bg-white text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            {details && (
              <Link
                href={details}
                aria-label={`View ${name} details`}
                title="View details"
                className="grid size-9 place-items-center rounded-full bg-[#18181B] text-white transition-colors hover:bg-[#3F3F46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </Link>
            )}
          </div>
        </GsapInteractive>
      ))}
    </>
  );
}
