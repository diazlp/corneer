import { MessageCenter } from "@/components/message-center";
import { threadKey } from "@/lib/sourcing";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Conversations & meeting proposals",
    "Discuss an apparel brief with the company you chose and propose a meeting in the Corneer frontend demo. Nothing is sent externally.",
    "/messages",
    false,
  ),
  title: null,
};

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    request?: string | string[];
    supplier?: string | string[];
  }>;
}) {
  const { request, supplier } = await searchParams;
  return (
    <main className="messages-page">
      <MessageCenter
        key={
          typeof request === "string" && typeof supplier === "string"
            ? threadKey(request, supplier)
            : "inbox"
        }
        initialKey={
          typeof request === "string" && typeof supplier === "string"
            ? threadKey(request, supplier)
            : undefined
        }
      />
    </main>
  );
}
