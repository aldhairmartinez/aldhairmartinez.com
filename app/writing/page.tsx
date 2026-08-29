import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleListItem } from "@/components/content/ArticleListItem";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical writing on observability, POVs, and infrastructure.",
};

export default async function WritingPage() {
  const articles = await getAllArticles();

  return (
    <Container>
      <PageHeader
        label="Writing"
        title="Writing"
        description="Technical notes on observability, POVs, and building infrastructure that holds up under load."
      />

      <div className="py-4">
        {articles.map((article) => (
          <ArticleListItem key={article.slug} entry={article} />
        ))}
      </div>
    </Container>
  );
}
