export interface Article {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export const articles: Article[] = [
  {
    slug: "popia-section-71-boards",
    category: "AI Governance",
    title: "POPIA Section 71: Why South African Boards Can No Longer Ignore Automated Decision-Making",
    excerpt: "What the law actually requires, why enforcement is coming, and four questions every board should be asking its AI teams right now.",
    date: "April 2026",
    readTime: "10 min",
    featured: true,
    content: `
## What Section 71 actually says
POPIA Section 71 is the most significant regulatory hook for AI in South Africa. It states that a data subject may not be subjected to a decision which results in legal consequences for them, or which affects them to a substantial degree, which is based solely on the automated processing of personal information.

## The Gap in Accountability
Most South African boards view AI as a technical problem for the IT department. This is a profound governance error. When an algorithm rejects a home loan, denies a job application, or flags a transaction as fraudulent, the legal liability doesn't rest with the code—it rests with the board.

## Four Questions for the Board
1. **Who is the named human accountable for this system's decisions?**
2. **Can the logic of the decision be explained in plain language to the affected person?**
3. **Is there a genuine, documented human override mechanism in place?**
4. **How do we measure the impact of this system on the dignity and rights of our customers?**

... (rest of article)
    `
  },
  {
    slug: "credit-rejection-case-study",
    category: "Case Studies",
    title: "A Credit Rejection, an Algorithm, and No One to Call",
    excerpt: "A walk-through of how a Division 3 financial services company fails all four of AIC's audit questions — and what certification would have changed.",
    date: "March 2026",
    readTime: "8 min",
    featured: true,
    content: `
## The Incident
A long-standing customer of a major financial services provider was suddenly denied a credit limit increase. The letter was polite, automated, and offered no specific reason.

## The Audit Failure
When we audited the process, the company failed all four of AIC's core accountability questions:
1. **Who is accountable?** No one person was named. Accountability was diffused across a technical committee.
2. **What is AI doing?** The specific features that led to the rejection were obscured by a "black box" model.
3. **Is the human in the loop?** No. The decision was final upon automated generation.
4. **What happens when it goes wrong?** The appeals process was simply a re-run of the same algorithm.

... (rest of article)
    `
  },
  {
    slug: "empathy-failure",
    category: "AI Governance",
    title: "The Empathy Failure: Why Rejection Letters Written by Algorithms Are a Governance Problem",
    excerpt: "The tone of an automated rejection letter is not a UX problem. It is a measurable governance failure.",
    date: "March 2026",
    readTime: "7 min",
    content: "..."
  },
  {
    slug: "division-framework-guide",
    category: "Best Practices",
    title: "Which Division Are You? A Practical Guide to AIC's Five-Division Framework",
    excerpt: "AIC classifies every organisation across five divisions based on how they use AI. Your division determines your risk profile.",
    date: "March 2026",
    readTime: "6 min",
    content: "..."
  },
  {
    slug: "eu-ai-act-sa",
    category: "Policy Updates",
    title: "The EU AI Act Enforcement Begins August 2026. What South African Companies Need to Know.",
    excerpt: "If your company has EU customers, processes EU citizen data, or sells into Europe — the EU AI Act is already your problem.",
    date: "March 2026",
    readTime: "9 min",
    content: "..."
  },
  {
    slug: "four-audit-questions",
    category: "Best Practices",
    title: "The Four Audit Questions Every AI System Must Be Able to Answer",
    excerpt: "AIC's certification methodology is built on four questions. If you cannot answer them, you have a governance gap.",
    date: "February 2026",
    readTime: "5 min",
    content: "..."
  },
  {
    slug: "shadow-ai-finance",
    category: "Case Studies",
    title: "Shadow AI in Financial Services: What Happens When Employees Build Their Own Automation",
    excerpt: "Most AI governance failures don't start in the IT department. They start when a credit analyst builds an Excel macro that nobody logged.",
    date: "February 2026",
    readTime: "8 min",
    content: "..."
  },
  {
    slug: "jse-top-40-index",
    category: "Research",
    title: "The AI Governance Index: How South Africa's JSE Top 40 Score on Algorithmic Accountability",
    excerpt: "AIC's first public assessment of algorithmic governance across South Africa's largest listed companies.",
    date: "Q3 2026",
    readTime: "12 min",
    comingSoon: true,
    content: ""
  }
];
