'use client';

import React, { useState } from 'react';
import {
  FlipCard,
  GradientCard,
  GlassCard,
  ProUpgradeCard,
  SpotlightCard,
  TiltCard,
} from 'novamotion-ui';

const IMAGES = {
  profile:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  sneaker:
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  landscape:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85',
  kyoto:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85',
  restaurant:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85',
};

function ImageSurface({ image, label, className = '' }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${image}")` }}
    />
  );
}

function ActionButton({ children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
        active
          ? 'bg-[#FFDD00] text-[#18181B]'
          : 'bg-white/15 text-white hover:bg-white/25'
      }`}
    >
      {children}
    </button>
  );
}

export default function CardPreview({ componentName, onAction }) {
  const [saved, setSaved] = useState(false);
  const [actionLabel, setActionLabel] = useState('');

  const notify = (message) => {
    setActionLabel(message);
    onAction?.(message);
  };

  if (componentName === 'ProUpgradeCard') {
    return (
      <ProUpgradeCard
        className="!max-w-none"
        onUpgrade={() => notify('Upgrade selected.')}
        onCompare={() => notify('Plan comparison selected.')}
      />
    );
  }

  if (componentName === 'SpotlightCard') {
    return (
      <SpotlightCard className="!min-h-[205px] !max-w-none !items-start !p-4">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-3">
            <ImageSurface
              image={IMAGES.profile}
              label="Portrait of Maya Chen"
              className="h-12 w-12 shrink-0 rounded-full border-2 border-white/60"
            />
            <div className="min-w-0">
              <h3 className="truncate text-[14px] font-semibold">Maya Chen</h3>
              <p className="text-[11px] text-white/70">Product designer · San Francisco</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-white/75">
            Building thoughtful digital products and small moments of delight.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/60">12 projects · 4.9 rating</span>
            <ActionButton
              active={saved}
              onClick={() => {
                setSaved((current) => !current);
                notify(saved ? 'Profile removed from saved.' : 'Profile saved.');
              }}
            >
              {saved ? 'Saved' : 'Save profile'}
            </ActionButton>
          </div>
        </div>
      </SpotlightCard>
    );
  }

  if (componentName === 'TiltCard') {
    return (
      <TiltCard className="!min-h-[205px] !max-w-none !items-stretch !p-3">
        <div className="flex w-full gap-3">
          <ImageSurface
            image={IMAGES.sneaker}
            label="Red running shoe"
            className="w-[42%] shrink-0 rounded-[16px]"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#52525B]">
                New arrival
              </p>
              <h3 className="mt-1 text-[14px] font-bold">Velocity Runner</h3>
              <p className="mt-1 text-[11px] text-[#52525B]">Lightweight · Everyday</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-bold">$89</span>
              <ActionButton
                active={actionLabel === 'Added to bag.'}
                onClick={() =>
                  notify(
                    actionLabel === 'Added to bag.'
                      ? 'Removed from bag.'
                      : 'Added to bag.'
                  )
                }
              >
                {actionLabel === 'Added to bag.' ? 'Added' : 'Add to bag'}
              </ActionButton>
            </div>
          </div>
        </div>
      </TiltCard>
    );
  }

  if (componentName === 'GlassCard') {
    return (
      <div
        className="w-full rounded-[26px] bg-cover bg-center p-2"
        style={{ backgroundImage: `url("${IMAGES.landscape}")` }}
      >
        <GlassCard className="!min-h-[205px] !max-w-none !items-start !bg-white/35 !p-4 text-white">
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/80">Saturday, 9:41 AM</p>
                <h3 className="mt-1 text-[15px] font-semibold">Lake Louise</h3>
              </div>
              <span aria-hidden="true" className="text-3xl leading-none">☀</span>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-[38px] font-light leading-none">18°</p>
              <div className="text-right text-[11px] leading-relaxed text-white/85">
                <p>Feels like 20°</p>
                <p>H 21° · L 11°</p>
              </div>
            </div>
            <ActionButton
              active={actionLabel === 'Forecast expanded.'}
              onClick={() =>
                notify(
                  actionLabel === 'Forecast expanded.'
                    ? 'Forecast collapsed.'
                    : 'Forecast expanded.'
                )
              }
            >
              {actionLabel === 'Forecast expanded.' ? 'Forecast open' : 'See forecast'}
            </ActionButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (componentName === 'FlipCard') {
    return (
      <FlipCard
        className="!h-[205px] !max-w-none"
        backFace={
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
              Your itinerary
            </p>
            <h3 className="text-[16px] font-bold">Kyoto, Japan</h3>
            <p className="text-[11px] leading-relaxed text-white/80">
              5 days · 12 curated places · Best visited in spring
            </p>
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium">
              Tap to flip back
            </span>
          </div>
        }
        onClick={() => notify('Kyoto trip details opened.')}
      >
        <div className="absolute inset-0">
          <ImageSurface
            image={IMAGES.kyoto}
            label="Traditional street in Kyoto"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/75">
              Travel guide
            </p>
            <h3 className="mt-1 text-[17px] font-bold">A week in Kyoto</h3>
            <p className="mt-0.5 text-[11px] text-white/75">Tap to discover the itinerary</p>
          </div>
        </div>
      </FlipCard>
    );
  }

  if (componentName === 'GradientCard') {
    return (
      <GradientCard className="!max-w-none">
        <div className="flex w-full flex-col gap-3">
          <ImageSurface
            image={IMAGES.restaurant}
            label="Warmly lit neighborhood restaurant"
            className="h-[82px] rounded-[16px]"
          />
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[14px] font-bold">The Garden Table</h3>
              <p className="mt-1 text-[10px] text-white/65">Italian · Downtown</p>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold">
              4.8 ★
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/65">Tonight · 7:30 PM</span>
            <ActionButton
              active={actionLabel === 'Table reserved.'}
              onClick={() =>
                notify(actionLabel === 'Table reserved.' ? 'Reservation cancelled.' : 'Table reserved.')
              }
            >
              {actionLabel === 'Table reserved.' ? 'Reserved' : 'Reserve'}
            </ActionButton>
          </div>
        </div>
      </GradientCard>
    );
  }

  return null;
}
