import { encryptText, isEncryptedValue } from "../lib/encryption";
import { prisma } from "../lib/prisma";

async function main() {
  const paymentProfiles = await prisma.paymentProfile.findMany({
    select: {
      id: true,
      apiKey: true,
      apiSecret: true,
      notifySecret: true,
    },
  });
  const revisions = await prisma.paymentProfileRevision.findMany({
    select: {
      id: true,
      snapshot: true,
    },
  });
  const cardItems = await prisma.cardItem.findMany({
    select: {
      id: true,
      secret: true,
    },
  });

  let encryptedProfiles = 0;
  let encryptedRevisions = 0;
  let encryptedCards = 0;
  let missingNotifySecret = 0;

  for (const profile of paymentProfiles) {
    if (!profile.notifySecret) {
      missingNotifySecret += 1;
    }

    const nextApiKey = isEncryptedValue(profile.apiKey) ? profile.apiKey : encryptText(profile.apiKey);
    const nextApiSecret = isEncryptedValue(profile.apiSecret) ? profile.apiSecret : encryptText(profile.apiSecret);
    const nextNotifySecret =
      !profile.notifySecret || isEncryptedValue(profile.notifySecret)
        ? profile.notifySecret
        : encryptText(profile.notifySecret);

    if (
      nextApiKey === profile.apiKey &&
      nextApiSecret === profile.apiSecret &&
      nextNotifySecret === profile.notifySecret
    ) {
      continue;
    }

    await prisma.paymentProfile.update({
      where: {
        id: profile.id,
      },
      data: {
        apiKey: nextApiKey,
        apiSecret: nextApiSecret,
        notifySecret: nextNotifySecret,
      },
    });
    encryptedProfiles += 1;
  }

  for (const revision of revisions) {
    if (isEncryptedValue(revision.snapshot)) {
      continue;
    }

    await prisma.paymentProfileRevision.update({
      where: {
        id: revision.id,
      },
      data: {
        snapshot: encryptText(revision.snapshot),
      },
    });
    encryptedRevisions += 1;
  }

  for (const card of cardItems) {
    if (isEncryptedValue(card.secret)) {
      continue;
    }

    await prisma.cardItem.update({
      where: {
        id: card.id,
      },
      data: {
        secret: encryptText(card.secret),
      },
    });
    encryptedCards += 1;
  }

  console.log(
    JSON.stringify(
      {
        encryptedProfiles,
        encryptedRevisions,
        encryptedCards,
        missingNotifySecret,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
