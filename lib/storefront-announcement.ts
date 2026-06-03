import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeStoredImagePath, normalizeTelegramUrl } from "@/lib/uploads";

const PLATFORM_STOREFRONT_SETTINGS_ID = "platform";

const platformStorefrontSettingsSelect = {
  announcementEnabled: true,
  announcementTitle: true,
  announcementBody: true,
  coverImage: true,
  telegramSupportUrl: true,
  telegramGroupUrl: true,
  updatedAt: true,
} satisfies Prisma.PlatformStorefrontSettingsSelect;

export type StorefrontAnnouncementSnapshot = {
  enabled: boolean;
  title: string | null;
  body: string | null;
  updatedAt: Date | null;
};

export type StorefrontContactSnapshot = {
  coverImage: string | null;
  telegramSupportUrl: string | null;
  telegramGroupUrl: string | null;
};

type MerchantAnnouncementSource = {
  storeAnnouncementEnabled: boolean;
  storeAnnouncementTitle: string | null;
  storeAnnouncementBody: string | null;
  updatedAt: Date;
};

type MerchantContactSource = {
  storeCoverImage: string | null;
  telegramSupportUrl: string | null;
  telegramGroupUrl: string | null;
};

function normalizeAnnouncementTitle(value: string) {
  const title = value.trim();

  if (title.length > 80) {
    throw new Error("公告标题最多 80 个字符。");
  }

  return title || null;
}

function normalizeAnnouncementBody(value: string) {
  const body = value.trim();

  if (body.length > 1000) {
    throw new Error("公告正文最多 1000 个字符。");
  }

  return body || null;
}

function buildAnnouncementSnapshot(input: {
  enabled: boolean;
  title: string | null;
  body: string | null;
  updatedAt: Date | null;
}): StorefrontAnnouncementSnapshot {
  return {
    enabled: input.enabled,
    title: input.title,
    body: input.body,
    updatedAt: input.updatedAt,
  };
}

function normalizeAnnouncementInput(input: {
  enabled?: boolean;
  title: string;
  body: string;
}) {
  const title = normalizeAnnouncementTitle(input.title);
  const body = normalizeAnnouncementBody(input.body);
  const enabled = input.enabled ?? false;

  if (enabled && !title && !body) {
    throw new Error("启用公告时，至少需要填写标题或正文。");
  }

  return {
    enabled,
    title,
    body,
  };
}

export const EMPTY_STOREFRONT_ANNOUNCEMENT = Object.freeze({
  enabled: false,
  title: null,
  body: null,
  updatedAt: null,
}) satisfies StorefrontAnnouncementSnapshot;

export const EMPTY_STOREFRONT_CONTACT = Object.freeze({
  coverImage: null,
  telegramSupportUrl: null,
  telegramGroupUrl: null,
}) satisfies StorefrontContactSnapshot;

export function hasStorefrontContactLinks(contact: StorefrontContactSnapshot | null | undefined) {
  return Boolean(contact && (contact.telegramSupportUrl || contact.telegramGroupUrl));
}

export function hasStorefrontAnnouncement(announcement: StorefrontAnnouncementSnapshot | null | undefined) {
  return Boolean(announcement?.enabled && (announcement.title || announcement.body));
}

export function getStorefrontAnnouncementHeading(announcement: StorefrontAnnouncementSnapshot) {
  return announcement.title || "店铺公告";
}

export function getMerchantStorefrontAnnouncement(
  merchant: MerchantAnnouncementSource | null | undefined,
): StorefrontAnnouncementSnapshot {
  if (!merchant) {
    return EMPTY_STOREFRONT_ANNOUNCEMENT;
  }

  return buildAnnouncementSnapshot({
    enabled: merchant.storeAnnouncementEnabled,
    title: merchant.storeAnnouncementTitle,
    body: merchant.storeAnnouncementBody,
    updatedAt: merchant.updatedAt,
  });
}

export function getMerchantStorefrontContact(
  merchant: MerchantContactSource | null | undefined,
): StorefrontContactSnapshot {
  if (!merchant) {
    return EMPTY_STOREFRONT_CONTACT;
  }

  return {
    coverImage: merchant.storeCoverImage,
    telegramSupportUrl: merchant.telegramSupportUrl,
    telegramGroupUrl: merchant.telegramGroupUrl,
  };
}

