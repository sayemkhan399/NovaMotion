'use client';

import React, { useState } from 'react';
import { Check, CircleAlert, Info, LoaderCircle, TriangleAlert } from 'lucide-react';
import { SidebarNavigation, Toast } from 'novamotion-ui';

const toastVariants = {
  success: {
    title: 'Changes saved',
    description: 'Your workspace is up to date.',
    Icon: Check,
  },
  info: {
    title: 'New update available',
    description: 'A new version is ready to install.',
    Icon: Info,
  },
  warning: {
    title: 'Storage almost full',
    description: 'You are using 90% of your available storage.',
    Icon: TriangleAlert,
  },
  error: {
    title: 'Upload failed',
    description: 'Check your connection and try again.',
    Icon: CircleAlert,
  },
  loading: {
    title: 'Syncing your files',
    description: 'This usually takes just a moment.',
    Icon: LoaderCircle,
  },
};

const toastItems = Object.values(toastVariants).map((content) => ({
  label: content.title,
}));

export function ToastPlayground() {
  const [activeVariant, setActiveVariant] = useState('success');
  const activeToast = toastVariants[activeVariant];

  return (
    <div className="grid w-full max-w-[760px] gap-5 rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:grid-cols-[minmax(190px,0.8fr)_1.2fr] sm:p-6">
      <div>
        <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
          Toast styles
        </p>
        <SidebarNavigation
          items={toastItems}
          activeItem={activeToast.title}
          onSelect={(item) => {
            const selectedVariant = Object.keys(toastVariants).find(
              (variant) => toastVariants[variant].title === item.label,
            );
            if (selectedVariant) setActiveVariant(selectedVariant);
          }}
          className="max-w-none border-0 bg-transparent p-0 shadow-none"
        />
      </div>
      <div className="flex min-h-[220px] flex-col justify-center rounded-2xl bg-[#F8F8FA] p-5 sm:p-7">
        <p className="mb-4 text-[11px] font-medium text-[#71717A]">
          Select a style to preview its animated notification.
        </p>
        <Toast
          key={activeVariant}
          variant={activeVariant}
          title={activeToast.title}
          description={activeToast.description}
        />
      </div>
    </div>
  );
}

export function SidebarToastDemo() {
  const [selectedItem, setSelectedItem] = useState('Overview');
  const [toastRevision, setToastRevision] = useState(0);
  const items = [
    { label: 'Overview' },
    { label: 'Projects' },
    { label: 'Inbox' },
    { label: 'Settings' },
  ];

  return (
    <div className="w-full max-w-[300px] rounded-[24px] border border-black/[0.06] bg-[#F8F8FA] p-4 shadow-[0_12px_35px_rgba(0,0,0,0.06)]">
      <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
        Workspace
      </p>
      <SidebarNavigation
        items={items}
        activeItem={selectedItem}
        onSelect={(item) => {
          setSelectedItem(item.label);
          setToastRevision((revision) => revision + 1);
        }}
        className="max-w-none"
      />
      <div className="mt-4 min-h-[88px] rounded-2xl border border-black/[0.05] bg-white p-3">
        <Toast
          key={toastRevision}
          variant="info"
          title={`${selectedItem} selected`}
          description="Your sidebar selection has been updated."
          className="max-w-none"
        />
      </div>
      <p className="mt-3 px-2 text-[10px] text-[#A1A1AA]">
        Select a navigation item to trigger a toast.
      </p>
    </div>
  );
}
