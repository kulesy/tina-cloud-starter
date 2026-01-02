const fs = require('fs');
const path = require('path');

const authors = [
  'content/authors/napoleon.md',
  'content/authors/lucy.md',
  'content/authors/pedro.md',
  'content/authors/llamantha.md'
];

const topics = [
  { title: 'Web Development', keywords: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'] },
  { title: 'Content Management', keywords: ['CMS', 'Headless CMS', 'TinaCMS', 'Content Strategy'] },
  { title: 'Design', keywords: ['UI', 'UX', 'Design Systems', 'Accessibility', 'Typography'] },
  { title: 'DevOps', keywords: ['CI/CD', 'Docker', 'Kubernetes', 'Deployment', 'Automation'] },
  { title: 'Performance', keywords: ['Optimization', 'Speed', 'Core Web Vitals', 'Caching'] },
  { title: 'SEO', keywords: ['Search Engine Optimization', 'Meta Tags', 'Schema', 'Rankings'] },
  { title: 'Testing', keywords: ['Unit Tests', 'E2E Testing', 'TDD', 'Quality Assurance'] },
  { title: 'Architecture', keywords: ['Microservices', 'Monolith', 'Serverless', 'Patterns'] },
  { title: 'Security', keywords: ['Authentication', 'Authorization', 'HTTPS', 'Best Practices'] },
  { title: 'Best Practices', keywords: ['Code Quality', 'Documentation', 'Team Collaboration'] }
];

const blogTitles = [
  'Getting Started with {topic}',
  'Advanced {topic} Techniques',
  'Common {topic} Mistakes to Avoid',
  'The Complete Guide to {topic}',
  'Why {topic} Matters in 2024',
  'Mastering {topic}: Tips and Tricks',
  'Understanding {topic} Fundamentals',
  '{topic} Best Practices Every Developer Should Know',
  'How to Improve Your {topic} Skills',
  'The Future of {topic}',
  '{topic} vs Traditional Approaches',
  'Building Better Products with {topic}',
  'A Deep Dive into {topic}',
  '{topic} for Beginners',
  'Top 10 {topic} Tools You Need',
  'Debugging {topic} Issues',
  '{topic} Performance Optimization',
  'Scaling {topic} in Production',
  'The Art of {topic}',
  '{topic} Success Stories'
];

const contentTemplates = [
  (keyword) => `## Introduction to ${keyword}

${keyword} has become increasingly important in modern web development. In this post, we'll explore why ${keyword} matters and how you can leverage it in your projects.

## Why ${keyword}?

There are several compelling reasons to invest time in learning ${keyword}:

* **Improved Developer Experience** - Better tools lead to better productivity
* **Enhanced Performance** - Optimized solutions for modern web
* **Industry Standard** - Used by leading companies worldwide

## Getting Started

To begin working with ${keyword}, you'll need to understand the core concepts. Let's break them down:

1. **Foundation** - Understanding the basics
2. **Implementation** - Putting theory into practice
3. **Optimization** - Making it production-ready

## Best Practices

Here are some key principles to follow:

* Keep your code clean and maintainable
* Document your work thoroughly
* Test early and often
* Stay updated with the latest developments

## Conclusion

${keyword} is a powerful tool in any developer's arsenal. By following these guidelines, you'll be well on your way to mastering it.`,

  (keyword) => `## The Power of ${keyword}

In today's fast-paced development environment, ${keyword} stands out as a critical skill. Let's explore what makes it so valuable.

## Key Benefits

Understanding ${keyword} provides several advantages:

1. Faster development cycles
2. Better code quality
3. Improved team collaboration
4. Reduced maintenance burden

## Real-World Applications

${keyword} can be applied in numerous scenarios:

* Building scalable applications
* Improving user experience
* Optimizing performance
* Streamlining workflows

## Common Pitfalls

Avoid these common mistakes when working with ${keyword}:

* Over-engineering solutions
* Ignoring documentation
* Skipping testing
* Not considering edge cases

## Moving Forward

As you continue your journey with ${keyword}, remember that practice makes perfect. Start small, build incrementally, and always keep learning.`,

  (keyword) => `## Exploring ${keyword}

${keyword} has transformed how we approach modern development. This guide will help you understand its importance and practical applications.

## Core Concepts

Let's examine the fundamental principles:

* **Simplicity** - Keep things straightforward
* **Efficiency** - Optimize for performance
* **Scalability** - Plan for growth
* **Maintainability** - Think long-term

## Practical Examples

Here's how ${keyword} works in practice:

1. Start with a solid foundation
2. Build incrementally
3. Test thoroughly
4. Deploy confidently

## Advanced Techniques

Once you've mastered the basics, consider these advanced approaches:

* Implementing custom solutions
* Integrating with existing systems
* Automating repetitive tasks
* Monitoring and analytics

## Final Thoughts

${keyword} is more than just a buzzword—it's a fundamental shift in how we build for the web. Embrace it, experiment with it, and watch your projects thrive.`
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateDate(index) {
  const startDate = new Date('2021-01-01');
  const endDate = new Date('2024-12-31');
  const timeSpan = endDate.getTime() - startDate.getTime();
  const randomTime = startDate.getTime() + (Math.random() * timeSpan);
  return new Date(randomTime).toISOString();
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generatePost(index) {
  const topic = getRandomElement(topics);
  const keyword = getRandomElement(topic.keywords);
  const titleTemplate = getRandomElement(blogTitles);
  const title = titleTemplate.replace('{topic}', keyword);
  const slug = generateSlug(title);
  const author = getRandomElement(authors);
  const date = generateDate(index);
  const template = getRandomElement(contentTemplates);
  const content = template(keyword);

  const excerpt = `Learn everything you need to know about ${keyword}. This comprehensive guide covers best practices, common pitfalls, and practical examples to help you succeed.`;

  const frontmatter = `---
title: ${title}
heroImg: /uploads/unsplash-75EFpyXu3Wg.jpg
excerpt: >
  ${excerpt}
author: ${author}
date: ${date}
---

${content}
`;

  return {
    filename: `${slug}.mdx`,
    content: frontmatter
  };
}

// Generate 100 posts
const postsDir = path.join(__dirname, 'content', 'posts');

console.log('Generating 100 blog posts...\n');

for (let i = 1; i <= 100; i++) {
  const post = generatePost(i);
  const filepath = path.join(postsDir, post.filename);

  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`⚠️  Skipping ${i}/100: ${post.filename} (already exists)`);
    continue;
  }

  fs.writeFileSync(filepath, post.content);
  console.log(`✓ Created ${i}/100: ${post.filename}`);
}

console.log('\n✨ Done! Successfully generated blog posts.');
