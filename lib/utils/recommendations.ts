import { Product, products } from "../data/products";

/**
 * Get recommended products based on the current product's category and tags.
 * Priority: 
 * 1. Same Category
 * 2. Shared Tags
 * 3. High Rating
 */
export function getRecommendedProducts(currentProduct: Product, limit: number = 5): Product[] {
    // Filter out the current product
    const otherProducts = products.filter(p => p.id !== currentProduct.id);

    // Scoring system
    const scoredProducts = otherProducts.map(product => {
        let score = 0;

        // Bonus for same category
        if (product.category === currentProduct.category) {
            score += 10;
        }

        // Bonus for shared tags
        const sharedTags = product.tags.filter(tag => currentProduct.tags.includes(tag));
        score += sharedTags.length * 2;

        // Small bonus for rating to break ties
        score += product.rating;

        return { product, score };
    });

    // Sort by score descending and take the limit
    return scoredProducts
        .sort((a, b) => b.score - a.score)
        .map(item => item.product)
        .slice(0, limit);
}