export async function getPlatformStorefrontContact(): Promise<StorefrontContactSnapshot> {
  const settings = await prisma.platformStorefrontSettings.findUnique({
    where: {
      id: PLATFORM_STOREFRONT_SETTINGS_ID,
    },
    select: {
      coverImage: true,
      telegramSupportUrl: true,
      telegramGroupUrl: true,
    },
  });

  if (!settings) {
    return EMPTY_STOREFRONT_CONTACT;
  }

  return {
    coverImage: settings.coverImage,
    telegramSupportUrl: settings.telegramSupportUrl,
    telegramGroupUrl: settings.telegramGroupUrl,
  };
}

export async function getPlatformStorefrontAnnouncement(): Promise<StorefrontAnnouncementSnapshot> {
  const settings = await prisma.platformStorefrontSettings.findUnique({
    where: {
      id: PLATFORM_STOREFRONT_SETTINGS_ID,
    },
    select: platformStorefrontSettingsSelect,
  });

  if (!settings) {
    return EMPTY_STOREFRONT_ANNOUNCEMENT;
  }

  return buildAnnouncementSnapshot({
    enabled: settings.announcementEnabled,
    title: settings.announcementTitle,
    body: settings.announcementBody,
    updatedAt: settings.updatedAt,
  });
}

export async function savePlatformStorefrontAnnouncement(input: {
  enabled?: boolean;
  title: string;
  body: string;
  coverImage?: string;
  telegramSupportUrl?: string;
  telegramGroupUrl?: string;
}): Promise<StorefrontAnnouncementSnapshot> {
  const normalized = normalizeAnnouncementInput(input);
  const coverImage = normalizeStoredImagePath(input.coverImage);
  const telegramSupportUrl = normalizeTelegramUrl(input.telegramSupportUrl);
  const telegramGroupUrl = normalizeTelegramUrl(input.telegramGroupUrl);

  const settings = await prisma.platformStorefrontSettings.upsert({
    where: {
      id: PLATFORM_STOREFRONT_SETTINGS_ID,
    },
    update: {
      announcementEnabled: normalized.enabled,
      announcementTitle: normalized.title,
      announcementBody: normalized.body,
      coverImage,
      telegramSupportUrl,
      telegramGroupUrl,
    },
    create: {
      id: PLATFORM_STOREFRONT_SETTINGS_ID,
      announcementEnabled: normalized.enabled,
      announcementTitle: normalized.title,
      announcementBody: normalized.body,
      coverImage,
      telegramSupportUrl,
      telegramGroupUrl,
    },
    select: platformStorefrontSettingsSelect,
  });

  return buildAnnouncementSnapshot({
    enabled: settings.announcementEnabled,
    title: settings.announcementTitle,
    body: settings.announcementBody,
    updatedAt: settings.updatedAt,
  });
}

export async function saveMerchantStorefrontAnnouncement(input: {
  merchantAccountId: string;
  enabled?: boolean;
  title: string;
  body: string;
  coverImage?: string;
  telegramSupportUrl?: string;
  telegramGroupUrl?: string;
}): Promise<StorefrontAnnouncementSnapshot> {
  const normalized = normalizeAnnouncementInput(input);
  const coverImage = normalizeStoredImagePath(input.coverImage);
  const telegramSupportUrl = normalizeTelegramUrl(input.telegramSupportUrl);
  const telegramGroupUrl = normalizeTelegramUrl(input.telegramGroupUrl);

  const merchant = await prisma.merchantAccount.update({
    where: {
      id: input.merchantAccountId,
    },
    data: {
      storeAnnouncementEnabled: normalized.enabled,
      storeAnnouncementTitle: normalized.title,
      storeAnnouncementBody: normalized.body,
      storeCoverImage: coverImage,
      telegramSupportUrl,
      telegramGroupUrl,
    },
    select: {
      storeAnnouncementEnabled: true,
      storeAnnouncementTitle: true,
      storeAnnouncementBody: true,
      updatedAt: true,
    },
  });

  return getMerchantStorefrontAnnouncement(merchant);
}
